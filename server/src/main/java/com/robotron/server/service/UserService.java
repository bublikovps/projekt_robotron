package com.robotron.server.service;

import com.robotron.server.repository.UserRepository;
import com.robotron.server.repository.RoleRepository;
import com.robotron.server.dto.admin.EmployeeCreateRequest;
import com.robotron.server.dto.user.UserResponse;
import com.robotron.server.exception.NotFoundException;
import com.robotron.server.exception.BusinessException;
import com.robotron.server.model.User;
import com.robotron.server.mapper.UserMapper;
import com.robotron.server.model.Role;

import java.security.SecureRandom;
import com.robotron.server.security.permissions.SecurityRoles;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    private static final String PASSWORD_ALLOW_BASE =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&";

    private static final SecureRandom random =
            new SecureRandom();

    public UserService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    

    public void createEmployee(
                EmployeeCreateRequest request) {
                        if (SecurityRoles.ADMIN.equals(request.getRole())
                || SecurityRoles.DIRECTOR.equals(request.getRole())) {

            throw new BusinessException(
                    "Sie haben keine Berechtigung, administrative Systemrollen zu erstellen!"
            );
        }

        if (userRepository.findByLogin(request.getLogin()).isPresent()) {

            throw new BusinessException(
                    "Benutzername ist bereits vergeben!"
            );
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {

            throw new BusinessException(
                    "E-Mail-Adresse wird bereits verwendet!"
            );
        }

        Role targetRole = roleRepository.findByName(
                        request.getRole()
                ).orElseThrow(() ->
                        new NotFoundException(
                                "Rolle " + request.getRole() + " nicht gefunden!"
                        )
        );

        String temporaryPassword = generateRandomPassword(12);

        User employee = new User();

            employee.setLogin(
                    request.getLogin().trim()
            );

            employee.setEmail(
                    request.getEmail()
                            .trim()
                            .toLowerCase()
            );

            employee.setPasswordHash(
                    passwordEncoder.encode(
                            temporaryPassword
                    )
            );

            employee.setRoles(
                    new java.util.HashSet<>(
                            java.util.List.of(targetRole)
                    )
            );

        employee.setPasswordChangeRequired(true);

        userRepository.save(employee);

        try {

            emailService.sendPasswordResetEmail(
                    employee.getEmail(),
                    "Willkommen im Team! Benutzername: "
                            + employee.getLogin()
                            + " | Temporäres Passwort: "
                            + temporaryPassword
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Fehler beim Versand der Zugangsdaten.",
                    e
            );
        }
    }

    public List<UserResponse> getAllUsers() {

        List<User> rawUsers = userRepository.findAll();

        List<UserResponse> mappedUsers =
                new ArrayList<>();

        for (User u : rawUsers) {

                mappedUsers.add(
                        UserMapper.toResponse(u)
                );
        }

        return mappedUsers;
    }

    public void blockUser(Long userId) {

        var userOpt = userRepository.findById(userId);

        if (userOpt.isEmpty()) {
            throw new NotFoundException(
                    "Benutzer nicht gefunden."
            );
        }

        var user = userOpt.get();

        user.setActive(false);

        userRepository.save(user);
    }

    public void unblockUser(Long userId) {

        var userOpt = userRepository.findById(userId);

        if (userOpt.isEmpty()) {
            throw new NotFoundException(
                    "Benutzer nicht gefunden."
            );
        }

        var user = userOpt.get();

        user.setActive(true);

        userRepository.save(user);
    }

    public void changeUserRole(
            Long userId,
            String newRoleName,
            boolean isDirector) {

        var userOpt = userRepository.findById(userId);

        if (userOpt.isEmpty()) {
            throw new NotFoundException(
                    "Benutzer nicht gefunden."
            );
        }

        User user = userOpt.get();

        String targetUserCurrentRole = user.getRoles()
                .stream()
                .findFirst()
                .map(r -> r.getName())
                .orElse("");

        // Защита последнего директора
        if (SecurityRoles.DIRECTOR.equals(targetUserCurrentRole)
                && !SecurityRoles.DIRECTOR.equals(newRoleName)) {

            long directorCount = userRepository.findAll()
                    .stream()
                    .filter(u -> u.getRoles()
                            .stream()
                            .anyMatch(r ->
                                    SecurityRoles.DIRECTOR.equals(r.getName())))
                    .count();

            if (directorCount <= 1) {

                throw new BusinessException(
                        "Der letzte Generaldirektor darf seine Rolle nicht verlieren!"
                );
            }
        }

        // Только директор может менять ADMIN/DIRECTOR
        if (SecurityRoles.ADMIN.equals(targetUserCurrentRole)
                || SecurityRoles.DIRECTOR.equals(targetUserCurrentRole)) {

            if (!isDirector) {

                throw new SecurityException(
                        "Nur der Generaldirektor darf Systemrollen manipulieren!"
                );
            }
        }

        var roleOpt = roleRepository.findByName(newRoleName);

        if (roleOpt.isEmpty()) {

            throw new NotFoundException(
                    "Die angeforderte Rolle existiert nicht im System!"
            );
        }

        user.setRoles(
                new java.util.HashSet<>(
                        java.util.List.of(roleOpt.get())
                )
        );

        userRepository.save(user);
    }

    public void deleteUser(
            Long userId,
            boolean isDirector) {

        var userOpt = userRepository.findById(userId);

        if (userOpt.isEmpty()) {

            throw new NotFoundException(
                    "Benutzer nicht gefunden."
            );
        }

        User user = userOpt.get();

        String targetRole = user.getRoles()
                .stream()
                .findFirst()
                .map(r -> r.getName())
                .orElse("");

        // Защита последнего директора
        if (SecurityRoles.DIRECTOR.equals(targetRole)) {

            long directorCount = userRepository.findAll()
                    .stream()
                    .filter(u -> u.getRoles()
                            .stream()
                            .anyMatch(r ->
                                    SecurityRoles.DIRECTOR.equals(r.getName())))
                    .count();

            if (directorCount <= 1) {

                throw new BusinessException(
                        "Der letzte Generaldirektor darf nicht gelöscht werden!"
                );
            }
        }

        // Только директор может удалять ADMIN/DIRECTOR
        if (
                (SecurityRoles.ADMIN.equals(targetRole)
                        || SecurityRoles.DIRECTOR.equals(targetRole))
                        && !isDirector
        ) {

            throw new SecurityException(
                    "Nur der Generaldirektor darf Systemrollen löschen."
            );
        }

        userRepository.deleteById(userId);
    }

    private String generateRandomPassword(int length) {

        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {

            int randomIndex =
                    random.nextInt(PASSWORD_ALLOW_BASE.length());

            sb.append(
                    PASSWORD_ALLOW_BASE.charAt(randomIndex)
            );
        }

        return sb.toString();
    }
}