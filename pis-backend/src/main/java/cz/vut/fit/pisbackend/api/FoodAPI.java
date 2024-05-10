package cz.vut.fit.pisbackend.api;

import cz.vut.fit.pisbackend.JwtRoles;
import cz.vut.fit.pisbackend.api.dto.DrinkDTO;
import cz.vut.fit.pisbackend.api.dto.FoodDTO;
import cz.vut.fit.pisbackend.api.dto.ResponseMessageDTO;
import cz.vut.fit.pisbackend.data.Food;
import cz.vut.fit.pisbackend.service.FoodManager;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.net.URI;
import java.util.List;

@Path("foods")
public class FoodAPI {

    @Inject
    private FoodManager foodMgr;

    @Context
    private UriInfo context;

    @GET
    @JwtRoles({"staff", "manager"})
    @Produces({ MediaType.APPLICATION_JSON })
    public List<FoodDTO> getAll(@QueryParam("active") Boolean active) {
        if (active == null) {
            return foodMgr.findAll().stream().map(FoodDTO::new).toList();
        } else {
            return foodMgr.findActive(active).stream().map(FoodDTO::new).toList();
        }
    }

    @POST
    @JwtRoles({"manager"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createFood(FoodDTO food) {
        Food existing = foodMgr.find(food.getId());
        if (existing == null){
            Food f = new Food();
            f.setName(food.getName());
            f.setDescription(food.getDescription());
            f.setPrice(food.getPrice());
            f.setType(food.getType());
            f.setAllergens(food.getAllergens());
            f.setGrams(food.getGrams());
            f.setActive(food.isActive());
            Food savedFood = foodMgr.create(f);
            final URI uri = UriBuilder.fromPath("/foods/{resourceServerId}").build(savedFood.getId());
            return Response.created(uri).entity(savedFood).build();
        }
        else{
            return Response.status(Response.Status.CONFLICT).entity(new ResponseMessageDTO("duplicate id")).build();
        }
    }

    @PUT
    @Path("{id}")
    @JwtRoles({"manager"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateFood(FoodDTO food)
    {
        Food found = foodMgr.find(food.getId());
        if (found == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity(new ResponseMessageDTO("Cannot update non-existing food"))
                           .build();
        }
        found.setName(food.getName());
        found.setDescription(food.getDescription());
        found.setPrice(food.getPrice());
        found.setType(food.getType());
        found.setAllergens(food.getAllergens());
        found.setGrams(food.getGrams());
        found.setActive(food.isActive());
        Food saved = foodMgr.update(found);
        return Response.status(Response.Status.OK).entity(new FoodDTO(saved)).build();
    }

    @DELETE
    @Path("{id}")
    @JwtRoles({"manager"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteFood(@PathParam("id") long id)
    {
        Food found = foodMgr.find(id);
        if (found == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity(new ResponseMessageDTO("Cannot delete non-existing food"))
                           .build();
        }
        foodMgr.remove(found);
        return Response.status(Response.Status.OK).build();
    }

    @Path("types")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<String> getTypes() {
        return foodMgr.getAllUniqueTypes();
    }

}
