package com.robotron.server.dto.admin;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO für die Registrierung eines neuen Mitarbeiters durch den Administrator")
public class EmployeeCreateRequest {

    @Schema(description = "Gewünschter Login-Name des Mitarbeiters", example = "tech_manager", requiredMode = Schema.RequiredMode.REQUIRED)
    private String login;

    @Schema(description = "Offizielle Firmen-E-Mail-Adresse des Mitarbeiters", example = "manager@it-portal.de", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;

    @Schema(description = "Zuzuweisende Systemrolle (z.B. ROLE_MANAGER, ROLE_CUSTOMER)", example = "ROLE_MANAGER", requiredMode = Schema.RequiredMode.REQUIRED)
    private String role;

    public EmployeeCreateRequest() {}

    public EmployeeCreateRequest(String login, String email, String role) {
        this.login = login;
        this.email = email;
        this.role = role;
    }

    // Getters und Setters
    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
