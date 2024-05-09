package cz.vut.fit.pisbackend.data;

import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;


@RequestScoped
public class EmployeeManager {

    @PersistenceContext
    private EntityManager em;

    public EmployeeManager() {}

    @Transactional
    public void create(Employee p) {
        em.persist(p);
        em.flush();
    }

    @Transactional
    public void remove(Employee p) {
        em.remove(em.merge(p));
    }

    @Transactional
    public Employee update(Employee p) {
        return em.merge(p);
    }

    public Employee find(long id) {
        return em.find(Employee.class, id);
    }

    public Employee getUser(String username) {
        return em.createQuery(
            "SELECT e FROM Employee e WHERE e.login = :username", Employee.class
        ).setParameter("username", username).getResultList().stream().findFirst().orElse(null);
    }

    public List<Employee> getAll() {
        return em.createQuery("Select e FROM Employee e", Employee.class).getResultList();
    }
    public List<String> getAllUniqueRoles() {
        return em.createQuery("SELECT DISTINCT e.role FROM Employee e", String.class).getResultList();
    }
}
