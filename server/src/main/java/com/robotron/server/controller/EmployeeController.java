package com.robotron.server.controller;

import com.robotron.server.dto.employee.EmployeeCreateRequest;
import com.robotron.server.dto.employee.EmployeeResponse;
import com.robotron.server.dto.employee.EmployeeUpdateRequest;
import com.robotron.server.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:4200")
@Tag(
        name = "Employee Management",
        description = "Verwaltung von Mitarbeitern"
)
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(
            EmployeeService employeeService) {

        this.employeeService = employeeService;
    }

    @GetMapping
    @Operation(summary = "Alle Mitarbeiter laden")
    public List<EmployeeResponse> getAllEmployees() {

        return employeeService.getAllEmployees();
    }

    @PostMapping
    @Operation(summary = "Mitarbeiter erstellen")
    public ResponseEntity<?> createEmployee(
            @Valid
            @RequestBody
            EmployeeCreateRequest request) {

        return ResponseEntity.ok(
                employeeService.createEmployee(
                        request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mitarbeiter bearbeiten")
    public ResponseEntity<?> updateEmployee(
            @PathVariable Long id,
            @Valid
            @RequestBody
            EmployeeUpdateRequest request) {

        return ResponseEntity.ok(
                employeeService.updateEmployee(
                        id,
                        request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Mitarbeiter archivieren")
    public ResponseEntity<?> archiveEmployee(
            @PathVariable Long id) {

        employeeService.archiveEmployee(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Mitarbeiter archiviert."
                )
        );
    }

    @PutMapping("/{id}/restore")
    @Operation(summary = "Mitarbeiter wiederherstellen")
    public ResponseEntity<?> restoreEmployee(
            @PathVariable Long id) {

        employeeService.restoreEmployee(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Mitarbeiter wiederhergestellt."
                )
        );
    }

    @DeleteMapping("/{id}/permanent")
    @Operation(summary = "Mitarbeiter dauerhaft löschen")
    public ResponseEntity<?> permanentlyDeleteEmployee(
            @PathVariable Long id) {

        employeeService.permanentlyDeleteEmployee(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Mitarbeiter dauerhaft gelöscht."
                )
        );
    }
}