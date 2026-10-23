package com.robotron.server.security.filter;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.robotron.server.security.jwt.JwtUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

    public JwtAuthenticationFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        
        // 1. Извлекаем заголовок Authorization из HTTP-запроса
        String authHeader = request.getHeader("Authorization");

        // По стандартам, токен должен начинаться со слова "Bearer "
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7); // Отрезаем "Bearer " и получаем чистый токен
            
            try {
                // 2. Валидируем токен через нашу утилиту
                DecodedJWT decodedJWT = jwtUtils.validateToken(token);
                String login = decodedJWT.getSubject();
                String role = decodedJWT.getClaim("role").asString();

                List<String> permissions =
                        decodedJWT.getClaim("permissions")
                                .asList(String.class);

                if (login != null &&
                    SecurityContextHolder.getContext()
                            .getAuthentication() == null) {

                    List<SimpleGrantedAuthority> authorities =
                            new ArrayList<>();

                    if (role != null) {
                        authorities.add(new SimpleGrantedAuthority(role));
                    }

                    if (permissions != null) {
                        for (String permission : permissions) {
                            authorities.add(new SimpleGrantedAuthority(permission));
                        }
                    }

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    login,
                                    null,
                                    authorities
                            );

                    SecurityContextHolder.getContext()
                            .setAuthentication(authentication);
                }
            } catch (Exception e) {
                // Если токен поддельный или просрочен — обнуляем контекст, Spring Security вернет 403/401
                SecurityContextHolder.clearContext();
            }
        }

        // Передаем запрос дальше по цепочке фильтров
        filterChain.doFilter(request, response);
    }
}
