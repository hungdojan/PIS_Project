package cz.vut.fit.pisbackend.data;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToMany;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Entity
@Table(name = "Reservation")
public class Reservation {
    @Id
    private long id;
    private Date from;
    private Date until;
    private String name;
    private int count;
    private String phone;
    private String email;
    @ManyToOne
    private Employee createdBy;
    @ManyToMany
    private Collection<cz.vut.fit.pisbackend.data.Table> tables;
    @ManyToMany
    private Collection<Room> rooms;

    public Reservation() {
        tables = new ArrayList<>();
        rooms = new ArrayList<>();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getFrom() {
        return from;
    }

    public void setFrom(Date from) {
        this.from = from;
    }

    public Date getUntil() {
        return until;
    }

    public void setUntil(Date until) {
        this.until = until;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Employee getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Employee createdBy) {
        this.createdBy = createdBy;
    }

    public Collection<cz.vut.fit.pisbackend.data.Table> getTables() {
        return tables;
    }

    public void setTables(Collection<cz.vut.fit.pisbackend.data.Table> tables) {
        this.tables = tables;
    }

    public Collection<Room> getRooms() {
        return rooms;
    }

    public void setRooms(Collection<Room> rooms) {
        this.rooms = rooms;
    }
}
