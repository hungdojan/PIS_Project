package cz.vut.fit.pisbackend.data;

import jakarta.persistence.Table;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Entity(name = "Order_")
@NamedQueries({
    @NamedQuery(name="Order_.findAll", query="SELECT o FROM Order_ o"),
})
@Table(name = "Order_")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date atTime;
    private Boolean prepared;
    @Temporal(TemporalType.TIMESTAMP)
    private Date preparedTime;
    private Boolean payed;
    @ManyToOne
    private Room toRoom;
    @ManyToOne
    private cz.vut.fit.pisbackend.data.Table toTable;
    @ManyToMany(cascade=CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(name="Order__Food",
        joinColumns=
        @JoinColumn(name="Order__id", referencedColumnName="id"),
        inverseJoinColumns=
        @JoinColumn(name="foods_id", referencedColumnName="id")
    )
    private Collection<Food> foods;
    @ManyToMany(cascade=CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(name="Order__Drink",
        joinColumns=
        @JoinColumn(name="Order__id", referencedColumnName="id"),
        inverseJoinColumns=
        @JoinColumn(name="drinks_id", referencedColumnName="id")
    )
    private Collection<Drink> drinks;

    public Order() {
        foods = new ArrayList<>();
        drinks = new ArrayList<>();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getAtTime() {
        return atTime;
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

    public Room getToRoom() {
        return toRoom;
    }

    public void setToRoom(Room toRoom) {
        this.toRoom = toRoom;
    }

    public cz.vut.fit.pisbackend.data.Table getToTable() {
        return toTable;
    }

    public void setToTable(cz.vut.fit.pisbackend.data.Table toTable) {
        this.toTable = toTable;
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
