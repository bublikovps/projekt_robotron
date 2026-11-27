package com.robotron.server.controller;

import com.robotron.server.dto.assetmodel.AssetModelCreateRequest;
import com.robotron.server.dto.assetmodel.AssetModelResponse;
import com.robotron.server.dto.assetmodel.AssetModelUpdateRequest;
import com.robotron.server.service.AssetModelService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/asset-models")
@Tag(
        name = "Asset Model Management",
        description =
                "Management of enterprise asset models"
)
public class AssetModelController {

    private final AssetModelService assetModelService;

    public AssetModelController(
            AssetModelService assetModelService
    ) {
        this.assetModelService =
                assetModelService;
    }

    @Operation(
            summary = "Get all asset models",
            description =
                    "Returns all active asset models"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description =
                            "Asset models loaded successfully"
            )
    })
    @GetMapping
    public List<AssetModelResponse>
    getAll() {

        return assetModelService.getAll();

    }

    @Operation(
            summary =
                    "Get active asset models",
            description =
                    "Returns all active asset models"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description =
                            "Active asset models loaded successfully"
            )
    })
    @GetMapping("/active")
    public List<AssetModelResponse>
    getActive() {

        return assetModelService.getAllActive();

    }

    @Operation(
            summary =
                    "Get archived asset models",
            description =
                    "Returns all archived asset models"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description =
                            "Archived asset models loaded successfully"
            )
    })
    @GetMapping("/archived")
    public List<AssetModelResponse>
    getArchived() {

        return assetModelService.getAllArchived();

    }

    @Operation(
            summary =
                    "Create asset model",
            description =
                    "Creates a new enterprise asset model"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description =
                            "Asset model created successfully"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description =
                            "Validation failed"
            )
    })
    @PostMapping
    public AssetModelResponse create(
            @RequestBody
            AssetModelCreateRequest request
    ) {

        return assetModelService.create(
                request
        );

    }

    @Operation(
            summary =
                    "Update asset model",
            description =
                    "Updates an existing asset model"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description =
                            "Asset model updated successfully"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description =
                            "Asset model not found"
            )
    })
    @PutMapping("/{id}")
    public AssetModelResponse update(
            @PathVariable Long id,
            @RequestBody
            AssetModelUpdateRequest request
    ) {

        return assetModelService.update(
                id,
                request
        );

    }

    @Operation(
            summary =
                    "Archive asset model",
            description =
                    "Archives an asset model"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description =
                            "Asset model archived successfully"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description =
                            "Asset model not found"
            )
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> archive(
            @PathVariable Long id
    ) {

        assetModelService.archive(
                id
        );

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Asset Model archiviert."
                )
        );

    }

    @Operation(
            summary =
                    "Restore asset model",
            description =
                    "Restores an archived asset model"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description =
                            "Asset model restored successfully"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description =
                            "Asset model not found"
            )
    })
    @PutMapping("/{id}/restore")
    public ResponseEntity<?> restore(
            @PathVariable Long id
    ) {

        assetModelService.restore(
                id
        );

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Asset Model wiederhergestellt."
                )
        );

    }
}