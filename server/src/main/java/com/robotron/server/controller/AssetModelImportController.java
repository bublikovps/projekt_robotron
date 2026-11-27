package com.robotron.server.controller;

import com.robotron.server.service.AssetModelImportService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/asset-models/import")
@Tag(
        name = "Asset Model Import",
        description =
                "Import of asset models from Excel files"
)
public class AssetModelImportController {

    private final AssetModelImportService
            assetModelImportService;

    public AssetModelImportController(
            AssetModelImportService assetModelImportService
    ) {

        this.assetModelImportService =
                assetModelImportService;

    }

    @Operation(
            summary =
                    "Import Asset Models",
            description =
                    "Imports asset models from an Excel file"
    )
    @PostMapping
    public ResponseEntity<?> importAssetModels(
            @RequestParam("file")
            MultipartFile file
    ) {

        try {

            int imported =
                    assetModelImportService
                            .importAssetModels(
                                    file
                            );

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            imported +
                                    " Asset Models importiert."
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