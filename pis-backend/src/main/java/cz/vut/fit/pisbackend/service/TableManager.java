package cz.vut.fit.pisbackend.service;

import cz.vut.fit.pisbackend.data.Table;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;


@RequestScoped
public class TableManager {

    @PersistenceContext
    private EntityManager em;

    public TableManager() {
    }

    @Transactional
    public Table create(Table t) {
        em.persist(t);
        return t;
    }

    @Transactional
    public void remove(Table t) {
        em.remove(em.merge(t));
    }

    @Transactional
    public Table update(Table t) {
        return em.merge(t);
    }

    public Table find(long id) {
        return em.find(Table.class, id);
    }

    public List<Table> findAll() {
        return em.createNamedQuery("Table.findAll", Table.class).getResultList();
    }
}
