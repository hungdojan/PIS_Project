package cz.vut.fit.pisbackend.api.dto;

import cz.vut.fit.pisbackend.data.Drink;

public class DrinkDTO {

    private long id;
    private String name;
    private String description;
    private float price;
    private String type;
    private int volume;
    private boolean active;

    public DrinkDTO(){
    }

    public DrinkDTO(long id, String name, String description, float price, String type, int volume,boolean  active) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.type = type;
        this.volume = volume;
        this.active = active;
    }

    public DrinkDTO(Drink drink) {
        this.id = drink.getId();
        this.name = drink.getName();
        this.description = drink.getDescription();
        this.price = drink.getPrice();
        this.type = drink.getType();
        this.volume = drink.getVolume();
        this.active = drink.isActive();
    }

    public long getId(){
        return id;
    }
    public void setId(long id){
        this.id = id;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getDescription(){
        return description;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public float getPrice(){
        return price;
    }
    public void setPrice(float price){
        this.price = price;
    }
    public String getType(){
        return type;
    }
    public void setType(String type){
        this.type = type;
    }
    public int getVolume(){
        return volume;
    }
    public void setVolume(int volume){
        this.volume = volume;
    }
    public boolean isActive() {
        return active;
    }
    public void setActive(boolean active) {
        this.active = active;
    }
}
