package com.robotron.server.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

@Component
public class JwtUtils {

    // Секретный ключ для подписи токенов. В ПРОДАКШЕНЕ берется из переменных окружения!
    @Value("${jwt.secret}") private String secretKey;
    
    // Время жизни токена — 24 часа (в миллисекундах)
    @Value("${jwt.expiration}") private long tokenExpirationMs; 

    // Генерация цифрового паспорта для пользователя
    public String generateToken(String login, String role, java.util.Set<String> permissions) {
        return JWT.create()
                .withSubject(login) // Зашиваем логин
                .withClaim("role", role) // Зашиваем роль (DIRECTOR, ADMIN, MANAGER)
                .withClaim(
                    "permissions",
                    permissions.stream().toList()
                )
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + tokenExpirationMs ))
                .sign(Algorithm.HMAC256(secretKey)); // Подписываем нашим секретным ключом
    }

    // Проверка токена: если токен изменен хакером или просрочен — вылетит ошибка
    public DecodedJWT validateToken(String token) {
        return JWT.require(Algorithm.HMAC256(secretKey))
                .build()
                .verify(token);
    }

    // Вытащить логин из токена
    public String getLoginFromToken(String token) {
        return validateToken(token).getSubject();
    }

    // Вытащить роль из токена
    public String getRoleFromToken(String token) {
        return validateToken(token).getClaim("role").asString();
    }

    public java.util.List<String> getPermissionsFromToken(
        String token) {

    return validateToken(token)
            .getClaim("permissions")
            .asList(String.class);
    }
}
