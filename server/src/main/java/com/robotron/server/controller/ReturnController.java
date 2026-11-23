package com.robotron.server.controller;

import com.robotron.server.dto.order.ReturnCreateRequest;

import com.robotron.server.model.ReturnRequest;

import com.robotron.server.service.ReturnService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Return Management",
        description = "Enterprise Return and Refund Management"
)
@RestController
@RequestMapping("/api/returns")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowCredentials = "true"
)
public class ReturnController {

    private final ReturnService returnService;

    public ReturnController(
            ReturnService returnService
    ) {

        this.returnService = returnService;

    }

    @Operation(
            summary = "Create Return"
    )
    @PostMapping
    public ResponseEntity<ReturnRequest> createReturn(
            @RequestBody ReturnCreateRequest request
    ) {

        return ResponseEntity.ok(
                returnService.createReturn(
                        request
                )
        );

    }

    @Operation(
            summary = "Approve Return"
    )
    @PutMapping("/{id}/approve")
    public ResponseEntity<ReturnRequest> approveReturn(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                returnService.approveReturn(
                        id
                )
        );

    }

    @Operation(
            summary = "Receive Return"
    )
    @PutMapping("/{id}/receive")
    public ResponseEntity<ReturnRequest> receiveReturn(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                returnService.receiveReturn(
                        id
                )
        );

    }

    @Operation(
            summary = "Refund Return"
    )
    @PutMapping("/{id}/refund")
    public ResponseEntity<ReturnRequest> refundReturn(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                returnService.refundReturn(
                        id
                )
        );

    }

}