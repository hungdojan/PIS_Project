package cz.vut.fit.pisbackend.api.dto;

import cz.vut.fit.pisbackend.data.Drink;
import cz.vut.fit.pisbackend.data.Food;

import java.util.Date;
import java.util.List;

public class OrderDTO {
    private long id;
    private Date  atTime;
    private Boolean prepared;
    private Date preparedTime;
    private Boolean payed;
    private long toRoom;
    private long toTable;
    private long food;
    private long drink;

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

    public long getToRoom() {
        return toRoom;
    }

    public void setToRoom(long room) {
        this.toRoom = room;
    }

    public long getToTable() {
        return toTable;
    }

    public void setToTable(long table) {
        this.toTable = table;
    }

    public long getFood() {
        return food;
    }

    public void setFood(long foods) {
        this.food = foods;
    }

    public long getDrink() {
        return drink;
    }

    public void setDrink(long drink) {
        this.drink = drink;
    }
}
