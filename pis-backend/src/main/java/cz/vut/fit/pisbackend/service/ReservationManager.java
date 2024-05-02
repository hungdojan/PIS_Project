package cz.vut.fit.pisbackend.service;

import cz.vut.fit.pisbackend.data.Reservation;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.Date;
import java.util.List;

@RequestScoped
public class ReservationManager {

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public Reservation create(Reservation reservation) {
        em.persist(reservation);
        return reservation;
    }

    public Reservation find(long id) {
        return em.find(Reservation.class, id);
    }

    @Transactional
    public Reservation update(Reservation reservation) {
        return em.merge(reservation);
    }

    @Transactional
    public void remove(Reservation reservation) {
        em.remove(em.merge(reservation));
    }

    public List<Reservation> findAll() {
        return em.createQuery("SELECT r FROM Reservation r", Reservation.class).getResultList();
    }

    public List<Reservation> findByDateRange(Date at, Date until) {
        return em.createQuery(
                "SELECT r FROM Reservation r WHERE r.at >= :at AND r.until <= :until",
                Reservation.class
            )
            .setParameter("at", at)
            .setParameter("until", until)
            .getResultList();
    }
}
