package cz.vut.fit.pisbackend.api;

import java.net.URI;
import java.util.Date;
import java.util.Collection;
import java.util.List;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.stream.Collectors;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.DELETE;
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
import cz.vut.fit.pisbackend.service.FoodManager;
import cz.vut.fit.pisbackend.service.OrderManager;

import cz.vut.fit.pisbackend.api.dto.ErrorDTO;
import cz.vut.fit.pisbackend.api.dto.FoodDTO;
import cz.vut.fit.pisbackend.api.dto.OrderDTO;
import cz.vut.fit.pisbackend.api.dto.OrderResponseDTO;


@Path("orders")
public class OrdersResource {

    @Inject
    private OrderManager orderMgr;
    @Inject
    private FoodManager foodMgr;

    @Context
    private UriInfo context;

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    public List<OrderResponseDTO> orders() {
        return orderMgr.findAll().stream().map(x -> new OrderResponseDTO(x)).toList();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addOrder(OrderDTO order)
    {
        Collection<Food> food = foodMgr.findByIds(order.getFoods());

        Order o = new Order();
        o.setAtTime(order.getAtTime());
        o.setPrepared(order.getPrepared());
        o.setPreparedTime(order.getPreparedTime());
        o.setPayed(order.getPayed());
        o.setFoods(food);

        Order saved = orderMgr.create(o);
        return Response.status(Response.Status.OK).entity(new OrderResponseDTO(saved)).build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateOrder(OrderDTO order)
    {
        Order found = orderMgr.find(order.getId());
        if (found == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity(new ErrorDTO("Cannot update non-existing order"))
                           .build();
        }
        Collection<Food> food = foodMgr.findByIds(order.getFoods());

        found.setAtTime(order.getAtTime());
        found.setPrepared(order.getPrepared());
        found.setPreparedTime(order.getPreparedTime());
        found.setPayed(order.getPayed());
        found.setFoods(food);

        Order saved = orderMgr.update(found);
        return Response.status(Response.Status.OK).entity(new OrderResponseDTO(saved)).build();
    }

    @DELETE
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteOrder(@PathParam("id") long id)
    {
        Order found = orderMgr.find(id);
        if (found == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity(new ErrorDTO("Cannot delete non-existing order"))
                           .build();
        }
        orderMgr.remove(found);
        return Response.status(Response.Status.OK).build();
    }

}
