package cz.vut.fit.pisbackend.data;

import java.util.List;

import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import cz.vut.fit.pisbackend.data.Employee;


@RequestScoped
public class EmployeeManager {

    @PersistenceContext
    private EntityManager em;

    public EmployeeManager() {}

    @Transactional
    public Employee save(Employee p) {
        return em.merge(p);
    }

    @Transactional
    public void remove(Employee p) {
        em.remove(em.merge(p));
    }

    @Transactional
    public void addEmployee(Employee p) {
        save(p);
    }

    public Employee find(long id) {
        return em.find(Employee.class, id);
    }

        /*
    public List<Employee> findAll() {
        return em.createNamedQuery("Employee.findAll", Employee.class).getResultList();
    }
        */

}
