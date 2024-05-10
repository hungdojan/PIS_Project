package cz.vut.fit.pisbackend.api;

import java.util.Collection;
import java.util.ArrayList;
import java.util.List;

import cz.vut.fit.pisbackend.data.*;
import cz.vut.fit.pisbackend.service.*;
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
    @Inject
    private RoomManager roomMngr;

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
        Food food = null;
        Drink drink = null;
        cz.vut.fit.pisbackend.data.Table table = null;
        Room room = null;
        if (order.getFood() > 0) {
            food = foodMgr.find(order.getFood());
        }
        if (order.getDrink() > 0) {
            drink = drinkMgr.find(order.getDrink());
        }
        if (order.getToRoom() > 0) {
            room = roomMngr.find(order.getToRoom());
        }
        if (order.getToTable() > 0) {
            table = tableMgr.find(order.getToTable());
        }
        if(food != null && drink != null){
            return Response.status(Response.Status.BAD_REQUEST)
                .entity(new ResponseMessageDTO("Cannot add order with drink and food"))
                .build();
        }
        if(food == null && drink == null){
            return Response.status(Response.Status.BAD_REQUEST)
                .entity(new ResponseMessageDTO("Cannot add order without drink and food"))
                .build();
        }
        if(table != null && room != null){
            return Response.status(Response.Status.BAD_REQUEST)
                .entity(new ResponseMessageDTO("Cannot add order with table and room"))
                .build();
        }
        if(table == null && room == null){
            return Response.status(Response.Status.BAD_REQUEST)
                .entity(new ResponseMessageDTO("Cannot add order without table and room"))
                .build();
        }
        Order o = new Order();
        o.setAtTime(order.getAtTime());
        if (order.getPrepared() == null) {
            o.setPrepared(false);
        } else {
            o.setPrepared(order.getPrepared());
        }
        if (order.getPayed() == null) {
            o.setPayed(false);
        } else {
            o.setPayed(order.getPayed());
        }
        o.setPreparedTime(order.getPreparedTime());
        o.setToTable(table);
        o.setToRoom(room);
        o.setDrink(drink);
        o.setFood(food);
        Order saved = orderMgr.create(o);
        return Response.status(Response.Status.OK).entity(new OrderResponseDTO(saved)).build();
    }

    @PUT
    @Path("{id}")
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

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateOrders(List<OrderDTO> orders)
    {
        List<OrderResponseDTO> updated = new ArrayList<OrderResponseDTO>();
        for (OrderDTO order : orders) {
            Order found = orderMgr.find(order.getId());
            if (found == null) {
                //return Response.status(Response.Status.BAD_REQUEST)
                //               .entity(new ResponseMessageDTO("Cannot update non-existing order"))
                //               .build();
                continue;
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
            updated.add(new OrderResponseDTO(saved));
        }
        return Response.status(Response.Status.OK).entity(updated).build();
    }

    @DELETE
    @Path("{id}")
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

    @POST
    @Path("delete")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteOrders(List<Long> ids)
    {
        if (ids.isEmpty()) {
            Response.status(Response.Status.OK).build();
        }
        orderMgr.removeByIds(ids);
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
