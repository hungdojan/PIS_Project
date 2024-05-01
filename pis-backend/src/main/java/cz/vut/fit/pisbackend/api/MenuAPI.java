package cz.vut.fit.pisbackend.api;

import java.io.*;
import java.net.URI;
import java.util.Date;
import java.util.List;
import java.util.Collection;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import jakarta.ws.rs.core.UriBuilder;
import jakarta.ws.rs.core.UriInfo;

import cz.vut.fit.pisbackend.api.dto.ErrorDTO;
import cz.vut.fit.pisbackend.api.dto.MenuDTO;
import cz.vut.fit.pisbackend.api.dto.MenuResponseDTO;
import cz.vut.fit.pisbackend.data.Drink;
import cz.vut.fit.pisbackend.data.Food;
import cz.vut.fit.pisbackend.data.Menu;
import cz.vut.fit.pisbackend.service.DrinkManager;
import cz.vut.fit.pisbackend.service.FoodManager;
import cz.vut.fit.pisbackend.service.MenuManager;

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
        System.out.println("hellooooooooooooooooooooooooooooooooooooooooooooooooooo");
        System.out.println(menu.getFoods());
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
        System.out.println("here");
        System.out.println(menu.getName());
        Menu found = menuMgr.find(menu.getId());
        if (found == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                           .entity(new ErrorDTO("Cannot update non-existing menu"))
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
                           .entity(new ErrorDTO("Cannot delete non-existing menu"))
                           .build();
        }
        menuMgr.remove(found);
        return Response.status(Response.Status.OK).build();
    }


}
