package com.robotron.server.mapper;

import com.robotron.server.dto.user.UserResponse;
import com.robotron.server.model.Role;
import com.robotron.server.model.User;
import com.robotron.server.security.permissions.SecurityRoles;

public class UserMapper {

    private UserMapper() {
    }

    public static UserResponse toResponse(User user) {

        String role = user.getRoles()
                .stream()
                .findFirst()
                .map(Role::getName)
                .orElse(SecurityRoles.CUSTOMER);

        return new UserResponse(
                user.getId(),
                user.getLogin(),
                user.getEmail(),
                role,
                user.isActive(),
                user.getCreatedAt()
        );
    }
}