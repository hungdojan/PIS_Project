package cz.vut.fit.pisbackend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import cz.vut.fit.pisbackend.data.Table;


@RequestScoped
public class TableManager {

    @PersistenceContext
    private EntityManager em;

    public TableManager() {
    }

    @Transactional
    public Table save(Table p) {
        return em.merge(p);
    }

    @Transactional
    public void remove(Table p) {
        em.remove(em.merge(p));
    }

    @Transactional
    public void addTable(Table p) {
        save(p);
    }

    public Table find(long id) {
        return em.find(Table.class, id);
    }

    public List<Table> findAvailable() {
        return new ArrayList<>(); // TODO TableManager findAvailable
    }

    public List<Table> findAll() {
        return em.createNamedQuery("Table.findAll", Table.class).getResultList();
    }
}
