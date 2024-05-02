package cz.vut.fit.pisbackend;

import com.nimbusds.jose.JOSEException;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.lang.System;
import java.text.ParseException;
import java.util.List;
import java.util.ArrayList;

import cz.vut.fit.pisbackend.service.JwtTokenUtils;

@WebFilter("/*")
public class JwtFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String jwt = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("jwt")) {
                    jwt = cookie.getValue();
                    System.out.println("JWT present in cookie, validating...");
                    try {
                        if (!JwtTokenUtils.validateJwt(jwt)) {
                            System.out.println("JWT is invalid, responding with unauthorized");
                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization Cookie");
                        }
                    } catch(ParseException | JOSEException e) {
                        System.out.println("JWT is invalid, responding with unauthorized");
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization Cookie");
                    }
                    System.out.println("JWT is valid, continuing");
                    break;
                }
            }
        }

        System.out.println("Forwarding the request further");
        filterChain.doFilter(request, response);
        if (jwt != null) {
            System.out.println("JWT was present generating new one");
            try {
                String login = JwtTokenUtils.jwtGetLoginValue(jwt);
                String role = JwtTokenUtils.jwtGetRoleValue(jwt);
                var token = JwtTokenUtils.generateASignedJwt(login, role);
                String newJwt = JwtTokenUtils.signedJwtToString(token);
                response.addCookie(new Cookie("jwt", newJwt));
            } catch(ParseException | JOSEException e) {
                System.out.println("Failed to generate new JWT, using the old one");
                response.addCookie(new Cookie("jwt", jwt));
            }
        }
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException { }

    @Override
    public void destroy() { }
}

