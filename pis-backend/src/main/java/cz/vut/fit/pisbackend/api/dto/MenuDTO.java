package cz.vut.fit.pisbackend.api.dto;

import java.util.List;
import java.util.stream.Collectors;

import cz.vut.fit.pisbackend.data.Menu;

public class MenuDTO {

    private long id;
    private String name;
    private String description;
    private List<Long> foods;
    private List<Long> drinks;

    public MenuDTO() {}

    // Getters and Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Long> getFoods() {
        return foods;
    }

    public void setFoods(List<Long> foods) {
        this.foods = foods;
    }

    public List<Long> getDrinks() {
        return drinks;
    }

    public void setDrinks(List<Long> drinks) {
        this.drinks = drinks;
    }
}
