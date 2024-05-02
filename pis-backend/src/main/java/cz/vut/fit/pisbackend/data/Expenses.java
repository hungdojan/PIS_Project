package cz.vut.fit.pisbackend.data;

import jakarta.persistence.Table;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Expenses")
public class Expenses {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private float price;
    @Temporal(TemporalType.TIMESTAMP)
    private Date time;
    private String type;
    private String description;

    @ManyToOne
    private Employee createdBy;
    @ManyToOne
    private Company orderedFrom;

    public Expenses() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Employee getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Employee createdBy) {
        this.createdBy = createdBy;
    }

    public Company getOrderedFrom() {
        return orderedFrom;
    }

    public void setOrderedFrom(Company orderedFrom) {
        this.orderedFrom = orderedFrom;
    }
}
