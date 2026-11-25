package com.robotron.server.controller;

import com.robotron.server.dto.assetmodel.AssetModelCreateRequest;
import com.robotron.server.dto.assetmodel.AssetModelResponse;
import com.robotron.server.dto.assetmodel.AssetModelUpdateRequest;
import com.robotron.server.service.AssetModelService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/asset-models")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowCredentials = "true"
)
public class AssetModelController {

    private final AssetModelService assetModelService;

    public AssetModelController(
            AssetModelService assetModelService
    ) {
        this.assetModelService = assetModelService;
    }

    @GetMapping
    public List<AssetModelResponse> getAll() {

        return assetModelService.getAll();

    }

    @PostMapping
    public AssetModelResponse create(
            @RequestBody
            AssetModelCreateRequest request
    ) {

        return assetModelService.create(
                request
        );

    }

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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> archive(
            @PathVariable Long id
    ) {

        assetModelService.archive(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Asset Model archiviert."
                )
        );

    }

    @PutMapping("/{id}/restore")
    public ResponseEntity<?> restore(
            @PathVariable Long id
    ) {

        assetModelService.restore(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Asset Model wiederhergestellt."
                )
        );

    }
}
