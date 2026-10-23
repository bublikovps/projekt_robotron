package com.robotron.server.dto.admin;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(
    description = "DTO für Rollenänderung eines bestehenden Benutzers"
)
public class RoleChangeRequest {

    @Schema(
        description = """
            Neue Benutzerrolle.

            Unterstützte Rollen:
            ROLE_CUSTOMER  - Standardkunde
            ROLE_MANAGER   - Lagerverwaltung
            ROLE_ADMIN     - Benutzerverwaltung
            ROLE_DIRECTOR  - Vollzugriff auf das System
            """,
        example = "ROLE_MANAGER",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    private String newRoleName;

    public RoleChangeRequest() {
    }

    public String getNewRoleName() {
        return newRoleName;
    }

    public void setNewRoleName(String newRoleName) {
        this.newRoleName = newRoleName;
    }
}