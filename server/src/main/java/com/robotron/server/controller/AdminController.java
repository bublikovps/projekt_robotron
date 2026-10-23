package com.robotron.server.controller;

import com.robotron.server.dto.admin.EmployeeCreateRequest;
import com.robotron.server.dto.admin.RoleChangeRequest;
import com.robotron.server.service.UserService;
import com.robotron.server.security.permissions.SecurityRoles;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(
        name = "Admin Management",
        description = "Enterprise Benutzerverwaltung mit RBAC- und Permission-System"
)
@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    private static final Logger log =
            LoggerFactory.getLogger(AdminController.class);

    private final UserService userService;

    public AdminController(
            UserService userService) {

        this.userService = userService;
    }

    @Operation(
            summary = "Alle Benutzer laden",
            description = "Lädt die komplette Benutzerliste aus PostgreSQL."
    )
    @GetMapping
    public ResponseEntity<?> getAllUsersForAdmin() {

        log.info(
                "[ADMIN/DIRECTOR] Abfrage der Benutzerliste gestartet."
        );

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }

    @Operation(
            summary = "Mitarbeiter erstellen",
            description = "Erzeugt einen neuen Mitarbeiter mit temporärem Passwort und Mailpit-Benachrichtigung."
    )
    @PostMapping
    public ResponseEntity<?> createEmployee(
            @RequestBody EmployeeCreateRequest request) {

        log.info(
                "[ADMIN] Versuch, einen Mitarbeiter anzulegen. Login: {}, Rolle: {}",
                request.getLogin(),
                request.getRole()
        );

        userService.createEmployee(request);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Mitarbeiter erfolgreich angelegt und Zugangsdaten per E-Mail versendet."
                )
        );
    }

    @Operation(
            summary = "Benutzerrolle ändern",
            description = "Ändert die Rolle eines Benutzers gemäß der RBAC-Hierarchie."
    )
    @PutMapping("/{userId}/role")
    public ResponseEntity<?> changeUserRole(
            @PathVariable Long userId,
            @RequestBody RoleChangeRequest request) {

        String newRoleName = request.getNewRoleName();

        log.info(
                "[ADMIN/DIRECTOR] Modifizierung der Rolle fuer User-ID: {} auf {}",
                userId,
                newRoleName
        );

        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        boolean isDirector = auth.getAuthorities()
                .stream()
                .anyMatch(a ->
                        SecurityRoles.DIRECTOR.equals(a.getAuthority()));

        boolean isAdmin = auth.getAuthorities()
                .stream()
                .anyMatch(a ->
                        SecurityRoles.ADMIN.equals(a.getAuthority()));

        log.error("========== AUTH DEBUG ==========");

        auth.getAuthorities().forEach(authority ->
                log.error("AUTHORITY: {}", authority.getAuthority())
        );

        log.error("IS_DIRECTOR = {}", isDirector);
        log.error("IS_ADMIN = {}", isAdmin);

        log.error("================================");

        userService.changeUserRole(
                userId,
                newRoleName,
                isDirector
        );

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Rolle erfolgreich aktualisiert auf "
                                + newRoleName
                )
        );
    }

    @Operation(
            summary = "Benutzer sperren",
            description = "Sperrt einen Benutzer durch Setzen des Active-Flags auf FALSE."
    )
    @PutMapping("/{userId}/block")
    public ResponseEntity<?> blockUser(
            @PathVariable Long userId) {

        userService.blockUser(userId);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Benutzer wurde gesperrt."
                )
        );
    }

    @Operation(
            summary = "Benutzer entsperren",
            description = "Entsperrt einen Benutzer durch Setzen des Active-Flags auf TRUE."
    )
    @PutMapping("/{userId}/unblock")
    public ResponseEntity<?> unblockUser(
            @PathVariable Long userId) {

        userService.unblockUser(userId);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Benutzer wurde entsperrt."
                )
        );
    }

    @Operation(
            summary = "Benutzer löschen",
            description = "Löscht einen Benutzer DSGVO-konform aus dem System."
    )
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long userId) {

        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        boolean isDirector = auth.getAuthorities()
                .stream()
                .anyMatch(a ->
                        SecurityRoles.DIRECTOR.equals(a.getAuthority()));

        userService.deleteUser(
                userId,
                isDirector
        );

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Benutzer erfolgreich gelöscht."
                )
        );
    }
}