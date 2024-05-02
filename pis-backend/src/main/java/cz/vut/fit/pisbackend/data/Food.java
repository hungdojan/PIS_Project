package cz.vut.fit.pisbackend.data;

import jakarta.persistence.*;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.Collection;

@Entity
@NamedQueries({
    @NamedQuery(name="Food.findAll", query="SELECT f FROM Food f"),
})
@Table(name = "Food")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;
    private float price;
    private String type;
    private String allergens;
    private int grams;
    @ManyToMany
    private Collection<Order> orders;
    @ManyToMany
    private Collection<Menu> menus;
    public Food(){
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
    public String getAllergens(){
        return allergens;
    }
    public void setAllergens(String allergens){
        this.allergens = allergens;
    }
    public int getGrams(){
        return grams;
    }
    public void setGrams(int grams){
        this.grams = grams;
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
