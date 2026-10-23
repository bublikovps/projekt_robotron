package com.robotron.server.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO für die B2B-Benutzerregistrierung")
public class RegisterRequest {

    @Schema(description = "Gewünschter Login-Name", example = "director2026", requiredMode = Schema.RequiredMode.REQUIRED)
    private String login;

    @Schema(description = "Offizielle E-Mail-Adresse", example = "director@robotron.de", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;

    @Schema(description = "Sicheres Passwort", example = "SecurePass123!", requiredMode = Schema.RequiredMode.REQUIRED)
    private String password;

    public RegisterRequest() {}

    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
