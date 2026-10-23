package com.robotron.server.controller;

import com.robotron.server.dto.deviceassignment.DeviceAssignmentCreateRequest;
import com.robotron.server.dto.deviceassignment.DeviceAssignmentResponse;
import com.robotron.server.service.DeviceAssignmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name = "Device Assignment Management",
        description = "Management of device assignments"
)
@RestController
@RequestMapping("/api/device-assignments")
public class DeviceAssignmentController {

    private final DeviceAssignmentService deviceAssignmentService;

    public DeviceAssignmentController(
            DeviceAssignmentService deviceAssignmentService) {

        this.deviceAssignmentService =
                deviceAssignmentService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "Assign Device",
            description = "Assigns a device to an employee"
    )
    public DeviceAssignmentResponse createAssignment(
            @RequestBody
            DeviceAssignmentCreateRequest request) {

        return deviceAssignmentService
                .createAssignment(request);
    }

    @GetMapping
    @Operation(
            summary = "Get All Device Assignments",
            description = "Returns all device assignments"
    )
    public List<DeviceAssignmentResponse>
    getAllAssignments() {

        return deviceAssignmentService
                .getAllAssignments();
    }

    @GetMapping("/active")
    @Operation(
            summary = "Get Active Device Assignments",
            description = "Returns only active device assignments"
    )
    public List<DeviceAssignmentResponse>
    getActiveAssignments() {

        return deviceAssignmentService
                .getActiveAssignments();
    }

    @PutMapping("/{id}/return")
    @Operation(
            summary = "Return Assigned Device",
            description = "Marks a device assignment as returned"
    )
    public DeviceAssignmentResponse returnDevice(
            @PathVariable Long id) {

        return deviceAssignmentService
                .returnDevice(id);
    }
}