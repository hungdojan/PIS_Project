package cz.vut.fit.pisbackend.service;

import java.util.ArrayList;
import java.util.List;

import cz.vut.fit.pisbackend.data.Order;
import cz.vut.fit.pisbackend.data.Reservation;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import cz.vut.fit.pisbackend.data.Room;

@RequestScoped
public class RoomManager {

    @PersistenceContext
    private EntityManager em;

    public RoomManager() {
    }

    @Transactional
    public Room save(Room room) {
        return em.merge(room);
    }

    @Transactional
    public void remove(Room room) {
        em.remove(em.merge(room));
    }

    @Transactional
    public void addRoom(Room room) {
        save(room);
    }

    public Room find(long id) {
        return em.find(Room.class, id);
    }

    public List<Room> findAll() {
        return em.createQuery("SELECT r FROM Room r", Room.class).getResultList();
    }

    @Transactional
    public void addReservation(Room r, Reservation re)
    {
        r.getReservations().add(re);
        re.getRooms().add(r);
        re.setRooms(re.getRooms());
        save(r);
    }

    @Transactional
    public void addOrder(Room r, Order o)
    {
        r.getOrders().add(o);
        o.setToRoom(r);
        save(r);
    }
/*
    public List<Room> findAvailable() {
        return new ArrayList<>();
    }

 */
}
