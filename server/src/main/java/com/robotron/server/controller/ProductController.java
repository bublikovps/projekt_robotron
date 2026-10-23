package com.robotron.server.controller;

import com.robotron.server.dto.product.ProductCreateRequest;
import com.robotron.server.dto.product.ProductResponse;
import com.robotron.server.dto.product.ProductUpdateRequest;
import com.robotron.server.service.ProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@Tag(
        name = "Product Management",
        description = "Produktverwaltung für den Unternehmenskatalog"
)
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    private static final Logger log =
            LoggerFactory.getLogger(ProductController.class);

    private final ProductService productService;

    public ProductController(
            ProductService productService) {

        this.productService = productService;
    }

    @Operation(
            summary = "Produkte laden",
            description = "Lädt aktive Produkte mit optionaler Suche und Kategorie-Filter."
    )
    @GetMapping
    public List<ProductResponse> getAllProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long categoryId) {

        log.info(
                "[CATALOG] Abfrage fuer Produkte. Kategorie-ID: {}, Suchbegriff: '{}'",
                categoryId,
                search
        );

        return productService.getAllProducts(
                search,
                categoryId
        );
    }

    @Operation(
            summary = "Produkt nach ID laden",
            description = "Lädt ein einzelnes Produkt anhand der ID."
    )
    @GetMapping("/{id}")
    public ProductResponse getProductById(
            @PathVariable Long id) {

        return productService.getProductById(id);
    }

    @Operation(
            summary = "Produkt erstellen",
            description = "Erstellt ein neues Produkt im Katalog."
    )
    @PostMapping
    public ResponseEntity<?> createProduct(
            @Valid
            @RequestBody ProductCreateRequest request) {

        return ResponseEntity.ok(
                productService.createProduct(request)
        );
    }

    @Operation(
            summary = "Produkt aktualisieren",
            description = "Aktualisiert ein bestehendes Produkt."
    )
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @Valid
            @RequestBody ProductUpdateRequest request) {

        return ResponseEntity.ok(
                productService.updateProduct(
                        id,
                        request
                )
        );
    }

    @Operation(
            summary = "Produkt archivieren",
            description = "Archiviert ein Produkt durch Deaktivierung."
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<?> softDeleteProduct(
            @PathVariable Long id) {

        productService.archiveProduct(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Produkt erfolgreich archiviert."
                )
        );
    }

    @Operation(
            summary = "Produkt wiederherstellen",
            description = "Stellt ein archiviertes Produkt wieder her."
    )
    @PutMapping("/{id}/restore")
    public ResponseEntity<?> restoreProduct(
            @PathVariable Long id) {

        productService.restoreProduct(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Produkt erfolgreich wiederhergestellt."
                )
        );
    }

    @Operation(
            summary = "Produkt dauerhaft löschen",
            description = "Löscht ein Produkt dauerhaft aus der Datenbank."
    )
    @DeleteMapping("/{id}/permanent")
    public ResponseEntity<?> permanentlyDeleteProduct(
            @PathVariable Long id) {

        productService.permanentlyDeleteProduct(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Produkt dauerhaft gelöscht."
                )
        );
    }
}