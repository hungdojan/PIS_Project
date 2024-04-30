package cz.vut.fit.pisbackend.api.dto;

import java.util.Date;

import cz.vut.fit.pisbackend.data.Order;
import cz.vut.fit.pisbackend.data.Room;
import cz.vut.fit.pisbackend.data.Table;

public class OrderDTO {
    private long id;
    private Date  atTime;
    private Boolean prepared;
    private Date preparedTime;
    private Boolean payed;

    public OrderDTO() {}

    public OrderDTO(Order order) {
        this.id = order.getId();
        this.atTime = order.getAtTime();
        this.prepared = order.getPrepared();
        this.preparedTime = order.getPreparedTime();
        this.payed = order.getPayed();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getAtTime() {
        return this.atTime;
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

}
