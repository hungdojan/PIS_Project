package cz.vut.fit.pisbackend.api;

import cz.vut.fit.pisbackend.api.dto.FoodDTO;
import cz.vut.fit.pisbackend.service.FoodManager;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.UriInfo;

import java.util.List;

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
