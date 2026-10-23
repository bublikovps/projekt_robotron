package com.robotron.server.repository;

import com.robotron.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Изменили findByUsername на findByLogin
    Optional<User> findByLogin(String login);
    
    Optional<User> findByEmail(String email);
}
