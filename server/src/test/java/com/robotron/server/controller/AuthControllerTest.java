package com.robotron.server.controller;

import com.robotron.server.dto.auth.LoginRequest;
import com.robotron.server.dto.auth.RegisterRequest;
import com.robotron.server.model.Role;
import com.robotron.server.model.User;
import com.robotron.server.repository.PasswordResetTokenRepository;
import com.robotron.server.repository.RoleRepository;
import com.robotron.server.repository.UserRepository;
import com.robotron.server.security.jwt.JwtUtils;
import com.robotron.server.security.permissions.SecurityRoles;
import com.robotron.server.service.EmailService;
import com.robotron.server.service.SecurityService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private PasswordResetTokenRepository tokenRepository;

    @Mock
    private EmailService emailService;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private SecurityService securityService;

    @InjectMocks
    private AuthController authController;

    private Role customerRole;

    @BeforeEach
    void setUp() {

        customerRole =
                new Role();

        customerRole.setName(
                SecurityRoles.CUSTOMER
        );

    }

    @Test
    void shouldRejectShortLogin() {

        RegisterRequest request =
                new RegisterRequest();

        request.setLogin(
                "abc"
        );

        request.setEmail(
                "user@test.de"
        );

        request.setPassword(
                "ValidPass1!"
        );

        ResponseEntity<?> response =
                authController.registerUser(
                        request
                );

        assertEquals(
                400,
                response.getStatusCode().value()
        );

    }

    @Test
    void shouldRejectInvalidLoginCharacters() {

        RegisterRequest request =
                new RegisterRequest();

        request.setLogin(
                "user@@@"
        );

        request.setEmail(
                "user@test.de"
        );

        request.setPassword(
                "ValidPass1!"
        );

        ResponseEntity<?> response =
                authController.registerUser(
                        request
                );

        assertEquals(
                400,
                response.getStatusCode().value()
        );

    }

    @Test
    void shouldRejectInvalidEmail() {

        RegisterRequest request =
                new RegisterRequest();

        request.setLogin(
                "validuser"
        );

        request.setEmail(
                "wrongEmail"
        );

        request.setPassword(
                "ValidPass1!"
        );

        ResponseEntity<?> response =
                authController.registerUser(
                        request
                );

        assertEquals(
                400,
                response.getStatusCode().value()
        );

    }

    @Test
    void shouldRejectWeakPassword() {

        RegisterRequest request =
                new RegisterRequest();

        request.setLogin(
                "validuser"
        );

        request.setEmail(
                "user@test.de"
        );

        request.setPassword(
                "123456"
        );

        ResponseEntity<?> response =
                authController.registerUser(
                        request
                );

        assertEquals(
                400,
                response.getStatusCode().value()
        );

    }

    @Test
    void shouldRejectDuplicateLogin() {

        RegisterRequest request =
                new RegisterRequest();

        request.setLogin(
                "existingUser"
        );

        request.setEmail(
                "user@test.de"
        );

        request.setPassword(
                "ValidPass1!"
        );

        User existing =
                new User();

        existing.setLogin(
                "existingUser"
        );

        when(
                userRepository.findByLogin(
                        "existingUser"
                )
        ).thenReturn(
                Optional.of(existing)
        );

        ResponseEntity<?> response =
                authController.registerUser(
                        request
                );

        assertEquals(
                400,
                response.getStatusCode().value()
        );

    }

    @Test
    void shouldRejectDuplicateEmail() {

        RegisterRequest request =
                new RegisterRequest();

        request.setLogin(
                "newUser"
        );

        request.setEmail(
                "existing@test.de"
        );

        request.setPassword(
                "ValidPass1!"
        );

        User existing =
                new User();

        existing.setEmail(
                "existing@test.de"
        );

        when(
                userRepository.findByLogin(
                        "newUser"
                )
        ).thenReturn(
                Optional.empty()
        );

        when(
                userRepository.findByEmail(
                        "existing@test.de"
                )
        ).thenReturn(
                Optional.of(existing)
        );

        ResponseEntity<?> response =
                authController.registerUser(
                        request
                );

        assertEquals(
                400,
                response.getStatusCode().value()
        );

    }

    @Test
    void shouldRegisterCustomerSuccessfully() {

        RegisterRequest request =
                new RegisterRequest();

        request.setLogin(
                "newUser"
        );

        request.setEmail(
                "new@test.de"
        );

        request.setPassword(
                "ValidPass1!"
        );

        when(
                userRepository.findByLogin(
                        "newUser"
                )
        ).thenReturn(
                Optional.empty()
        );

        when(
                userRepository.findByEmail(
                        "new@test.de"
                )
        ).thenReturn(
                Optional.empty()
        );

        when(
                roleRepository.findByName(
                        SecurityRoles.CUSTOMER
                )
        ).thenReturn(
                Optional.of(customerRole)
        );

        when(
                passwordEncoder.encode(
                        anyString()
                )
        ).thenReturn(
                "HASH"
        );

        when(
                userRepository.save(
                        any(User.class)
                )
        ).thenAnswer(
                invocation -> {

                    User user =
                            invocation.getArgument(
                                    0
                            );

                    user.setId(
                            1L
                    );

                    return user;
                }
        );

        ResponseEntity<?> response =
                authController.registerUser(
                        request
                );

        assertEquals(
                200,
                response.getStatusCode().value()
        );

    }

    @Test
    void shouldRejectUnknownUserLogin() {

        LoginRequest request =
                new LoginRequest(
                        "ghost",
                        "password"
                );

        when(
                userRepository.findByLogin(
                        "ghost"
                )
        ).thenReturn(
                Optional.empty()
        );

        ResponseEntity<?> response =
                authController.loginUser(
                        request
                );

        assertEquals(
                401,
                response.getStatusCode().value()
        );

    }

    @Test
    void shouldRejectBlockedUserLogin() {

        User blocked =
                new User();

        blocked.setLogin(
                "blocked"
        );

        blocked.setPasswordHash(
                "HASH"
        );

        blocked.setActive(
                false
        );

        LoginRequest request =
                new LoginRequest(
                        "blocked",
                        "Password1!"
                );

        when(
                userRepository.findByLogin(
                        "blocked"
                )
        ).thenReturn(
                Optional.of(
                        blocked
                )
        );

        when(
                passwordEncoder.matches(
                        anyString(),
                        anyString()
                )
        ).thenReturn(
                true
        );

        ResponseEntity<?> response =
                authController.loginUser(
                        request
                );

        assertEquals(
                403,
                response.getStatusCode().value()
        );

    }

    @Test
    void shouldLoginSuccessfully() {

        Role role =
                new Role();

        role.setName(
                SecurityRoles.CUSTOMER
        );

        User user =
                new User();

        user.setLogin(
                "customer"
        );

        user.setPasswordHash(
                "HASH"
        );

        user.setActive(
                true
        );

        user.setRoles(
                Set.of(role)
        );

        LoginRequest request =
                new LoginRequest(
                        "customer",
                        "Password1!"
                );

        when(
                userRepository.findByLogin(
                        "customer"
                )
        ).thenReturn(
                Optional.of(user)
        );

        when(
                passwordEncoder.matches(
                        anyString(),
                        anyString()
                )
        ).thenReturn(
                true
        );

        when(
                securityService.getPermissionsForUser(
                        "customer"
                )
        ).thenReturn(
                Set.of(
                        "ORDER_READ"
                )
        );

        when(
                jwtUtils.generateToken(
                        anyString(),
                        anyString(),
                        anySet()
                )
        ).thenReturn(
                "JWT_TOKEN"
        );

        ResponseEntity<?> response =
                authController.loginUser(
                        request
                );

        assertEquals(
                200,
                response.getStatusCode().value()
        );

    }

}