package cz.vut.fit.pisbackend.api;

import java.net.URI;
import java.util.Date;
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


@Path("order")
public class OrdersResource {

    @Inject
    private OrderManager orderMgr;
    @Context
    private UriInfo context;

    @Path("{id}")
    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    public Response order(@PathParam("id") Long id) {
        if (id == null || id < 0)  {
            // TODO http bad request?
        }

        //Order o = orderMgr.find(id);
        //
        // TODO remove mocked data
        Order o = new Order();
        o.setId(1);
        o.setAtTime(new Date()); // default ctor is the current date
        o.setPrepared(false);
        o.setPayed(false);
        Room r = new Room();
        r.setId(1);
        r.setCapacity(25);
        r.setDescription("Very nice room :D");
        r.getOrders().add(o);
        o.setToRoom(r);

        Table t = new Table();
        t.setId(1);
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

        //o.getFoods().add(f);
        Order os = orderMgr.find(id);
        if (os != null)
            return Response.ok(new OrderDTO(os)).build();
        else
            return Response.status(Status.NOT_FOUND).entity(new ErrorDTO("not found")).build();
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
        Order existing = orderMgr.find(order.getId());
        if (order.getAtTime() == null) {
            return Response.status(Status.CONFLICT).entity(new ErrorDTO("wtf")).build();
        }
        if (existing == null)
        {
            Order o = new Order();
            o.setId(order.getId());
            o.setAtTime(order.getAtTime());
            o.setPrepared(order.getPrepared());
            o.setPreparedTime(order.getPreparedTime());
            o.setPayed(order.getPayed());

            Order saved = orderMgr.save(o);
            final URI uri = UriBuilder.fromPath("/order/{resourceServerId}").build(saved.getId());
            return Response.created(uri).entity(saved).build();
        }
        else
        {
            return Response.status(Status.CONFLICT).entity(new ErrorDTO("duplicate id")).build();
        }
    }
}
