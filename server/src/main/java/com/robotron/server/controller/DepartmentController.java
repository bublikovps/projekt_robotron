package com.robotron.server.controller;

import com.robotron.server.dto.department.DepartmentCreateRequest;
import com.robotron.server.dto.department.DepartmentResponse;
import com.robotron.server.dto.department.DepartmentUpdateRequest;
import com.robotron.server.service.DepartmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "http://localhost:4200")
@Tag(
        name = "Department Management",
        description = "Verwaltung von Abteilungen"
)
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(
            DepartmentService departmentService) {

        this.departmentService = departmentService;
    }

    @GetMapping
    @Operation(
            summary = "Alle Abteilungen laden"
    )
    public List<DepartmentResponse>
    getAllDepartments() {

        return departmentService
                .getAllDepartments();
    }

    @PostMapping
    @Operation(
            summary = "Abteilung erstellen"
    )
    public ResponseEntity<?> createDepartment(
            @Valid
            @RequestBody
            DepartmentCreateRequest request) {

        return ResponseEntity.ok(
                departmentService
                        .createDepartment(request)
        );
    }

    @PutMapping("/{id}")
    @Operation(
            summary = "Abteilung bearbeiten"
    )
    public ResponseEntity<?> updateDepartment(
            @PathVariable Long id,
            @Valid
            @RequestBody
            DepartmentUpdateRequest request) {

        return ResponseEntity.ok(
                departmentService
                        .updateDepartment(
                                id,
                                request
                        )
        );
    }

    @DeleteMapping("/{id}")
    @Operation(
            summary = "Abteilung archivieren"
    )
    public ResponseEntity<?> archiveDepartment(
            @PathVariable Long id) {

        departmentService.archiveDepartment(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Abteilung archiviert."
                )
        );
    }

    @PutMapping("/{id}/restore")
    @Operation(
            summary = "Abteilung wiederherstellen"
    )
    public ResponseEntity<?> restoreDepartment(
            @PathVariable Long id) {

        departmentService.restoreDepartment(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Abteilung wiederhergestellt."
                )
        );
    }

    @DeleteMapping("/{id}/permanent")
    @Operation(
            summary = "Abteilung dauerhaft löschen"
    )
    public ResponseEntity<?> permanentlyDeleteDepartment(
            @PathVariable Long id) {

        departmentService
                .permanentlyDeleteDepartment(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Abteilung dauerhaft gelöscht."
                )
        );
    }
}