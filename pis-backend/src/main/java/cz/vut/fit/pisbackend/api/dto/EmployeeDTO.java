package cz.vut.fit.pisbackend.api.dto;

import cz.vut.fit.pisbackend.data.Employee;

public class EmployeeDTO {
    private long id;
    private String login;
    private String role;

    public EmployeeDTO() {

    }
    public EmployeeDTO(Employee employee) {
        this.id = employee.getId();
        this.login = employee.getLogin();
        this.role = employee.getRole();
    }

    public EmployeeDTO(long id, String login, String role) {
        this.id = id;
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
