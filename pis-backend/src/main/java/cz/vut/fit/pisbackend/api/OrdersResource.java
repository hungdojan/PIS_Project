package cz.vut.fit.pisbackend.api;

import java.net.URI;
import java.util.Date;
import java.util.List;
import java.time.LocalDate;
import java.time.ZoneId;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import jakarta.ws.rs.core.UriBuilder;
import jakarta.ws.rs.core.UriInfo;

import cz.vut.fit.pisbackend.data.Food;
import cz.vut.fit.pisbackend.data.Room;
import cz.vut.fit.pisbackend.data.Order;
import cz.vut.fit.pisbackend.data.Table;
import cz.vut.fit.pisbackend.service.OrderManager;
import cz.vut.fit.pisbackend.api.dto.ErrorDTO;
import cz.vut.fit.pisbackend.api.dto.OrderDTO;


@Path("orders")
public class OrdersResource {

    @Inject
    private OrderManager orderMgr;
    @Context
    private UriInfo context;

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    public List<OrderDTO> orders() {

        //Order o = orderMgr.find(id);
        //
        // TODO remove mocked data
        Order o = new Order();
        o.setAtTime(new Date()); // default ctor is the current date
        o.setPrepared(false);
        o.setPayed(false);
        Room r = new Room();
        r.setCapacity(25);
        r.setDescription("Very nice room :D");
        r.getOrders().add(o);
        o.setToRoom(r);

        Table t = new Table();
        t.setCapacity(4);
        t.getOrders().add(o);
        o.setToTable(t);

        Food f = new Food();
        f.setId(1);
        f.setName("Kureci platek");
        f.setDescription("Menzova delikatesa");
        f.setPrice(86);
        f.setType("Co je toto? :D");
        f.setGrams(210);
        f.getOrders().add(o);

        orderMgr.save(o);

        //o.getFoods().add(f);
        return orderMgr.findAll().stream().map(x -> new OrderDTO(x)).toList();
        //return Response.ok(new OrderDTO(o)).build();
    }

    /**
     * Adds a new order.
     * @param order The order to add.
     * @return
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addOrder(OrderDTO order)
    {
        Order saved = orderMgr.save(order.toEntity());
        final URI uri = UriBuilder.fromPath("/order/{resourceServerId}").build(saved.getId());
        return Response.created(uri).entity(saved).build();
    }
}
