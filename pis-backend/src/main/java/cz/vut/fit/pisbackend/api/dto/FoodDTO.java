package cz.vut.fit.pisbackend.api.dto;

import cz.vut.fit.pisbackend.data.Food;

public class FoodDTO {

    private long id;
    private String name;
    private String description;
    private float price;
    private String type;
    private String allergens;
    private int grams;

    public FoodDTO(Food food) {
        this.id = food.getId();
        this.name = food.getName();
        this.description = food.getDescription();
        this.price = food.getPrice();
        this.type = food.getType();
        this.allergens = food.getAllergens();
        this.grams = food.getGrams();
    }

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

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAllergens() {
        return allergens;
    }

    public void setAllergens(String allergens) {
        this.allergens = allergens;
    }

    public int getGrams() {
        return grams;
    }

    public void setGrams(int grams) {
        this.grams = grams;
    }

}
