package cz.vut.fit.pisbackend.service;

import cz.vut.fit.pisbackend.data.Reservation;
import cz.vut.fit.pisbackend.data.Room;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

import java.util.Date;
import java.util.List;

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

    public boolean isRoomAvailable(Room room, Date at, Date until) {
        for (Reservation reservation : room.getReservations()) {
            if (reservation.getAt().before(until) && reservation.getUntil().after(at)) {
                return false;
            }
        }
        return true;
    }
}
