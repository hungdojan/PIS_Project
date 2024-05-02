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
import cz.vut.fit.pisbackend.service.FoodManager;

import cz.vut.fit.pisbackend.api.dto.ErrorDTO;
import cz.vut.fit.pisbackend.api.dto.FoodDTO;

@Path("food")
public class FoodAPI {

    @Inject
    private FoodManager foodMgr;

    @Context
    private UriInfo context;

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    public List<FoodDTO> getAll() {
        return foodMgr.findAll().stream().map(x -> new FoodDTO(x)).toList();
    }

}
