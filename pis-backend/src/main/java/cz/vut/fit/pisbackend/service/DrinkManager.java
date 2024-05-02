package cz.vut.fit.pisbackend.service;

import cz.vut.fit.pisbackend.data.Drink;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;


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
        if (ids.isEmpty()) {
            return new ArrayList<Drink>();
        }
        String jpql = "SELECT f FROM Drink f WHERE f.id IN :ids";
        return em.createQuery(jpql, Drink.class)
                    .setParameter("ids", ids)
                    .getResultList();
    }

    public List<Drink> findAll() {
        return em.createNamedQuery("Drink.findAll", Drink.class).getResultList();
    }
}


