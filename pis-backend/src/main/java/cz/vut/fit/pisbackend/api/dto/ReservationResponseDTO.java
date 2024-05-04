package cz.vut.fit.pisbackend.api.dto;

import cz.vut.fit.pisbackend.data.Reservation;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

public class ReservationResponseDTO {
    private long id;
    private Date at;
    private Date until;
    private String name;
    private int count;
    private String phone;
    private String email;
    private Long createdByEmployeeId;
    private Collection<TableDTO> tables;
    private Collection<RoomDTO> rooms;

    public ReservationResponseDTO() {
    }

    public ReservationResponseDTO(Reservation reservation) {
        this.id = reservation.getId();
        this.at = reservation.getAt();
        this.until = reservation.getUntil();
        this.name = reservation.getName();
        this.count = reservation.getCount();
        this.phone = reservation.getPhone();
        this.email = reservation.getEmail();
        var employee = reservation.getCreatedBy();
        this.createdByEmployeeId = employee != null ? employee.getId() : null;
        this.tables = reservation.getTables()
            .stream()
            .map(TableDTO::new)
            .collect(Collectors.toList());
        this.rooms = reservation.getRooms()
            .stream()
            .map(RoomDTO::new)
            .collect(Collectors.toList());
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getAt() {
        return at;
    }

    public void setAt(Date at) {
        this.at = at;
    }

    public Date getUntil() {
        return until;
    }

    public void setUntil(Date until) {
        this.until = until;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getCreatedByEmployeeId() {
        return createdByEmployeeId;
    }

    public void setCreatedByEmployeeId(Long createdByEmployeeId) {
        this.createdByEmployeeId = createdByEmployeeId;
    }

    public Collection<TableDTO> getTables() {
        return tables;
    }

    public void setTables(Collection<TableDTO> tables) {
        this.tables = tables;
    }

    public Collection<RoomDTO> getRoomIds() {
        return rooms;
    }

    public void setRoomIds(Collection<RoomDTO> rooms) {
        this.rooms = rooms;
    }
}

