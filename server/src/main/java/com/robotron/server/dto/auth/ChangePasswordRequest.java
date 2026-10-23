package com.robotron.server.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO für Passwortänderung im Benutzerprofil")
public class ChangePasswordRequest {

    @Schema(
        description = "Benutzerlogin",
        example = "admin1",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    private String login;

    @Schema(
        description = "Aktuelles Passwort",
        example = "AltesPasswort123!",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    private String oldPassword;

    @Schema(
        description = "Neues Passwort",
        example = "NeuesPasswort456!",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    private String newPassword;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
