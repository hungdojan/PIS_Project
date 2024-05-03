package cz.vut.fit.pisbackend.api;

import java.util.Collection;
import java.util.List;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;

import cz.vut.fit.pisbackend.data.Drink;
import cz.vut.fit.pisbackend.data.Food;
import cz.vut.fit.pisbackend.data.Order;
import cz.vut.fit.pisbackend.data.Table;
import cz.vut.fit.pisbackend.service.DrinkManager;
import cz.vut.fit.pisbackend.service.FoodManager;
import cz.vut.fit.pisbackend.service.OrderManager;
import cz.vut.fit.pisbackend.service.TableManager;

import cz.vut.fit.pisbackend.api.dto.ResponseMessageDTO;
import cz.vut.fit.pisbackend.api.dto.OrderDTO;
import cz.vut.fit.pisbackend.api.dto.OrderResponseDTO;


@Path("orders")
public class OrdersAPI {

    @Inject
    private OrderManager orderMgr;
    @Inject
    private FoodManager foodMgr;
    @Inject
    private DrinkManager drinkMgr;
    @Inject
    private TableManager tableMgr;

    @Context
    private UriInfo context;

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    public List<OrderResponseDTO> orders(@QueryParam("paid") Boolean paid) {
        if (paid == null) {
            return orderMgr.findAll().stream().map(OrderResponseDTO::new).toList();
        } else {
            return orderMgr.findByPaidState(paid).stream().map(OrderResponseDTO::new).toList();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addOrder(OrderDTO order)
    {
        Food food = foodMgr.find(order.getFood());
        Drink drink = drinkMgr.find(order.getDrink());
        if(food != null && drink != null){
            return Response.status(Response.Status.BAD_REQUEST)
                .entity(new ResponseMessageDTO("Cannot add order with drink and food"))
                .build();
        }
        if(food == null && drink == null){
            return Response.status(Response.Status.BAD_REQUEST)
                .entity(new ResponseMessageDTO("Cannot add order with drink and food"))
                .build();
        }
        Table table = tableMgr.find(order.getToTable());
        Order o = new Order();
        o.setAtTime(order.getAtTime());
        o.setPrepared(order.getPrepared());
        o.setPreparedTime(order.getPreparedTime());
        o.setPayed(order.getPayed());
        o.setToTable(table);
        o.setDrink(drink);
        o.setFood(food);
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
                           .entity(new ResponseMessageDTO("Cannot update non-existing order"))
                           .build();
        }
        Food food = foodMgr.find(order.getFood());
        Drink drink = drinkMgr.find(order.getDrink());

        found.setAtTime(order.getAtTime());
        found.setPrepared(order.getPrepared());
        found.setPreparedTime(order.getPreparedTime());
        found.setPayed(order.getPayed());
        found.setFood(food);
        found.setDrink(drink);

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
                           .entity(new ResponseMessageDTO("Cannot delete non-existing order"))
                           .build();
        }
        orderMgr.remove(found);
        return Response.status(Response.Status.OK).build();
    }

    @GET
    @Path("payed/{table_id}")
    @Produces({ MediaType.APPLICATION_JSON })
    public List<OrderResponseDTO> orders(@PathParam("table_id") long table_id, @QueryParam("paid") Boolean paid) {
        if (paid == null) {
            return orderMgr.findByTableId(table_id).stream().map(OrderResponseDTO::new).toList();
        } else {
            return orderMgr.findByTableIdAndPaidState(table_id,paid).stream().map(OrderResponseDTO::new).toList();
        }
    }

}
