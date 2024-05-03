package cz.vut.fit.pisbackend.api.dto;

import cz.vut.fit.pisbackend.data.Drink;
import cz.vut.fit.pisbackend.data.Food;
import cz.vut.fit.pisbackend.data.Order;
import cz.vut.fit.pisbackend.data.Room;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

public class OrderResponseDTO {
    private long id;
    private Date  atTime;
    private Boolean prepared;
    private Date preparedTime;
    private Boolean payed;
    private RoomDTO toRoom;
    private TableDTO toTable;
    private FoodDTO food;
    private DrinkDTO drink;

    public OrderResponseDTO() {}

    public OrderResponseDTO(Order order) {
        this.id = order.getId();
        this.atTime = order.getAtTime();
        this.prepared = order.getPrepared();
        this.preparedTime = order.getPreparedTime();
        this.payed = order.getPayed();
        this.food = new FoodDTO(order.getFood());
        this.drink = new DrinkDTO(order.getDrink());
        this.toTable = new TableDTO(order.getToTable());
        this.toRoom = new RoomDTO(order.getToRoom());
    }

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

    public TableDTO getToTable() {
        return toTable;
    }

    public void setToTable(TableDTO table) {
        this.toTable = table;
    }

    public RoomDTO getToRoom() {
        return toRoom;
    }

    public void setToRoom(RoomDTO toRoom) {
        this.toRoom = toRoom;
    }

    public FoodDTO getFood() {
        return food;
    }

    public void setFood(FoodDTO food) {
        this.food = food;
    }

    public DrinkDTO getDrink() {
        return drink;
    }

    public void setDrink(DrinkDTO drink) {
        this.drink = drink;
    }
}
