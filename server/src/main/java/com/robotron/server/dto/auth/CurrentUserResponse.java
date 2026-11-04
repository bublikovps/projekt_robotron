package com.robotron.server.dto.auth;

public class CurrentUserResponse {

    private Long id;

    private String login;

    private String role;

    private boolean passwordChangeRequired;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isPasswordChangeRequired() {
        return passwordChangeRequired;
    }

    public void setPasswordChangeRequired(
            boolean passwordChangeRequired
    ) {
        this.passwordChangeRequired =
                passwordChangeRequired;
    }
}