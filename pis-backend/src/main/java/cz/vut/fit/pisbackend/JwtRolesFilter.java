package cz.vut.fit.pisbackend;

import jakarta.annotation.Priority;
import jakarta.ws.rs.ext.Provider;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.ResourceInfo;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.Priorities;

import java.lang.reflect.Method;
import java.io.IOException;
import java.util.Arrays;

import cz.vut.fit.pisbackend.service.JwtTokenUtils;

@Provider
@JwtRoles
@Priority(Priorities.AUTHENTICATION)
public class JwtRolesFilter implements ContainerRequestFilter {

    @Context
    private ResourceInfo resourceInfo;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        Method method = resourceInfo.getResourceMethod();
        String authorizationHeader = requestContext.getHeaderString("Authorization");
        System.out.println("header" + authorizationHeader);

        try {
            if (method != null) {
                // Get allowed permission on method
                JwtRoles jwtAnot = method.getAnnotation(JwtRoles.class);
                String[] roles =  jwtAnot.value();
                System.out.println(Arrays.toString(roles));
                Response response = JwtTokenUtils.authValidation(authorizationHeader, Arrays.asList(roles));
                if (response != null) {
                    requestContext.abortWith(response);
                }
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
        }
    }
}
