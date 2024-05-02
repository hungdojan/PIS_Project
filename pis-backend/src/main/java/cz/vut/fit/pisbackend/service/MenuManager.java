package cz.vut.fit.pisbackend.service;

import java.util.Date;
import java.util.List;

import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

import cz.vut.fit.pisbackend.data.Menu;

@RequestScoped
public class MenuManager {

    @PersistenceContext
    private EntityManager em;

    public MenuManager() {
    }

    @Transactional
    public Menu create(Menu o) {
        em.persist(o);
        return o;
    }

    @Transactional
    public void remove(Menu o) {
        em.remove(em.merge(o));
    }

    @Transactional
    public Menu update(Menu o) {
        return em.merge(o);
    }

    public Menu find(long id) {
        return em.find(Menu.class, id);
    }

    public List<Menu> findAll() {
        return em.createNamedQuery("Menu.findAll", Menu.class).getResultList();
    }
}

