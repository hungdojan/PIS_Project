package cz.vut.fit.pisbackend.api;

import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import cz.vut.fit.pisbackend.api.dto.*;
import cz.vut.fit.pisbackend.data.*;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import cz.vut.fit.pisbackend.service.RoomManager;

@Path("/rooms")
public class Rooms {
    @Inject
    private RoomManager roomMngr;
    @Context
    private UriInfo context;

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<RoomDTO> getRooms() {
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
        if (existing == null){
            Room p = new Room();
            p.setCapacity(roomDTO.getCapacity());
            p.setDescription(roomDTO.getDescription());
            Room savedRoom = roomMngr.create(p);
            final URI uri = UriBuilder.fromPath("/room/{resourceServerId}").build(savedRoom.getId());
            return Response.created(uri).entity(savedRoom).build();
        }
        else{
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
        if (r != null){
            r.setCapacity(src.getCapacity());
            r.setDescription(src.getDescription());
            Room updatedRoom = roomMngr.update(r);
            return Response.ok(new RoomDTO(updatedRoom)).build();
        }
        else{
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorDTO("not found")).build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteRoom(@PathParam("id") Long id)
    {
        Room r = roomMngr.find(id);
        if (r != null){
            roomMngr.remove(r);
            return Response.status(Response.Status.OK).build();
        }
        else{
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorDTO("not found")).build();
        }
    }

    @Path("/{id}/reservations")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<ReservationResponseDTO> getRoomReservations(@PathParam("id") Long id)
    {
        Room r = roomMngr.find(id);
        List<ReservationResponseDTO> reservations = new ArrayList<>();
        if (r != null){
            reservations = r.getReservations().stream().map(re -> new ReservationResponseDTO(re)).toList();
        }
        return reservations;
    }


    @Path("/{id}/orders")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<OrderDTO> getRoomOrders(@PathParam("id") Long id)
    {
        Room r = roomMngr.find(id);
        List<OrderDTO> orders = new ArrayList<>();
        if (r != null){
            orders = r.getOrders().stream().map(o -> new OrderDTO(o)).toList();
        }
        return orders;
    }

    @GET
    @Path("/available")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces({MediaType.APPLICATION_JSON})
    public List<RoomDTO>  getAvailableRooms(ReservationDTO reservation) {
        Date at = reservation.getAt();
        Date until = reservation.getUntil();
        return roomMngr.findAvailableRooms(at,until).stream().map(r -> new RoomDTO(r)).toList();
    }

    @GET
    @Path("/available/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces({MediaType.APPLICATION_JSON})
    public Response getAvailableRooms(@PathParam("id") Long id, ReservationDTO reservation) {
        Date at = reservation.getAt();
        Date until = reservation.getUntil();
        Room r = roomMngr.find(id);
        if (r != null){
            return Response.ok(roomMngr.isRoomAvailable(r,at,until)).build();
        }
        else{
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorDTO("not found")).build();
        }
    }
}
