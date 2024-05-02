package cz.vut.fit.pisbackend.api.dto;

import cz.vut.fit.pisbackend.data.Table;

public class TableDTO {
    private long id;
    private int capacity;

    public TableDTO() { }

    public TableDTO(Table table) {
        this.id = table.getId();
        this.capacity = table.getCapacity();
    }

    public TableDTO(long id, int capacity) {
        this.id = id;
        this.capacity = capacity;
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
}

