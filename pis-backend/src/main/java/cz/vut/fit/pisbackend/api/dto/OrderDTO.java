package cz.vut.fit.pisbackend.api.dto;

import java.util.Date;
import java.util.List;

import cz.vut.fit.pisbackend.data.Order;
import cz.vut.fit.pisbackend.data.Room;
import cz.vut.fit.pisbackend.data.Table;

public class OrderDTO {
    private long id;
    private Date  atTime;
    private Boolean prepared;
    private Date preparedTime;
    private Boolean payed;
    private List<Long> foods;
    private List<Long> drinks;

    public OrderDTO() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getAtTime() {
        return this.atTime;
    }

    public void setAtTime(Date atTime) {
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

    public List<Long> getFoods() {
        return this.foods;
    }

    public void setFoods(List<Long> foods) {
        this.foods = foods;
    }

    public List<Long> getDrinks() {
        return this.drinks;
    }

    public void setDrinks(List<Long> drinks) {
        this.drinks = drinks;
    }

}
