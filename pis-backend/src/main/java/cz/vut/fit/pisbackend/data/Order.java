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
    private Long id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date atTime;
    private Boolean prepared;
    @Temporal(TemporalType.TIMESTAMP)
    private Date preparedTime;
    private Boolean payed;
    @ManyToOne
    private Room toRoom;
    @ManyToOne()
    private cz.vut.fit.pisbackend.data.Table toTable;
    @ManyToOne
    private Food food;
    @ManyToOne
    private Drink drink;

    public Order() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public Drink getDrink() {
        return drink;
    }

    public void setDrink(Drink drink) {
        this.drink = drink;
    }

    public Food getFood() {
        return food;
    }

    public void setFood(Food food) {
        this.food = food;
    }
}
