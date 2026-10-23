package com.robotron.server.controller;

import com.robotron.server.dto.device.DeviceCreateRequest;
import com.robotron.server.dto.device.DeviceResponse;
import com.robotron.server.dto.device.DeviceUpdateRequest;
import com.robotron.server.service.DeviceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/devices")
@CrossOrigin(origins = "http://localhost:4200")
@Tag(
        name = "Device Management",
        description = "Verwaltung von Geräten"
)
public class DeviceController {

    private final DeviceService deviceService;

    public DeviceController(
            DeviceService deviceService) {

        this.deviceService = deviceService;
    }

    @GetMapping
    @Operation(summary = "Alle Geräte laden")
    public List<DeviceResponse> getAllDevices() {

        return deviceService.getAllDevices();
    }

    @PostMapping
    @Operation(summary = "Gerät erstellen")
    public ResponseEntity<?> createDevice(
            @Valid
            @RequestBody
            DeviceCreateRequest request) {

        return ResponseEntity.ok(
                deviceService.createDevice(request)
        );
    }

    @PutMapping("/{id}")
    @Operation(summary = "Gerät bearbeiten")
    public ResponseEntity<?> updateDevice(
            @PathVariable Long id,
            @Valid
            @RequestBody
            DeviceUpdateRequest request) {

        return ResponseEntity.ok(
                deviceService.updateDevice(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Gerät archivieren")
    public ResponseEntity<?> archiveDevice(
            @PathVariable Long id) {

        deviceService.archiveDevice(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Gerät archiviert."
                )
        );
    }

    @PutMapping("/{id}/restore")
    @Operation(summary = "Gerät wiederherstellen")
    public ResponseEntity<?> restoreDevice(
            @PathVariable Long id) {

        deviceService.restoreDevice(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Gerät wiederhergestellt."
                )
        );
    }

    @DeleteMapping("/{id}/permanent")
    @Operation(summary = "Gerät dauerhaft löschen")
    public ResponseEntity<?> permanentlyDeleteDevice(
            @PathVariable Long id) {

        deviceService.permanentlyDeleteDevice(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Gerät dauerhaft gelöscht."
                )
        );
    }
}