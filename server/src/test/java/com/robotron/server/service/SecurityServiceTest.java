package com.robotron.server.service;

import com.robotron.server.model.Permission;
import com.robotron.server.model.Role;
import com.robotron.server.model.User;
import com.robotron.server.repository.UserRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SecurityServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private SecurityService securityService;

    @Test
    void shouldReturnRoleAsPermission() {

        Permission permission =
                new Permission();

        permission.setName(
                "USER_READ"
        );

        Role role =
                new Role();

        role.setName(
                "ROLE_ADMIN"
        );

        role.setPermissions(
                Set.of(permission)
        );

        User user =
                new User();

        user.setLogin(
                "admin"
        );

        user.setRoles(
                Set.of(role)
        );

        when(
                userRepository.findByLogin(
                        "admin"
                )
        ).thenReturn(
                Optional.of(user)
        );

        var permissions =
                securityService.getPermissionsForUser(
                        "admin"
                );

        assertTrue(
                permissions.contains(
                        "ROLE_ADMIN"
                )
        );

        assertTrue(
                permissions.contains(
                        "USER_READ"
                )
        );

    }

    @Test
    void shouldReturnAllPermissionsForUser() {

        Permission p1 =
                new Permission();

        p1.setName(
                "USER_READ"
        );

        Permission p2 =
                new Permission();

        p2.setName(
                "USER_EDIT"
        );

        Role role =
                new Role();

        role.setName(
                "ROLE_MANAGER"
        );

        role.setPermissions(
                Set.of(
                        p1,
                        p2
                )
        );

        User user =
                new User();

        user.setLogin(
                "manager"
        );

        user.setRoles(
                Set.of(role)
        );

        when(
                userRepository.findByLogin(
                        "manager"
                )
        ).thenReturn(
                Optional.of(user)
        );

        var permissions =
                securityService.getPermissionsForUser(
                        "manager"
                );

        assertEquals(
                3,
                permissions.size()
        );

    }

    @Test
    void shouldThrowExceptionForUnknownUser() {

        when(
                userRepository.findByLogin(
                        "unknown"
                )
        ).thenReturn(
                Optional.empty()
        );

        assertThrows(

                RuntimeException.class,

                () ->
                        securityService
                                .getPermissionsForUser(
                                        "unknown"
                                )

        );

    }

}