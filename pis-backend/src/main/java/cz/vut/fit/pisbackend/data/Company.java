package cz.vut.fit.pisbackend.data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.Collection;

@Entity(name = "Company")
@Table(name = "Company")
public class Company {
    @Id
    @GeneratedValue
    private long id;
    private String name;
    private String phone;
    private String owner;

    @OneToMany(mappedBy = "orderedFrom")
    private Collection<Expenses> expenses;

    public Company(){
        expenses = new ArrayList<>();
    }
    public long getId(){
        return id;
    }
    public void setId(long id){
        this.id = id;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getPhone(){
        return phone;
    }
    public void setPhone(String phone){
        this.phone = phone;
    }
    public String getOwner(){
        return owner;
    }
    public void setOwner(String owner){
        this.owner = owner;
    }
    public Collection<Expenses> getExpenses(){
        return expenses;
    }
    public void setExpenses(Collection<Expenses> expenses){
        this.expenses = expenses;
    }
}
