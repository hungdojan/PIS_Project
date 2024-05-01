package cz.vut.fit.pisbackend.api.dto;

import java.util.Collection;
import java.util.stream.Collectors;

import cz.vut.fit.pisbackend.data.Room;
import cz.vut.fit.pisbackend.data.Reservation;
import cz.vut.fit.pisbackend.data.Order;

public class RoomDTO {
    private long id;
    private int capacity;
    private String description;
    private Collection<Long> reservationIds;
    private Collection<Long> orderIds;

    public RoomDTO() { }

    public RoomDTO(Room room) {
        this.id = room.getId();
        this.capacity = room.getCapacity();
        this.description = room.getDescription();
        this.reservationIds = room.getReservations()
            .stream()
            .map(Reservation::getId)
            .collect(Collectors.toList());
        this.orderIds = room.getOrders()
            .stream()
            .map(Order::getId)
            .collect(Collectors.toList());
    }

    public RoomDTO(long id, int capacity, String description, Collection<Long> reservationIds, Collection<Long> orderIds) {
        this.id = id;
        this.capacity = capacity;
        this.description = description;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
