package cz.vut.fit.pisbackend.api;

import cz.vut.fit.pisbackend.api.dto.*;
import cz.vut.fit.pisbackend.data.EmployeeManager;
import cz.vut.fit.pisbackend.data.Reservation;
import cz.vut.fit.pisbackend.service.ReservationManager;
import cz.vut.fit.pisbackend.service.RoomManager;
import cz.vut.fit.pisbackend.service.TableManager;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import java.net.URI;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Path("/reservations")
public class ReservationResource {

    @Inject
    private ReservationManager reservationMngr;
    @Inject
    private EmployeeManager employeeMngr;
    @Inject
    private TableManager tableMngr;
    @Inject
    private RoomManager roomMngr;

    @Context
    private UriInfo uriInfo;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<ReservationDTO> getReservations() {
        return reservationMngr.findAll().stream().map(r -> new ReservationDTO(r)).toList();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getReservationById(@PathParam("id") long id) {
        Reservation reservation = reservationMngr.find(id);
        if (reservation == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorDTO("Reservation not found")).build();
        }
        return Response.ok(new ReservationDTO(reservation)).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createReservation(ReservationDTO reservationDTO) {
        Reservation reservation = new Reservation();
        reservation.setAt(reservationDTO.getAt());
        reservation.setUntil(reservationDTO.getUntil());
        reservation.setName(reservationDTO.getName());
        reservation.setCount(reservationDTO.getCount());
        reservation.setPhone(reservationDTO.getPhone());
        reservation.setEmail(reservationDTO.getEmail());
        reservation.setCreatedBy(employeeMngr.find(reservationDTO.getCreatedByEmployeeId()));
        reservation.setTables(reservationDTO.getTableIds().stream().map(r->tableMngr.find(r)).toList());
        reservation.setRooms(reservationDTO.getRoomIds().stream().map(r->roomMngr.find(r)).toList());
        Reservation savedReservation = reservationMngr.create(reservation);
        URI uri = UriBuilder.fromPath("/reservations/{id}").build(savedReservation.getId());
        return Response.created(uri).entity(new ReservationDTO(savedReservation)).build();
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateReservation(@PathParam("id") Long id, ReservationDTO reservationDTO) {
        Reservation reservation = reservationMngr.find(id);
        if (reservation == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorDTO("Reservation not found")).build();
        }
        reservation.setAt(reservationDTO.getAt());
        reservation.setUntil(reservationDTO.getUntil());
        reservation.setName(reservationDTO.getName());
        reservation.setCount(reservationDTO.getCount());
        reservation.setPhone(reservationDTO.getPhone());
        reservation.setEmail(reservationDTO.getEmail());
        reservation.setCreatedBy(employeeMngr.find(reservationDTO.getCreatedByEmployeeId()));
        reservation.setTables(reservationDTO.getTableIds().stream().map(r->tableMngr.find(r)).toList());
        reservation.setRooms(reservationDTO.getRoomIds().stream().map(r->roomMngr.find(r)).toList());
        Reservation updatedReservation = reservationMngr.update(reservation);
        return Response.ok(new ReservationDTO(updatedReservation)).build();
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteReservation(@PathParam("id") Long id) {
        Reservation reservation = reservationMngr.find(id);
        if (reservation == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorDTO("Reservation not found")).build();
        }
        reservationMngr.remove(reservation);
        return Response.ok().build();
    }

    @GET
    @Path("/reservationstime")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<ReservationDTO> getReservationTime(ReservationDTO reservationDTO) {
        Date at = reservationDTO.getAt();
        Date until = reservationDTO.getUntil();
        List<Reservation> reservations = reservationMngr.findByDateRange(at, until);

        return reservations.stream().map(r -> new ReservationDTO(r)).toList();
    }
}
