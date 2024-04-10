package cz.vut.fit.pisbackend.data;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "Drink")
public class Drink {
    @Id
    private long id;
    private String name;
    private String description;
    private float price;
    private String type;
    private int volume;
    @ManyToMany
    private Collection<Order> orders;
    @ManyToMany
    private Collection<Menu> menus;
    public Drink(){
        orders = new ArrayList<>();
        menus = new ArrayList<>();
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
    public Collection<Order> getOrders(){
        return orders;
    }
    public void setOrders(Collection<Order> orders){
        this.orders = orders;
    }
    public Collection<Menu> getMenus(){
        return menus;
    }
    public void setMenus(Collection<Menu> menus){
        this.menus = menus;
    }
}
