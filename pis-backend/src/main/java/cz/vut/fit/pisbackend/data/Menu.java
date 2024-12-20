package cz.vut.fit.pisbackend.data;

import jakarta.persistence.Table;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "Menu")
@NamedQueries({
    @NamedQuery(name="Menu.findAll", query="SELECT f FROM Menu f"),
})
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;
    @ManyToMany(cascade=CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(name="Menu_Food",
        joinColumns=
        @JoinColumn(name="Menu_id", referencedColumnName="id"),
        inverseJoinColumns=
        @JoinColumn(name="foods_id", referencedColumnName="id")
    )
    private Collection<Food> foods;
    @ManyToMany(cascade=CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(name="Menu_Drink",
        joinColumns=
        @JoinColumn(name="Menu_id", referencedColumnName="id"),
        inverseJoinColumns=
        @JoinColumn(name="drinks_id", referencedColumnName="id")
    )
    private Collection<Drink> drinks;

    public Menu(){
        drinks = new ArrayList<>();
        foods = new ArrayList<>();
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

    public Collection<Food> getFoods() {
        return foods;
    }

    public void setFoods(Collection<Food> foods) {
        this.foods = foods;
    }

    public Collection<Drink> getDrinks() {
        return drinks;
    }

    public void setDrinks(Collection<Drink> drinks) {
        this.drinks = drinks;
    }
}
