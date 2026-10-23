package com.robotron.server.controller;

import com.robotron.server.model.User;
import com.robotron.server.model.Role;
import com.robotron.server.model.PasswordResetToken;
import com.robotron.server.repository.UserRepository;
import com.robotron.server.security.jwt.JwtUtils;
import com.robotron.server.repository.RoleRepository;
import com.robotron.server.repository.PasswordResetTokenRepository;
import com.robotron.server.service.EmailService;
import com.robotron.server.security.permissions.SecurityRoles;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

import com.robotron.server.dto.auth.LoginRequest;
import com.robotron.server.dto.auth.RegisterRequest;
import com.robotron.server.dto.auth.ChangePasswordRequest;
import com.robotron.server.dto.auth.ForgotPasswordRequest;
import com.robotron.server.dto.auth.ResetPasswordRequest;
import com.robotron.server.service.SecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.Map;
import java.util.UUID;

@Tag(
    name = "Authentication",
    description = "Login, Registrierung, Profilverwaltung und Passwortfunktionen"
)
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository tokenRepository;
    private final EmailService emailService;
    private final JwtUtils jwtUtils;
    private final SecurityService securityService;

    public AuthController(UserRepository userRepository, 
                          RoleRepository roleRepository, 
                          PasswordEncoder passwordEncoder,
                          PasswordResetTokenRepository tokenRepository,
                          EmailService emailService,
                          JwtUtils jwtUtils,
                          SecurityService securityService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
        this.emailService = emailService;
        this.jwtUtils = jwtUtils;
        this.securityService = securityService;
    }

    // 1. БЕЗОПАСНАЯ B2B-РЕГИСТРАЦИЯ С ДВУХСТУПЕНЧАТОЙ ВАЛИДАЦИЕЙ
    @Operation(
        summary = "Neuen Benutzer registrieren",
        description = "Registriert einen neuen Benutzer mit ROLE_CUSTOMER."
    )
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        
        // --- ВАЛИДАЦИЯ: ЛОГИН ---
        if (request.getLogin() == null || request.getLogin().trim().length() < 4) {
            log.warn("Registrierung abgelehnt: Login zu kurz oder leer.");
            return ResponseEntity.badRequest().body(Map.of("error", "Der Benutzername (Login) muss mindestens 4 Zeichen lang sein!"));
        }
        if (!request.getLogin().matches("^[a-zA-Z0-9]+$")) {
            log.warn("Registrierung abgelehnt: Ungültige Zeichen im Login {}", request.getLogin());
            return ResponseEntity.badRequest().body(Map.of("error", "Der Benutzername darf nur из букв и цифр состоять (без пробелов и спецсимволов)!"));
        }

        // --- ВАЛИДАЦИЯ: EMAIL (RFC-5322) ---
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
        if (request.getEmail() == null || !request.getEmail().matches(emailRegex)) {
            log.warn("Registrierung abgelehnt: Ungültiges E-Mail-Format: {}", request.getEmail());
            return ResponseEntity.badRequest().body(Map.of("error", "Bitte geben Sie eine gültige E-Mail-Adresse ein!"));
        }

        // --- ВАЛИДАЦИЯ: СЛОЖНОСТЬ ПАРОЛЯ ---
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        if (request.getPassword() == null || !request.getPassword().matches(passwordRegex)) {
            log.warn("Registrierung fehlgeschlagen: Passwortrichtlinien nicht erfüllt für {}", request.getLogin());
            return ResponseEntity.badRequest().body(Map.of("error", "Das Passwort muss mindestens 8 Zeichen lang sein, einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten!"));
        }

        // --- ПРОВЕРКА УНИКАЛЬНОСТИ В СУБД ---
        if (userRepository.findByLogin(request.getLogin()).isPresent()) {
            log.warn("Registrierung fehlgeschlagen: Login {} ist bereits vergeben", request.getLogin());
            return ResponseEntity.badRequest().body(Map.of("error", "Benutzername (Login) ist bereits vergeben!"));
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            log.warn("Registrierung fehlgeschlagen: Email {} wird bereits verwendet", request.getEmail());
            return ResponseEntity.badRequest().body(Map.of("error", "E-Mail-Adresse wird bereits verwendet!"));
        }

        // --- НОРМАЛИЗАЦИЯ И СОХРАНЕНИЕ ---
        User user = new User();
        user.setLogin(request.getLogin().trim());
        user.setEmail(request.getEmail().trim().toLowerCase()); // В базу сохраняем строго строчными!
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        Role customerRole = roleRepository.findByName(SecurityRoles.CUSTOMER)
                .orElseThrow(() -> new RuntimeException("Fehler: Standardrolle ROLE_CUSTOMER nicht in der Datenbank gefunden!"));
        user.setRoles(new java.util.HashSet<>(java.util.List.of(customerRole)));

        User savedUser = userRepository.save(user);
        log.info("Benutzer erfolgreich registriert mit ID: {}", savedUser.getId());

        return ResponseEntity.ok(Map.of("message", "Registrierung erfolgreich!"));
    }

    // 2. СТРОГО ТИПИЗИРОВАННЫЙ ВХОД (СОВМЕСТИМОСТЬ С SWAGGER UI)
    // 2. ВХОД В СИСТЕМУ С УЧЕТОМ ФЛАГА ПЕРВОГО ВХОДА
    @Operation(
        summary = "Benutzer anmelden",
        description = "Authentifiziert den Benutzer und liefert einen JWT-Token zurück."
    )
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        log.info("Login-Versuch fuer Benutzer: {}", request.getLogin());

        User user = userRepository.findByLogin(request.getLogin())
                .orElse(null);

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            log.warn("Login fehlgeschlagen: Ungueltige Anmeldedaten fuer {}", request.getLogin());
            return ResponseEntity.status(401).body(Map.of("error", "Ungueltiger Login oder Passwort!"));
        }

        if (!user.isActive()) {
            log.warn(
                "Login abgelehnt: Benutzer {} ist gesperrt.",
                user.getLogin()
            );

            return ResponseEntity.status(403)
                    .body(
                        Map.of(
                            "error",
                            "Ihr Benutzerkonto wurde gesperrt. Bitte wenden Sie sich an den Administrator."
                        )
                    );
        }

        String roleName = user.getRoles().stream()
                .findFirst()
                .map(Role::getName)
                .orElse(SecurityRoles.CUSTOMER);
                
        java.util.Set<String> permissions = securityService.getPermissionsForUser(user.getLogin());
        String token = jwtUtils.generateToken(user.getLogin(), roleName, permissions);
        log.info("Benutzer {} успешно вошел. Сгенерирован JWT для роли: {}", request.getLogin(), roleName);
        
        // Передаем флаг passwordChangeRequired на фронтенд, чтобы Angular заставил сменить пароль!
        return ResponseEntity.ok(Map.of(
            "token", token,
            "login", user.getLogin(),
            "role", roleName,
            "passwordChangeRequired", user.isPasswordChangeRequired() // ОБЯЗАТЕЛЬНО ОТПРАВЛЯЕМ ФЛАГ!
        ));
    }

    // 3. ПОЛУЧЕНИЕ ПРОФИЛЯ
    @Operation(
        summary = "Eigenes Profil laden",
        description = "Lädt das Profil des aktuell angemeldeten Benutzers anhand des JWT-Tokens."
    )
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String login = auth.getName();

        var userOpt = userRepository.findByLogin(login);

        if (userOpt.isEmpty()) {
            log.warn("Profilabfrage fehlgeschlagen: Benutzer {} nicht gefunden", login);

            return ResponseEntity.status(404).body(
                    Map.of("error", "Benutzer nicht gefunden!")
            );
        }

        User user = userOpt.get();

        user.setPasswordHash(null);

        return ResponseEntity.ok(user);
    }

    // 4. СМЕНА ПАРОЛЯ ВНУТРИ ЛИЧНОГО КАБИНЕТА + ФОРСИРОВАННАЯ ТРАНЗАКЦИЯ ДЛЯ СУБД
    @Operation(
        summary = "Passwort ändern",
        description = "Ändert das Passwort des aktuell bekannten Benutzers nach Prüfung des alten Passworts."
    )
    @PutMapping("/change-password")
    @org.springframework.transaction.annotation.Transactional // ➕ КРИТИЧЕСКИЙ ФИКС: Гарантирует запись флага в PostgreSQL!
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        String login = request.getLogin();
        String oldPassword = request.getOldPassword();
        String newPassword = request.getNewPassword();

        log.info("Passwortaenderung angefordert fuer Benutzer: {}", login);

        User user = userRepository.findByLogin(login)
                .orElse(null);

        if (user == null || !passwordEncoder.matches(oldPassword, user.getPasswordHash())) {
            log.warn("Passwortaenderung fehlgeschlagen: Altes Passwort inkorrekt fuer {}", login);
            return ResponseEntity.badRequest().body(Map.of("error", "Das alte Passwort ist ungueltig!"));
        }

        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        if (newPassword == null || !newPassword.matches(passwordRegex)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Das neue Passwort erfuellt nicht die Sicherheitsanforderungen!"));
        }

        // 🛠️ Обновляем данные внутри активной транзакции
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        user.setPasswordChangeRequired(false); // Принудительно сбрасываем флаг в false
        
        // Форсируем сохранение в СУБД
        userRepository.saveAndFlush(user); 
        
        User checkUser = userRepository.findByLogin(login).orElse(null);

        log.info(
            "DEBUG: passwordChangeRequired nach SaveAndFlush = {}",
            checkUser.isPasswordChangeRequired()
        );

        System.out.println(
            "DEBUG passwordChangeRequired = "
            + checkUser.isPasswordChangeRequired()
        );

        log.info("Passwort erfolgreich geaendert fuer Benutzer: {}. Флаг password_change_required сброшен в FALSE.", login);

        try {
            emailService.sendPasswordResetEmail(user.getEmail(), 
                "Sicherheitsbenachrichtigung: Das Passwort für Ihr B2B-Portal-Konto (" + user.getLogin() + ") wurde erfolgreich geändert.");
            log.info("[MAILPIT] Уведомление о безопасности отправлено на {}", user.getEmail());
        } catch (Exception e) {
            log.error("[MAIL ERROR] Не удалось отправить извещение: ", e);
        }

        return ResponseEntity.ok(Map.of("message", "Passwort erfolgreich geaendert!"));
    }

    
    // 5. ЗАПРОС ССЫЛКИ СБРОСА ПАРОЛЯ (ВСТРОЕННАЯ ЗАЩИТА ОТ ENUMERATION ATTACK)
    @Operation(
        summary = "Passwort vergessen",
        description = "Erzeugt einen einmaligen Passwort-Reset-Link und versendet ihn per E-Mail."
    )
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        String email = request.getEmail();
        log.info("Passwort-Reset angefordert fuer Email: {}", email);

        var userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            // Защита IHK: имитируем успех, чтобы хакер не узнал, какие email есть в БД
            log.warn("Passwort-Reset abgelehnt: Email {} nicht gefunden", email);
            return ResponseEntity.ok(Map.of("message", "Wenn die E-Mail-Adresse existiert, wurde eine Nachricht gesendet."));
        }

        User user = userOpt.get();
        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken(token, user, 15);
        tokenRepository.save(resetToken);

        String resetLink = "http://localhost:4200/reset-password?token=" + token;
        emailService.sendPasswordResetEmail(user.getEmail(), resetLink);

        return ResponseEntity.ok(Map.of("message", "Wenn die E-Mail-Adresse existiert, wurde eine Nachricht gesendet."));
    }

    // 6. ФИНАЛЬНЫЙ СБРОС ПАРОЛЯ ПО ОДНОРАЗОВОМУ ТОКЕНУ С ВАЛИДАЦИЕЙ СРОКА
    @Operation(
        summary = "Passwort zurücksetzen",
        description = "Setzt das Passwort mit einem gültigen Reset-Token zurück."
    )
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        String token = request.getToken();
        String newPassword = request.getNewPassword();

        log.info("Verarbeitung des Passwort-Resets mit Token: {}", token);
        var tokenOpt = tokenRepository.findByToken(token);
        if (tokenOpt.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of("error", "Ungueltiger oder abgelaufener Token!"));
        }
        PasswordResetToken resetToken = tokenOpt.get();
        if (resetToken.isExpired()) {
        tokenRepository.delete(resetToken);
        return ResponseEntity.badRequest().body(Map.of("error", "Der Token ist abgelaufen! Bitte fordern Sie einen neuen Link an."));
        }
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";

        if (newPassword == null || !newPassword.matches(passwordRegex)) {
        return ResponseEntity.badRequest().body(Map.of("error", "Das neue Passwort erfuellt nicht die Sicherheitsanforderungen!"));
        }
        User user = resetToken.getUser();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        user.setPasswordChangeRequired(false);
        userRepository.save(user);
        tokenRepository.delete(resetToken); // Удаляем токен после успешного использования
        log.info("Passwort erfolgreich zurueckgesetzt fuer User-ID: {}", user.getId());
        return ResponseEntity.ok(Map.of("message", "Passwort erfolgreich zurueckgesetzt!"));
    }
}

