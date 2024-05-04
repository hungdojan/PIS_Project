package cz.vut.fit.pisbackend.api.dto;

import com.nimbusds.jwt.SignedJWT;
import cz.vut.fit.pisbackend.data.Employee;
import cz.vut.fit.pisbackend.service.JwtTokenUtils;

public class JwtDTO {
    private String user;
    private String role;
    private String token;

    public JwtDTO(Employee e, SignedJWT token) {
        this.user = e.getLogin();
        this.role = e.getRole();
        this.token = JwtTokenUtils.signedJwtToString(token);
    }

    public JwtDTO(String user, String role, SignedJWT token) {
        this.user = user;
        this.role = role;
        this.token = JwtTokenUtils.signedJwtToString(token);
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
