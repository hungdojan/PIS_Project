package cz.vut.fit.pisbackend.api;

import com.nimbusds.jose.JOSEException;
import cz.vut.fit.pisbackend.api.dto.EmployeeDTO;
import cz.vut.fit.pisbackend.api.dto.ResponseMessageDTO;
import cz.vut.fit.pisbackend.data.Employee;
import cz.vut.fit.pisbackend.data.EmployeeManager;
import cz.vut.fit.pisbackend.service.JwtTokenUtils;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.security.enterprise.identitystore.Pbkdf2PasswordHash;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Objects;

@ApplicationScoped
@Path("employee")
public class EmployeeAPI {
    @Inject
    private EmployeeManager employeeManager;

    @Inject
    private Pbkdf2PasswordHash pbkdf2PasswordHash;

    @Context
    private UriInfo context;

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
        NewCookie cookie = new NewCookie.Builder("jwt").value(JwtTokenUtils.signedJwtToString(token)).build();
        return Response.status(Response.Status.OK).entity(new EmployeeDTO(employee)).cookie(cookie).build();
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response create(@CookieParam("jwt") String jwt, Employee e) throws ParseException {
        if (jwt == null || !Objects.equals(JwtTokenUtils.jwtGetRoleValue(jwt), "admin")) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }

        if (!e.createRequestValidation()) {
            return Response.status(Response.Status.BAD_REQUEST)
                .entity(new ResponseMessageDTO("Requires: `login`, `password` and `role` parameters!"))
                .build();
        }

        Employee foundEmployee = employeeManager.getUser(e.getLogin());
        if (foundEmployee != null) {
            return Response.status(Response.Status.BAD_REQUEST).entity(new ResponseMessageDTO("User already exists")).build();
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
    public Response update(@QueryParam("jwt") String jwt, Employee e) throws ParseException {
        if (jwt == null || !Objects.equals(JwtTokenUtils.jwtGetRoleValue(jwt), "admin")) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }
        if (!e.createRequestValidation()) {
            return Response.status(Response.Status.BAD_REQUEST)
                .entity(new ResponseMessageDTO("Requires: `login`, `password` and `role` parameters!"))
                .build();
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
    public Response delete(@QueryParam("jwt") String jwt, @PathParam("id") long id) throws ParseException {
        if (jwt == null || !Objects.equals(JwtTokenUtils.jwtGetRoleValue(jwt), "admin")) {
            return Response.status(Response.Status.FORBIDDEN).build();
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
        if (jwt == null || !Objects.equals(JwtTokenUtils.jwtGetRoleValue(jwt), "admin")) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }

        List<EmployeeDTO> employees = employeeManager.getAll().stream().map(EmployeeDTO::new).toList();
        return Response.status(Response.Status.OK).entity(employees).build();
    }

    @Path("logout")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response logout(@CookieParam("jwt") String jwt) {
        if (!jwt.isEmpty()) {
            NewCookie cookie = new NewCookie.Builder("jwt").maxAge(0).build();
            return Response.ok(new ResponseMessageDTO("User logged out")).cookie(cookie).build();
        }
        return Response.ok(new ResponseMessageDTO("No user was logged in.")).build();
    }

}
