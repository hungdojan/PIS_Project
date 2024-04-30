package cz.vut.fit.pisbackend.api.dto;

import java.util.Collection;
import java.util.stream.Collectors;

import cz.vut.fit.pisbackend.data.Order;
import cz.vut.fit.pisbackend.data.Reservation;
import cz.vut.fit.pisbackend.data.Table;

public class TableDTO {
    private long id;
    private int capacity;
    private Collection<Long> reservationIds;
    private Collection<Long> orderIds;

    public TableDTO() { }

    public TableDTO(Table table) {
        this.id = table.getId();
        this.capacity = table.getCapacity();
        this.reservationIds = table.getReservations()
                                   .stream()
                                   .map(Reservation::getId)
                                   .collect(Collectors.toList());
        this.orderIds = table.getOrders()
                             .stream()
                             .map(Order::getId)
                             .collect(Collectors.toList());
    }

    public TableDTO(long id, int capacity, Collection<Long> reservationIds,
                    Collection<Long> orderIds) {
        this.id = id;
        this.capacity = capacity;
        this.reservationIds = reservationIds;
        this.orderIds = orderIds;
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

    public Collection<Long> getReservationIds() {
        return reservationIds;
    }

    public void setReservationIds(Collection<Long> reservationIds) {
        this.reservationIds = reservationIds;
    }

    public Collection<Long> getOrderIds() {
        return orderIds;
    }

    public void setOrderIds(Collection<Long> orderIds) {
        this.orderIds = orderIds;
    }
}

