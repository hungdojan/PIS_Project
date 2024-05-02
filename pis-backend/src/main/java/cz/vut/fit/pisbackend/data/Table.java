package cz.vut.fit.pisbackend.data;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collection;

@Entity(name = "Tablee")
@NamedQueries({
    @NamedQuery(name="Table.findAll", query="SELECT t FROM Tablee t"),
})
@jakarta.persistence.Table(name = "Tablee")
public class Table {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int capacity;
    @ManyToMany
    private Collection<Reservation> reservations;
    @OneToMany(mappedBy = "toTable")
    private Collection<Order> orders;

    public Table() {
        reservations = new ArrayList<>();
        orders = new ArrayList<>();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public Collection<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(Collection<Reservation> reservations) {
        this.reservations = reservations;
    }

    public Collection<Order> getOrders() {
        return orders;
    }

    public void setOrders(Collection<Order> orders) {
        this.orders = orders;
    }
}
