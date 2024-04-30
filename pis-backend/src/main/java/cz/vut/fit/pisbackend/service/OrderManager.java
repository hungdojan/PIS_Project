package cz.vut.fit.pisbackend.service;

import java.util.Date;
import java.util.List;

import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import cz.vut.fit.pisbackend.data.Order;


@RequestScoped
public class OrderManager {

    @PersistenceContext
    private EntityManager em;

    public OrderManager() {
    }

    @Transactional
    public Order save(Order p) {
        return em.merge(p);
    }

    @Transactional
    public void remove(Order p) {
        em.remove(em.merge(p));
    }

    @Transactional
    public void addOrder(Order p) {
        save(p);
    }

    public Order find(long id) {
        return em.find(Order.class, id);
    }

    public List<Order> findAll() {
        return em.createNamedQuery("Order_.findAll", Order.class).getResultList();
    }
}
