package cz.vut.fit.pisbackend.api.dto;


import cz.vut.fit.pisbackend.data.Reservation;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

public class ReservationDTO {
    private long id;
    private Date at;
    private Date until;
    private String name;
    private int count;
    private String phone;
    private String email;
    private long createdByEmployeeId;
    private Collection<Long> tableIds;
    private Collection<Long> roomIds;

    public ReservationDTO() {
        tableIds = new ArrayList<>();
        roomIds = new ArrayList<>();
    }

    public ReservationDTO(Reservation reservation) {
        this.id = reservation.getId();
        this.at = reservation.getAt();
        this.until = reservation.getUntil();
        this.name = reservation.getName();
        this.count = reservation.getCount();
        this.phone = reservation.getPhone();
        this.email = reservation.getEmail();
        this.createdByEmployeeId = reservation.getCreatedBy().getId();
    }
    public ReservationDTO(long id, Date at, Date until, String name, int count,
                          String phone, String email, long createdByEmployeeId,
                          Collection<Long> tableIds, Collection<Long> roomIds) {
        this.id = id;
        this.at = at;
        this.until = until;
        this.name = name;
        this.count = count;
        this.phone = phone;
        this.email = email;
        this.createdByEmployeeId = createdByEmployeeId;
        this.tableIds = tableIds;
        this.roomIds = roomIds;
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

    public long getCreatedByEmployeeId() {
        return createdByEmployeeId;
    }

    public void setCreatedByEmployeeId(long createdByEmployeeId) {
        this.createdByEmployeeId = createdByEmployeeId;
    }

    public Collection<Long> getTableIds() {
        return tableIds;
    }

    public void setTableIds(Collection<Long> tableIds) {
        this.tableIds = tableIds;
    }

    public Collection<Long> getRoomIds() {
        return roomIds;
    }

    public void setRoomIds(Collection<Long> roomIds) {
        this.roomIds = roomIds;
    }
}

