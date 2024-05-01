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
    public Room create(Room room) {
        em.persist(room);
        return room;
    }

    @Transactional
    public void remove(Room room) {
        em.remove(em.merge(room));
    }

     @Transactional
    public Room update(Room room) {
        return em.merge(room);
    }

    public Room find(long id) {
        return em.find(Room.class, id);
    }

    public List<Room> findAll() {
        return em.createQuery("SELECT r FROM Room r", Room.class).getResultList();
    }

    public List<Room> findAvailableRooms(Date at, Date until){
        String jpql = "SELECT r FROM Room r " + 
                      "WHERE NOT EXISTS " +
                      "(SELECT res FROM r.reservations res " +
                      "WHERE (res.at <= :until AND res.until >= :at))";
        TypedQuery<Room> query = em.createQuery(jpql, Room.class);
        query.setParameter("at", at);
        query.setParameter("until", until);
        return query.getResultList();
    }
}
