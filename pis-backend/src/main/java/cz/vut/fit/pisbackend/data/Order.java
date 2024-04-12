package cz.vut.fit.pisbackend.data;

import jakarta.persistence.*;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Entity(name = "Order_")
@Table(name = "Order_")
public class Order {
    @Id
    private long id;
    private Date atTime;
    private Boolean prepared;
    private Date preparedTime;
    private Boolean payed;
    @ManyToOne
    private Room toRoom;
    @ManyToOne
    private cz.vut.fit.pisbackend.data.Table toTable;
    @ManyToMany
    private Collection<Food> foods;
    @ManyToMany
    private Collection<Drink> drinks;

    public Order() {
        foods = new ArrayList<>();
        drinks = new ArrayList<>();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getAtTime() {
        return atTime;
    }

    public void setTime(Date atTime) {
        this.atTime = atTime;
    }

    public Boolean getPrepared() {
        return prepared;
    }

    public void setPrepared(Boolean prepared) {
        this.prepared = prepared;
    }

    public Date getPreparedTime() {
        return preparedTime;
    }

    public void setPreparedTime(Date preparedTime) {
        this.preparedTime = preparedTime;
    }

    public Boolean getPayed() {
        return payed;
    }

    public void setPayed(Boolean payed) {
        this.payed = payed;
    }

    public Room getToRoom() {
        return toRoom;
    }

    public void setToRoom(Room toRoom) {
        this.toRoom = toRoom;
    }

    public cz.vut.fit.pisbackend.data.Table getToTable() {
        return toTable;
    }

    public void setToTable(cz.vut.fit.pisbackend.data.Table toTable) {
        this.toTable = toTable;
    }

    public Collection<Food> getFoods() {
        return foods;
    }

    public void setFoods(Collection<Food> foods) {
        this.foods = foods;
    }

    public Collection<Drink> getDrinks() {
        return drinks;
    }

    public void setDrinks(Collection<Drink> drinks) {
        this.drinks = drinks;
    }
}
