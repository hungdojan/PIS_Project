package cz.vut.fit.pisbackend.api;

import java.net.URI;
import java.util.Date;
import java.util.List;

import cz.vut.fit.pisbackend.api.dto.*;
import cz.vut.fit.pisbackend.data.*;
import cz.vut.fit.pisbackend.data.EmployeeManager;
import jakarta.inject.Inject;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import cz.vut.fit.pisbackend.service.RoomManager;

import java.util.List;

@Path("/rooms")
public class Rooms {
    @Inject
    private RoomManager roomMngr;
    @Context
    private UriInfo context;

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response getRooms() {
        return roomMngr.findAll().stream().map(r -> new RoomDTO(r)).toList();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRoomById(@PathParam("id") long id) {
        Room room = roomMngr.find(id);
        if (room == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorDTO("not found")).build();
        }
        return Response.ok(new RoomDTO(room)).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createRoom(RoomDTO roomDTO) {
        Room existing = roomMngr.find(roomDTO.getId());
        if (existing == null)
        {
            Room p = new Room();
            p.setId(roomDTO.getId());
            p.setCapacity(roomDTO.getCapacity());
            p.setDescription(roomDTO.getDescription());
            Room savedRoom = roomMngr.save(p);
            final URI uri = UriBuilder.fromPath("/room/{resourceServerId}").build(savedRoom.getId());
            return Response.created(uri).entity(savedRoom).build();
        }
        else
        {
            return Response.status(Response.Status.CONFLICT).entity(new ErrorDTO("duplicate id")).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateRoom(@PathParam("id") Long id, RoomDTO src)
    {
        Room r = roomMngr.find(id);
        if (r != null)
        {
            r.setId(src.getId());
            r.setCapacity(src.getCapacity());
            r.setDescription(src.getDescription());
            return Response.ok(r).build();
        }
        else
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorDTO("not found")).build();
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteRoom(@PathParam("id") Long id)
    {
        Room r = roomMngr.find(id);
        if (r != null)
        {
            roomMngr.remove(r);
            return Response.ok().build();
        }
        else
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorDTO("not found")).build();
    }

    @Path("/{id}/reservations")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRoomReservations(@PathParam("id") Long id)
    {
        Room r = roomMngr.find(id);
        if (r != null)
            return Response.ok(r.getReservations()).build();
        else
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorDTO("not found")).build();
    }


    @Path("/{id}/orders")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRoomOrders(@PathParam("id") Long id)
    {
        Room r = roomMngr.find(id);
        if (r != null)
            return Response.ok(r.getOrders()).build();
        else
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorDTO("not found")).build();
    }

    @GET
    @Path("/available/{at}/{until}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getAvailableRooms(@PathParam("at") Date at,@PathParam("until") Date until) {
        return roomMngr.findAvailableRooms(at,until).stream().map(r -> new RoomDTO(r)).toList();
    }
    
    @GET
    @Path("/available/{id}/{at}/{until}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getAvailableRooms(@PathParam("id") Long id,@PathParam("at") Date at,@PathParam("until") Date until) {
        Room r = roomMngr.find(id);
        if (r != null)
            return Response.ok(roomMngr.isRoomAvailable(r,at,until)).build();
        else
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorDTO("not found")).build();
    }
}
