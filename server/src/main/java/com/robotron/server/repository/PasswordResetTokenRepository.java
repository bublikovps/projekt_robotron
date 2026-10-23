package com.robotron.server.repository;

import com.robotron.server.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    // Метод поможет найти токен в базе, когда юзер пришлёт его с фронтенда
    Optional<PasswordResetToken> findByToken(String token);
}
