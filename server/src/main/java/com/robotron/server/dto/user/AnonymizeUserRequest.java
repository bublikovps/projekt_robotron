package com.robotron.server.dto.user;

public class AnonymizeUserRequest {

    private Long userId;

    public AnonymizeUserRequest() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(
            Long userId
    ) {
        this.userId = userId;
    }
}