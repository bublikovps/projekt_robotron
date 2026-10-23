package com.robotron.server.service;

import com.robotron.server.model.Permission;
import com.robotron.server.model.Role;
import com.robotron.server.model.User;
import com.robotron.server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class SecurityService {

    private final UserRepository userRepository;

    public SecurityService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Set<String> getPermissionsForUser(String login) {

        User user = userRepository.findByLogin(login)
                .orElseThrow();

        Set<String> permissions = new HashSet<>();

        for (Role role : user.getRoles()) {

            permissions.add(role.getName());

            for (Permission permission : role.getPermissions()) {

                permissions.add(permission.getName());
            }
        }

        return permissions;
    }
}