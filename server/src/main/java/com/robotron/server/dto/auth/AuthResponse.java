package com.robotron.server.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Antwort-Paket nach erfolgreicher Authentifizierung")
public class AuthResponse {

    @Schema(description = "Kryptographischer JWT-Token (Digitaler Reisepass)", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String token;

    @Schema(description = "Bestätigter Login-Name", example = "admin1")
    private String login;

    @Schema(description = "Zugewiesene Systemrolle aus der Datenbank", example = "ROLE_DIRECTOR")
    private String role;

    public AuthResponse(String token, String login, String role) {
        this.token = token;
        this.login = login;
        this.role = role;
    }

    // Getters und Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
