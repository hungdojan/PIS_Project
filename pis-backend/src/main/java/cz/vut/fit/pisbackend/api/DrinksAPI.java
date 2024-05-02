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
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createDrink(DrinkDTO drink) {
        Drink existing = drinkMgr.find(drink.getId());
        if (existing == null){
            Drink d = new Drink();
            d.setName(drink.getName());
            d.setDescription(drink.getDescription());
            d.setPrice(drink.getPrice());
            d.setType(drink.getType());
            d.setVolume(drink.getVolume());
            Drink savedDrink = drinkMgr.create(d);
            final URI uri = UriBuilder.fromPath("/drinks/{resourceServerId}").build(savedDrink.getId());
            return Response.created(uri).entity(savedDrink).build();
        }
        else{
            return Response.status(Response.Status.CONFLICT).entity(new ResponseMessageDTO("duplicate id")).build();
        }
    }

}
