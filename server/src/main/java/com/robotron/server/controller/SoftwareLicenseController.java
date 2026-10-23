package com.robotron.server.controller;

import com.robotron.server.dto.softwarelicense.SoftwareLicenseCreateRequest;
import com.robotron.server.dto.softwarelicense.SoftwareLicenseResponse;
import com.robotron.server.dto.softwarelicense.SoftwareLicenseUpdateRequest;
import com.robotron.server.service.SoftwareLicenseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name = "Software License Management",
        description = "Management of software licenses"
)
@RestController
@RequestMapping("/api/software-licenses")
public class SoftwareLicenseController {

    private final SoftwareLicenseService service;

    public SoftwareLicenseController(
            SoftwareLicenseService service) {

        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "Create Software License",
            description = "Creates a new software license"
    )
    public SoftwareLicenseResponse create(
            @RequestBody
            SoftwareLicenseCreateRequest request) {

        return service.create(request);
    }

    @GetMapping
    @Operation(
            summary = "Get All Software Licenses",
            description = "Returns all software licenses"
    )
    public List<SoftwareLicenseResponse> getAll() {

        return service.getAll();
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "Get Software License By ID",
            description = "Returns a software license by identifier"
    )
    public SoftwareLicenseResponse getById(
            @PathVariable Long id) {

        return service.getById(id);
    }

    @PutMapping("/{id}")
    @Operation(
            summary = "Update Software License",
            description = "Updates software license information"
    )
    public SoftwareLicenseResponse update(
            @PathVariable Long id,
            @RequestBody
            SoftwareLicenseUpdateRequest request) {

        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
            summary = "Archive Software License",
            description = "Archives a software license"
    )
    public void deactivate(
            @PathVariable Long id) {

        service.deactivate(id);
    }
}