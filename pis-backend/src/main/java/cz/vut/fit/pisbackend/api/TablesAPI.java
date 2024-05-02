package cz.vut.fit.pisbackend.api;

import java.util.List;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;

import cz.vut.fit.pisbackend.api.dto.OrderResponseDTO;
import cz.vut.fit.pisbackend.api.dto.TableDTO;
import cz.vut.fit.pisbackend.data.Table;
import cz.vut.fit.pisbackend.service.OrderManager;
import cz.vut.fit.pisbackend.service.TableManager;

@Path("tables")
public class TablesAPI {

    @Inject
    private TableManager tableMgr;
    @Inject
    private OrderManager orderMgr;

    @Context
    private UriInfo context;

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<TableDTO> getTables() {
        return tableMgr.findAll().stream().map(t -> new TableDTO(t)).toList();
    }

    /**
     * Get all orders at the table with the given table id
     */
    @GET
    @Path("{id}/orders")
    @Produces({MediaType.APPLICATION_JSON})
    public List<OrderResponseDTO> getOrders(@PathParam("table_id") long tableId) {
        return orderMgr.findByTableId(tableId).stream().map(t -> new OrderResponseDTO(t)).toList();
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response addTable(TableDTO table) {
        Table t = new Table();
        t.setId(table.getId());
        t.setCapacity(table.getCapacity());

        Table saved = tableMgr.create(t);
        return Response.ok(new TableDTO(saved)).build();
    }
}
