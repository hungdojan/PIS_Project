package cz.vut.fit.pisbackend.api;

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
    @Produces({ MediaType.APPLICATION_JSON })
    public List<FoodDTO> getAll() {
        return foodMgr.findAll().stream().map(x -> new FoodDTO(x)).toList();
    }

    @POST
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
            Food savedFood = foodMgr.create(f);
            final URI uri = UriBuilder.fromPath("/foods/{resourceServerId}").build(savedFood.getId());
            return Response.created(uri).entity(savedFood).build();
        }
        else{
            return Response.status(Response.Status.CONFLICT).entity(new ResponseMessageDTO("duplicate id")).build();
        }
    }
}
