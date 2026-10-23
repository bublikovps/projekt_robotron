package com.robotron.server.controller;

import com.robotron.server.dto.licenseassignment.LicenseAssignmentCreateRequest;
import com.robotron.server.dto.licenseassignment.LicenseAssignmentResponse;
import com.robotron.server.service.LicenseAssignmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name = "License Assignment Management",
        description = "Management of software license assignments"
)
@RestController
@RequestMapping("/api/license-assignments")
public class LicenseAssignmentController {

    private final LicenseAssignmentService service;

    public LicenseAssignmentController(
            LicenseAssignmentService service) {

        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "Assign License",
            description = "Assigns a software license to an employee"
    )
    public LicenseAssignmentResponse createAssignment(
            @RequestBody
            LicenseAssignmentCreateRequest request) {

        return service.createAssignment(request);
    }

    @GetMapping
    @Operation(
            summary = "Get All License Assignments",
            description = "Returns all license assignments"
    )
    public List<LicenseAssignmentResponse>
    getAllAssignments() {

        return service.getAllAssignments();
    }

    @GetMapping("/active")
    @Operation(
            summary = "Get Active License Assignments",
            description = "Returns only active license assignments"
    )
    public List<LicenseAssignmentResponse>
    getActiveAssignments() {

        return service.getActiveAssignments();
    }

    @PutMapping("/{id}/revoke")
    @Operation(
            summary = "Revoke License Assignment",
            description = "Revokes an assigned software license"
    )
    public LicenseAssignmentResponse revokeAssignment(
            @PathVariable Long id) {

        return service.revokeAssignment(id);
    }
}