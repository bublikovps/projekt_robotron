package com.robotron.server.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "DTO für den Benutzer-Login")
public class LoginRequest {

    // В OpenAPI обязательность задается через Schema.RequiredMode
    @Schema(description = "Eindeutiger Benutzername (Login)", example = "admin1", requiredMode = Schema.RequiredMode.REQUIRED)
    private String login;

    @Schema(description = "Das Benutzerpasswort", example = "123456", requiredMode = Schema.RequiredMode.REQUIRED)
    private String password;

    public LoginRequest() {}

    public LoginRequest(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
