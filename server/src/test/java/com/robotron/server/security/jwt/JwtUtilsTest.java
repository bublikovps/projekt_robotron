package com.robotron.server.security.jwt;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.test.util.ReflectionTestUtils;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilsTest {

    private JwtUtils jwtUtils;

    @BeforeEach
    void setUp() {

        jwtUtils =
                new JwtUtils();

        ReflectionTestUtils.setField(
                jwtUtils,
                "secretKey",
                "test-secret-key"
        );

        ReflectionTestUtils.setField(
                jwtUtils,
                "tokenExpirationMs",
                86400000L
        );

    }

    @Test
    void shouldGenerateJwtToken() {

        String token =
                jwtUtils.generateToken(
                        "max.mustermann",
                        "ROLE_CUSTOMER",
                        Set.of(
                                "ORDER_READ",
                                "ORDER_CREATE"
                        )
                );

        assertNotNull(
                token
        );

        assertFalse(
                token.isBlank()
        );

    }

    @Test
    void shouldExtractLoginFromToken() {

        String token =
                jwtUtils.generateToken(
                        "max.mustermann",
                        "ROLE_CUSTOMER",
                        Set.of()
                );

        String login =
                jwtUtils.getLoginFromToken(
                        token
                );

        assertEquals(
                "max.mustermann",
                login
        );

    }

    @Test
    void shouldExtractRoleFromToken() {

        String token =
                jwtUtils.generateToken(
                        "max.mustermann",
                        "ROLE_ADMIN",
                        Set.of()
                );

        String role =
                jwtUtils.getRoleFromToken(
                        token
                );

        assertEquals(
                "ROLE_ADMIN",
                role
        );

    }

    @Test
    void shouldExtractPermissionsFromToken() {

        String token =
                jwtUtils.generateToken(
                        "max.mustermann",
                        "ROLE_MANAGER",
                        Set.of(
                                "USER_READ",
                                "USER_EDIT"
                        )
                );

        var permissions =
                jwtUtils.getPermissionsFromToken(
                        token
                );

        assertTrue(
                permissions.contains(
                        "USER_READ"
                )
        );

        assertTrue(
                permissions.contains(
                        "USER_EDIT"
                )
        );

    }

    @Test
    void shouldValidateGeneratedToken() {

        String token =
                jwtUtils.generateToken(
                        "max.mustermann",
                        "ROLE_CUSTOMER",
                        Set.of()
                );

        assertDoesNotThrow(
                () -> jwtUtils.validateToken(
                        token
                )
        );

    }

}