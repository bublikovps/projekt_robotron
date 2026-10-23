package com.robotron.server.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO für endgültigen Passwort-Reset")
public class ResetPasswordRequest {

    @Schema(
        description = "Einmaliger Reset-Token",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    private String token;

    @Schema(
        description = "Neues Passwort",
        example = "NeuesPasswort123!",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    private String newPassword;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}