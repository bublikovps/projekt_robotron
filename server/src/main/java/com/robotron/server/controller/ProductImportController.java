package com.robotron.server.controller;

import com.robotron.server.service.ProductImportService;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/products/import")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductImportController {

    private final ProductImportService
            productImportService;

    public ProductImportController(
            ProductImportService productImportService) {

        this.productImportService =
                productImportService;
    }

    @PostMapping
    public ResponseEntity<?> importProducts(
            @RequestParam("file")
            MultipartFile file) {

        try {

            int imported =
                    productImportService
                            .importProducts(file);

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            imported +
                                    " Produkte importiert."
                    )
            );

        } catch (Exception ex) {

            return ResponseEntity.badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    ex.getMessage()
                            )
                    );
        }
    }
}