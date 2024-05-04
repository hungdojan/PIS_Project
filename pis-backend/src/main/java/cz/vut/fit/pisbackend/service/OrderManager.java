package cz.vut.fit.pisbackend.service;

import cz.vut.fit.pisbackend.data.Order;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;


@RequestScoped
public class OrderManager {

    @PersistenceContext
    private EntityManager em;

    public OrderManager() {
    }

    @Transactional
    public Order create(Order o) {
        em.persist(o);
        return o;
    }

    @Transactional
    public void remove(Order o) {
        em.remove(em.merge(o));
    }

    @Transactional
    public Order update(Order o) {
        return em.merge(o);
    }

    public Order find(long id) {
        return em.find(Order.class, id);
    }

    public List<Order> findByTableId(long tableId) {
        String jpql = "SELECT o FROM Order_ o JOIN o.toTable t WHERE t.id = :tableId";
        return em.createQuery(jpql, Order.class)
                    .setParameter("tableId", tableId)
                    .getResultList();
    }

    public List<Order> findAll() {
        return em.createNamedQuery("Order_.findAll", Order.class).getResultList();
    }

    public List<Order> findByPaidState(boolean paid) {
        String jpql = "SELECT o FROM Order_ o WHERE o.payed = :paid";
        return em.createQuery(jpql, Order.class)
                    .setParameter("paid", paid)
                    .getResultList();
    }

    public List<Order> findByTableIdAndPaidState(long tableId, boolean paid) {
        String jpql = "SELECT o FROM Order_ o JOIN o.toTable t WHERE t.id = :tableId AND o.payed = :paid";
        return em.createQuery(jpql, Order.class)
            .setParameter("tableId", tableId)
            .setParameter("paid", paid)
            .getResultList();
    }

    @Transactional
    public long removeByIds(List<Long> ids) {
        String jpql = "DELETE FROM Order_ WHERE id IN :ids";
        return em.createQuery(jpql, Order.class)
                    .setParameter("ids", ids)
                    .executeUpdate();
    }
}
