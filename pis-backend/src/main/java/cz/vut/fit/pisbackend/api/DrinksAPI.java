package cz.vut.fit.pisbackend.api;

import cz.vut.fit.pisbackend.api.dto.DrinkDTO;
import cz.vut.fit.pisbackend.service.DrinkManager;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.UriInfo;

import java.util.List;

@Path("drinks")
public class DrinksAPI {

    @Inject
    private DrinkManager drinkMgr;

    @Context
    private UriInfo context;

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    public List<DrinkDTO> getAll() {
        return drinkMgr.findAll().stream().map(x -> new DrinkDTO(x)).toList();
    }

}
