package com.robotron.server.controller;

import com.robotron.server.dto.category.CategoryCreateRequest;
import com.robotron.server.dto.category.CategoryResponse;
import com.robotron.server.dto.category.CategoryUpdateRequest;
import com.robotron.server.service.CategoryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categories")
@Tag(
        name = "Category Management",
        description = "Verwaltung von Produktkategorien"
)
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(
            CategoryService categoryService) {

        this.categoryService = categoryService;
    }

    @Operation(
            summary = "Alle Kategorien laden",
            description = "Lädt alle aktiven Produktkategorien."
    )
    @GetMapping
    public List<CategoryResponse> getAllCategories() {

        return categoryService.getAllCategories();
    }

    @Operation(
            summary = "Kategorie erstellen",
            description = "Erstellt eine neue Produktkategorie."
    )
    @PostMapping
    public ResponseEntity<?> createCategory(
            @Valid
            @RequestBody CategoryCreateRequest request) {

        return ResponseEntity.ok(
                categoryService.createCategory(request)
        );
    }

    @Operation(
            summary = "Kategorie aktualisieren",
            description = "Aktualisiert eine bestehende Kategorie."
    )
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(
            @PathVariable Long id,
            @Valid
            @RequestBody CategoryUpdateRequest request) {

        return ResponseEntity.ok(
                categoryService.updateCategory(
                        id,
                        request
                )
        );
    }

    @Operation(
            summary = "Kategorie archivieren",
            description = "Archiviert eine Kategorie."
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<?> archiveCategory(
            @PathVariable Long id) {

        categoryService.archiveCategory(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Kategorie erfolgreich archiviert."
                )
        );
    }

    @Operation(
            summary = "Kategorie wiederherstellen",
            description = "Stellt eine archivierte Kategorie wieder her."
    )
    @PutMapping("/{id}/restore")
    public ResponseEntity<?> restoreCategory(
            @PathVariable Long id) {

        categoryService.restoreCategory(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Kategorie erfolgreich wiederhergestellt."
                )
        );
    }

    @Operation(
            summary = "Kategorie dauerhaft löschen",
            description = "Löscht eine Kategorie dauerhaft aus der Datenbank."
    )
    @DeleteMapping("/{id}/permanent")
    public ResponseEntity<?> permanentlyDeleteCategory(
            @PathVariable Long id) {

        categoryService.permanentlyDeleteCategory(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Kategorie dauerhaft gelöscht."
                )
        );
    }
}