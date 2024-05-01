package cz.vut.fit.pisbackend.api;

import cz.vut.fit.pisbackend.api.dto.EmployeeDTO;
import cz.vut.fit.pisbackend.api.dto.ErrorDTO;
import cz.vut.fit.pisbackend.api.dto.JwtDTO;
import cz.vut.fit.pisbackend.api.dto.ResponseMessageDTO;
import cz.vut.fit.pisbackend.data.Employee;
import cz.vut.fit.pisbackend.data.EmployeeManager;
import jakarta.annotation.security.DeclareRoles;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.security.enterprise.identitystore.Pbkdf2PasswordHash;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.util.List;

@Path("employee")
@DeclareRoles("Admin")
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
    public Response validate(Employee e) {
        Employee employee = employeeManager.getUser(e.getLogin());
        if (employee == null)
            return Response.status(Response.Status.UNAUTHORIZED).entity(new ResponseMessageDTO("Login Failed")).build();
        if (!pbkdf2PasswordHash.verify(e.getPassword().toCharArray(), employee.getPassword())) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(new ResponseMessageDTO("Login Failed")).build();
        }
        return Response.status(Response.Status.OK).entity(new JwtDTO("TODO")).build();
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response create(Employee e) {
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

        employeeManager.update(newEmployee);
        return Response.status(Response.Status.CREATED).entity(new EmployeeDTO(newEmployee)).build();
    }

    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
//    @RolesAllowed("Admin")
    public Response update(Employee e) {
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
//    @RolesAllowed("Admin")
    public Response delete(@PathParam("id") long id) {
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
//    @RolesAllowed("Admin")
    public List<EmployeeDTO> get() {
        return employeeManager.getAll().stream().map(EmployeeDTO::new).toList();
    }

}
