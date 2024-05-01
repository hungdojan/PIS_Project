package cz.vut.fit.pisbackend.api.dto;

import cz.vut.fit.pisbackend.data.Employee;

public class EmployeeDTO {
    private String login;
    private String role;

    public EmployeeDTO() {

    }
    public EmployeeDTO(Employee employee) {
        this.login = employee.getLogin();
        this.role = employee.getRole();
    }

    public EmployeeDTO(String login, String role) {
        this.login = login;
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
