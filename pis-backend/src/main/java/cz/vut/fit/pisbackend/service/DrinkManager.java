package cz.vut.fit.pisbackend.service;

import java.util.Date;
import java.util.List;

import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

import cz.vut.fit.pisbackend.data.Drink;


@RequestScoped
public class DrinkManager {

    @PersistenceContext
    private EntityManager em;

    public DrinkManager() {
    }

    @Transactional
    public Drink create(Drink o) {
        em.persist(o);
        return o;
    }

    @Transactional
    public void remove(Drink o) {
        em.remove(em.merge(o));
    }

    @Transactional
    public Drink update(Drink o) {
        return em.merge(o);
    }

    public Drink find(long id) {
        return em.find(Drink.class, id);
    }

    public List<Drink> findByIds(List<Long> ids) {
        String jpql = "SELECT f FROM Drink f WHERE f.id IN :ids";
        TypedQuery<Drink> query = em.createQuery(jpql, Drink.class);
        query.setParameter("ids", ids);
        return query.getResultList();
    }

    public List<Drink> findAll() {
        return em.createNamedQuery("Drink.findAll", Drink.class).getResultList();
    }
}


