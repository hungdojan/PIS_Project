package cz.vut.fit.pisbackend.api;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import cz.vut.fit.pisbackend.api.dto.EmployeeDTO;
import cz.vut.fit.pisbackend.api.dto.JwtDTO;
import cz.vut.fit.pisbackend.api.dto.ResponseMessageDTO;
import cz.vut.fit.pisbackend.data.Employee;
import cz.vut.fit.pisbackend.data.EmployeeManager;
import cz.vut.fit.pisbackend.service.JwtTokenUtils;
import jakarta.inject.Inject;
import jakarta.security.enterprise.identitystore.Pbkdf2PasswordHash;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Path("employees")
public class EmployeeAPI {
    @Inject
    private EmployeeManager employeeManager;

    @Inject
    private Pbkdf2PasswordHash pbkdf2PasswordHash;

    @Context
    private UriInfo context;

    @Inject
    private HttpHeaders httpHeaders;

    private final ArrayList<String> roles = new ArrayList<String>(List.of(new String[]{"admin"}));

    @Path("login")
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response login(Employee e) throws IOException, JOSEException {
        Employee employee = employeeManager.getUser(e.getLogin());
        if (employee == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(new ResponseMessageDTO("Login Failed")).build();
        }
        if (!pbkdf2PasswordHash.verify(e.getPassword().toCharArray(), employee.getPassword())) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(new ResponseMessageDTO("Login Failed")).build();
        }

        var token = JwtTokenUtils.generateASignedJwt(employee);
        return Response.status(Response.Status.OK)
            .entity(new JwtDTO(employee, token))
            .header("Authorization", "Bearer " + JwtTokenUtils.signedJwtToString(token))
            .build();
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response create(Employee e) throws ParseException {
        String auth = httpHeaders.getHeaderString("Authorization");
        Response response = JwtTokenUtils.authValidation(auth, roles);
        if (response != null) {
            return response;
        }

        if (!e.createRequestValidation()) {
            return Response.status(Response.Status.BAD_REQUEST)
                .entity(new ResponseMessageDTO("Requires: `login`, `password` and `role` parameters!")).build();
        }

        Employee foundEmployee = employeeManager.getUser(e.getLogin());
        if (foundEmployee != null) {
            return Response.status(Response.Status.BAD_REQUEST)
                .entity(new ResponseMessageDTO("User already exists")).build();
        }

        Employee newEmployee = new Employee();
        newEmployee.setLogin(e.getLogin());
        newEmployee.setRole(e.getRole());
        newEmployee.setPassword(pbkdf2PasswordHash.generate(e.getPassword().toCharArray()));

        employeeManager.create(newEmployee);
        return Response.status(Response.Status.CREATED).entity(new EmployeeDTO(newEmployee)).build();
    }

    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response update(Employee e) throws ParseException {
        String auth = httpHeaders.getHeaderString("Authorization");
        Response response = JwtTokenUtils.authValidation(auth, roles);
        if (response != null) {
            return response;
        }

        if (!e.createRequestValidation()) {
            return Response.status(Response.Status.BAD_REQUEST).entity(new ResponseMessageDTO("Requires: `login`, `password` and `role` parameters!")).build();
        }
        Employee employee = employeeManager.find(e.getId());
        if (employee == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity(new ResponseMessageDTO("User not found!")).build();
        }
        employee.setRole(e.getRole());
        employee.setLogin(e.getLogin());
        employee.setPassword(pbkdf2PasswordHash.generate(e.getPassword().toCharArray()));

        employeeManager.update(employee);
        return Response.status(Response.Status.CREATED).entity(new EmployeeDTO(employee)).build();
    }

    @Path("{id}")
    @DELETE
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response delete(@PathParam("id") long id) throws ParseException {
        String auth = httpHeaders.getHeaderString("Authorization");
        Response response = JwtTokenUtils.authValidation(auth, roles);
        if (response != null) {
            return response;
        }

        Employee employee = employeeManager.find(id);
        if (employee == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity(new ResponseMessageDTO("User not found!")).build();
        }
        employeeManager.remove(employee);
        return Response.status(Response.Status.OK).entity(new ResponseMessageDTO("User `" + id + "` deleted!")).build();
    }

    @GET
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response get(@QueryParam("jwt") String jwt) throws ParseException {
        String auth = httpHeaders.getHeaderString("Authorization");
        Response response = JwtTokenUtils.authValidation(auth, roles);
        if (response != null) {
            return response;
        }

        List<EmployeeDTO> employees = employeeManager.getAll().stream().map(EmployeeDTO::new).toList();
        return Response.status(Response.Status.OK).entity(employees).build();
    }

    @Path("validate")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response validate() {
        String auth = httpHeaders.getHeaderString("Authorization");
        Response response = JwtTokenUtils.authValidation(auth, new ArrayList<>());
        if (response != null) {
            return response;
        }

        String tokenValue = auth.replace("Bearer ", "");
        SignedJWT token;
        try {
            token = JwtTokenUtils.stringToSignedJwt(tokenValue);
            JWTClaimsSet jwtClaimsSet = token.getJWTClaimsSet();
            // extract data from token
            String role = jwtClaimsSet.getStringClaim("role");
            String login = jwtClaimsSet.getStringClaim("login");
            Date expTime = jwtClaimsSet.getExpirationTime();

            // check expiration time
            long diff = expTime.getTime() - System.currentTimeMillis();
            if (diff < 1000 * 600) { // create a new token if it's close to expiration time
                token = JwtTokenUtils.generateASignedJwt(login, role);
            }
            return Response.ok(new JwtDTO(login, role, token)).build();
        } catch (ParseException | IOException | JOSEException e) {
            return Response.status(Response.Status.UNAUTHORIZED)
                .entity(new ResponseMessageDTO("Failed to parse the token")).build();
        }
    }
}
