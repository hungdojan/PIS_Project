package cz.vut.fit.pisbackend.data;

import jakarta.persistence.Table;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;
import java.util.stream.Stream;

@Entity(name = "Employee")
@Table(name = "Employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String login;
    private String password;

    private String role;

    @OneToMany(mappedBy = "createdBy", cascade=CascadeType.MERGE,fetch = FetchType.LAZY)
    private Collection<Expenses>  expenses;

    @OneToMany(mappedBy = "createdBy", cascade=CascadeType.MERGE,fetch = FetchType.LAZY)
    private Collection<Reservation>  reservations;

    public Employee(){
        expenses = new ArrayList<>();
        reservations = new ArrayList<>();
    }
    public long getId(){
        return id;
    }
    public void setId(long id){
        this.id = id;
    }
    public String getLogin(){
        return login;
    }
    public void setLogin(String login){
        this.login = login;
    }
    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public String getRole(){
        return role;
    }
    public void setRole(String role){
        this.role = role;
    }
    public Collection<Expenses> getExpenses(){
        return expenses;
    }
    public void setExpenses(Collection<Expenses> expenses){
        this.expenses = expenses;
    }
    public Collection<Reservation> getReservations(){
        return reservations;
    }
    public void setReservations(Collection<Reservation> reservations){
        this.reservations = reservations;
    }

    public Boolean createRequestValidation(boolean ignorePass) {
        if (ignorePass) {
            return Stream.of(login, role).allMatch(Objects::nonNull);
        }
        return Stream.of(login, password, role).allMatch(Objects::nonNull);
    }
}
