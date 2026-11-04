package com.robotron.server.catalog.controller;

import com.robotron.server.catalog.dto.CatalogCategoryResponse;
import com.robotron.server.catalog.dto.CatalogProductResponse;
import com.robotron.server.catalog.service.CatalogService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catalog")
@Tag(
        name = "Public Catalog",
        description = "Öffentlicher Produktkatalog"
)
@CrossOrigin(
        origins = "http://localhost:4200"
)
public class CatalogController {

    private final CatalogService catalogService;

    public CatalogController(
            CatalogService catalogService) {

        this.catalogService = catalogService;
    }

    @Operation(
            summary = "Katalog Produkte"
    )
    @GetMapping("/products")
    public List<CatalogProductResponse>
    getProducts(

            @RequestParam(
                    required = false
            )
            String search,

            @RequestParam(
                    required = false
            )
            Long categoryId
    ) {

        return catalogService.getProducts(
                search,
                categoryId
        );
    }

    @Operation(
            summary = "Katalog Produkt Details"
    )
    @GetMapping("/products/{id}")
    public CatalogProductResponse
    getProductById(
            @PathVariable Long id) {

        return catalogService
                .getProductById(id);
    }

    @Operation(
            summary = "Katalog Kategorien"
    )
    @GetMapping("/categories")
    public List<CatalogCategoryResponse>
    getCategories() {

        return catalogService
                .getCategories();
    }
}