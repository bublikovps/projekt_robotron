package com.robotron.server.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO für Passwort-Reset Anfrage")
public class ForgotPasswordRequest {

    @Schema(
        description = "E-Mail-Adresse des Benutzers",
        example = "kunde@firma.de",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}