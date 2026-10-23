package com.robotron.server.controller;

import com.robotron.server.dto.contract.EmploymentContractCreateRequest;
import com.robotron.server.dto.contract.EmploymentContractResponse;
import com.robotron.server.dto.contract.EmploymentContractUpdateRequest;
import com.robotron.server.service.EmploymentContractService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contracts")
@CrossOrigin(origins = "http://localhost:4200")
@Tag(
        name = "Employment Contract Management",
        description = "Verwaltung von Arbeitsverträgen"
)
public class EmploymentContractController {

    private final EmploymentContractService contractService;

    public EmploymentContractController(
            EmploymentContractService contractService) {

        this.contractService = contractService;
    }

    @GetMapping
    @Operation(summary = "Alle Verträge laden")
    public List<EmploymentContractResponse> getAllContracts() {

        return contractService.getAllContracts();
    }

    @PostMapping
    @Operation(summary = "Vertrag erstellen")
    public ResponseEntity<?> createContract(
            @Valid
            @RequestBody
            EmploymentContractCreateRequest request) {

        return ResponseEntity.ok(
                contractService.createContract(request)
        );
    }

    @PutMapping("/{id}")
    @Operation(summary = "Vertrag bearbeiten")
    public ResponseEntity<?> updateContract(
            @PathVariable Long id,
            @Valid
            @RequestBody
            EmploymentContractUpdateRequest request) {

        return ResponseEntity.ok(
                contractService.updateContract(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Vertrag archivieren")
    public ResponseEntity<?> archiveContract(
            @PathVariable Long id) {

        contractService.archiveContract(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Vertrag archiviert."
                )
        );
    }

    @PutMapping("/{id}/restore")
    @Operation(summary = "Vertrag wiederherstellen")
    public ResponseEntity<?> restoreContract(
            @PathVariable Long id) {

        contractService.restoreContract(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Vertrag wiederhergestellt."
                )
        );
    }

    @DeleteMapping("/{id}/permanent")
    @Operation(summary = "Vertrag dauerhaft löschen")
    public ResponseEntity<?> permanentlyDeleteContract(
            @PathVariable Long id) {

        contractService.permanentlyDeleteContract(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Vertrag dauerhaft gelöscht."
                )
        );
    }
}