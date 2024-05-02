package cz.vut.fit.pisbackend.api.dto;

import java.util.Date;
import java.util.Collection;
import java.util.stream.Collectors;

import cz.vut.fit.pisbackend.data.Food;
import cz.vut.fit.pisbackend.data.Order;
import cz.vut.fit.pisbackend.data.Room;
import cz.vut.fit.pisbackend.data.Table;

public class OrderResponseDTO {
    private long id;
    private Date  atTime;
    private Boolean prepared;
    private Date preparedTime;
    private Boolean payed;
    // TODO private Room toRoom;
    private TableDTO toTable;
    private Collection<FoodDTO> foods;
    private Collection<DrinkDTO> drinks;

    public OrderResponseDTO() {}

    public OrderResponseDTO(Order order) {
        this.id = order.getId();
        this.atTime = order.getAtTime();
        this.prepared = order.getPrepared();
        this.preparedTime = order.getPreparedTime();
        this.payed = order.getPayed();
        this.foods = order.getFoods()
                            .stream()
                            .map(FoodDTO::new)
                            .collect(Collectors.toList());
        this.drinks = order.getDrinks()
                            .stream()
                            .map(DrinkDTO::new)
                            .collect(Collectors.toList());
        this.toTable = new TableDTO(order.getToTable());
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

    public Collection<FoodDTO> getFoods() {
        return foods;
    }

    public void setFoods(Collection<FoodDTO> foods) {
        this.foods = foods;
    }

    public Collection<DrinkDTO> getDrinks() {
        return drinks;
    }

    public void setDrinks(Collection<DrinkDTO> drinks) {
        this.drinks = drinks;
    }

}
