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

    public RoomDTO() { }

    public RoomDTO(Room room) {
        this.id = room.getId();
        this.capacity = room.getCapacity();
        this.description = room.getDescription();
    }

    public RoomDTO(long id, int capacity, String description) {
        this.id = id;
        this.capacity = capacity;
        this.description = description;
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
}
