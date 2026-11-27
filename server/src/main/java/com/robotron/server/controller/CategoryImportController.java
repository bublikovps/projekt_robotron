package com.robotron.server.controller;

import com.robotron.server.service.CategoryImportService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/categories/import")
@Tag(
        name = "Category Import",
        description = "Excel Import für Kategorien"
)
public class CategoryImportController {

    private final CategoryImportService categoryImportService;

    public CategoryImportController(
            CategoryImportService categoryImportService
    ) {
        this.categoryImportService = categoryImportService;
    }

    @Operation(
            summary = "Import Categories",
            description = "Importiert Kategorien aus einer Excel-Datei."
    )
    @PostMapping
    public ResponseEntity<?> importCategories(
            @RequestParam("file")
            MultipartFile file
    ) throws Exception {

        int imported =
                categoryImportService
                        .importExcel(file);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        imported + " Kategorien importiert."
                )
        );
    }
}