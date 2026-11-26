package com.robotron.server.service;

import com.robotron.server.dto.admin.EmployeeCreateRequest;
import com.robotron.server.exception.BusinessException;
import com.robotron.server.model.Role;
import com.robotron.server.model.User;
import com.robotron.server.repository.OrderRepository;
import com.robotron.server.repository.RoleRepository;
import com.robotron.server.repository.UserRepository;
import com.robotron.server.security.permissions.SecurityRoles;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldNotDeleteUserWithOrders() {

        User user = new User();

        user.setId(1L);

        user.setRoles(
                new HashSet<>()
        );

        when(
                userRepository.findById(1L)
        ).thenReturn(
                Optional.of(user)
        );

        when(
                orderRepository.existsByUser(user)
        ).thenReturn(true);

        assertThrows(
                BusinessException.class,
                () -> userService.deleteUser(
                        1L,
                        true
                )
        );

    }

    @Test
    void shouldDeleteUserWithoutOrders() {

        User user = new User();

        user.setId(1L);

        user.setRoles(
                new HashSet<>()
        );

        when(
                userRepository.findById(1L)
        ).thenReturn(
                Optional.of(user)
        );

        when(
                orderRepository.existsByUser(user)
        ).thenReturn(false);

        userService.deleteUser(
                1L,
                true
        );

        verify(userRepository)
                .delete(user);

    }

    @Test
    void shouldAnonymizeUser() {

        User user =
                new User();

        user.setId(100L);

        user.setLogin(
                "max.mustermann"
        );

        user.setEmail(
                "max@test.de"
        );

        user.setCompanyName(
                "Robotron GmbH"
        );

        user.setActive(
                true
        );

        when(
                userRepository.findById(100L)
        ).thenReturn(
                Optional.of(user)
        );

        userService.anonymizeUser(
                100L
        );

        verify(userRepository)
                .save(user);

        assertFalse(
                user.isActive()
        );

        assertNotNull(
                user.getAnonymizedAt()
        );

        assertNull(
                user.getCompanyName()
        );

        assertNull(
                user.getVorname()
        );

        assertNull(
                user.getNachname()
        );

        assertNull(
                user.getDefaultShippingAddress()
        );

        assertTrue(
                user.getEmail()
                        .contains(
                                "@anonymized.local"
                        )
        );

    }

    @Test
    void shouldNotAnonymizeAlreadyAnonymizedUser() {

        User user =
                new User();

        user.setId(1L);

        user.setAnonymizedAt(
                LocalDateTime.now()
        );

        when(
                userRepository.findById(1L)
        ).thenReturn(
                Optional.of(user)
        );

        assertThrows(

                BusinessException.class,

                () -> userService.anonymizeUser(
                        1L
                )

        );

        verify(
                userRepository,
                never()
        ).save(any());

    }

    @Test
    void shouldPreventDeletingLastDirector() {

        Role directorRole =
                new Role();

        directorRole.setName(
                SecurityRoles.DIRECTOR
        );

        User director =
                new User();

        director.setId(1L);

        director.setRoles(
                Set.of(
                        directorRole
                )
        );

        when(
                userRepository.findById(
                        1L
                )
        ).thenReturn(
                Optional.of(
                        director
                )
        );

        when(
                userRepository.findAll()
        ).thenReturn(
                List.of(
                        director
                )
        );

        assertThrows(

                BusinessException.class,

                () -> userService.deleteUser(
                        1L,
                        true
                )

        );

    }

    @Test
    void shouldRejectCreatingAdminRoleEmployee() {

        EmployeeCreateRequest request =
                new EmployeeCreateRequest();

        request.setLogin(
                "admin-test"
        );

        request.setEmail(
                "admin@test.de"
        );

        request.setRole(
                SecurityRoles.ADMIN
        );

        assertThrows(

                BusinessException.class,

                () -> userService.createEmployee(
                        request
                )

        );

    }

}