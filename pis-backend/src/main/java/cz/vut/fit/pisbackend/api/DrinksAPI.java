package cz.vut.fit.pisbackend.api;

import cz.vut.fit.pisbackend.api.dto.DrinkDTO;
import cz.vut.fit.pisbackend.api.dto.ResponseMessageDTO;
import cz.vut.fit.pisbackend.data.Drink;
import cz.vut.fit.pisbackend.service.DrinkManager;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.net.URI;
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

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateDrink(DrinkDTO drink)
    {
        Drink found = drinkMgr.find(drink.getId());
        if (found == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity(new ResponseMessageDTO("Cannot update non-existing drink"))
                           .build();
        }
        found.setName(drink.getName());
        found.setDescription(drink.getDescription());
        found.setPrice(drink.getPrice());
        found.setType(drink.getType());
        found.setVolume(drink.getVolume());

        Drink saved = drinkMgr.update(found);
        return Response.status(Response.Status.OK).entity(new DrinkDTO(saved)).build();
    }

    @DELETE
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteDrink(@PathParam("id") long id)
    {
        Drink found = drinkMgr.find(id);
        if (found == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity(new ResponseMessageDTO("Cannot delete non-existing drink"))
                           .build();
        }
        drinkMgr.remove(found);
        return Response.status(Response.Status.OK).build();
    }

}
