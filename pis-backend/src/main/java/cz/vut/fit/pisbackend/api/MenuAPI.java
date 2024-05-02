package cz.vut.fit.pisbackend.api;

import cz.vut.fit.pisbackend.api.dto.ResponseMessageDTO;
import cz.vut.fit.pisbackend.api.dto.MenuDTO;
import cz.vut.fit.pisbackend.api.dto.MenuResponseDTO;
import cz.vut.fit.pisbackend.data.Drink;
import cz.vut.fit.pisbackend.data.Food;
import cz.vut.fit.pisbackend.data.Menu;
import cz.vut.fit.pisbackend.service.DrinkManager;
import cz.vut.fit.pisbackend.service.FoodManager;
import cz.vut.fit.pisbackend.service.MenuManager;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;

import java.util.Collection;
import java.util.List;

@Path("menus")
public class MenuAPI {

    @Inject
    private MenuManager menuMgr;
    @Inject
    private FoodManager foodMgr;
    @Inject
    private DrinkManager drinkMgr;

    @Context
    private UriInfo context;

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<MenuResponseDTO> getMenus() {
        return menuMgr.findAll().stream().map(t -> new MenuResponseDTO(t)).toList();
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response addMenu(MenuDTO menu)
    {
        Collection<Food> food = foodMgr.findByIds(menu.getFoods());
        Collection<Drink> drinks = drinkMgr.findByIds(menu.getDrinks());

        Menu m = new Menu();
        m.setName(menu.getName());
        m.setDescription(menu.getDescription());
        m.setFoods(food);
        m.setDrinks(drinks);

        Menu saved = menuMgr.create(m);
        return Response.ok(new MenuResponseDTO(saved)).build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateMenu(MenuDTO menu)
    {
        Menu found = menuMgr.find(menu.getId());
        if (found == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity(new ResponseMessageDTO("Cannot update non-existing menu"))
                           .build();
        }
        Collection<Food> food = foodMgr.findByIds(menu.getFoods());
        Collection<Drink> drinks = drinkMgr.findByIds(menu.getDrinks());

        found.setName(menu.getName());
        found.setDescription(menu.getDescription());
        found.setFoods(food);
        found.setDrinks(drinks);

        Menu saved = menuMgr.update(found);
        return Response.ok(new MenuResponseDTO(saved)).build();
    }

    @DELETE
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteOrder(@PathParam("id") long id)
    {
        Menu found = menuMgr.find(id);
        if (found == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity(new ResponseMessageDTO("Cannot delete non-existing menu"))
                           .build();
        }
        menuMgr.remove(found);
        return Response.status(Response.Status.OK).build();
    }


}
