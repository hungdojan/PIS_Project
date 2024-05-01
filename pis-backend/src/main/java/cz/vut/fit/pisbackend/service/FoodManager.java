package cz.vut.fit.pisbackend.service;

import java.util.Date;
import java.util.List;

import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

import cz.vut.fit.pisbackend.data.Food;


@RequestScoped
public class FoodManager {

    @PersistenceContext
    private EntityManager em;

    public FoodManager() {
    }

    @Transactional
    public Food create(Food o) {
        em.persist(o);
        return o;
    }

    @Transactional
    public void remove(Food o) {
        em.remove(em.merge(o));
    }

    @Transactional
    public Food update(Food o) {
        return em.merge(o);
    }

    public Food find(long id) {
        return em.find(Food.class, id);
    }

    public List<Food> findByIds(List<Long> ids) {
        String jpql = "SELECT f FROM Food f WHERE f.id IN :ids";
        TypedQuery<Food> query = em.createQuery(jpql, Food.class);
        query.setParameter("ids", ids);
        return query.getResultList();
    }

    public List<Food> findAll() {
        return em.createNamedQuery("Food.findAll", Food.class).getResultList();
    }
}

