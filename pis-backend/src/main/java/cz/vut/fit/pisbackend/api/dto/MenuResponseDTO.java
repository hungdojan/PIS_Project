package cz.vut.fit.pisbackend.api.dto;

import cz.vut.fit.pisbackend.data.Menu;

import java.util.Collection;
import java.util.stream.Collectors;

public class MenuResponseDTO {

    private long id;
    private String name;
    private String description;
    private Collection<FoodDTO> foods;
    private Collection<DrinkDTO> drinks;

    public MenuResponseDTO(Menu menu) {
        this.id = menu.getId();
        this.name = menu.getName();
        this.description = menu.getDescription();
        this.foods = menu.getFoods()
                            .stream()
                            .map(FoodDTO::new)
                            .collect(Collectors.toList());
        this.drinks = menu.getDrinks()
                            .stream()
                            .map(DrinkDTO::new)
                            .collect(Collectors.toList());
    }

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
