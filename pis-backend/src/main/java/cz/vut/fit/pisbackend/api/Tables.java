package cz.vut.fit.pisbackend.api;

import java.net.URI;
import java.util.Date;
import java.util.List;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
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
import cz.vut.fit.pisbackend.api.dto.TableDTO;
import cz.vut.fit.pisbackend.data.Table;
import cz.vut.fit.pisbackend.service.TableManager;

@Path("tables")
public class Tables {

    @Inject
    private TableManager tableMgr;
    @Context
    private UriInfo context;

    // TODO query params
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<TableDTO> getTables(@QueryParam("available") Boolean available) {
        if (available) {
            // TODO
            return tableMgr.findAll().stream().map(t -> new TableDTO(t)).toList();
        } else {
            return tableMgr.findAll().stream().map(t -> new TableDTO(t)).toList();
        }
    }
}
