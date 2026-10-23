package com.robotron.server.security.config;

import com.robotron.server.security.filter.JwtAuthenticationFilter;
import com.robotron.server.security.permissions.SecurityPermissions;
import com.robotron.server.security.permissions.SecurityRoles;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configure(http))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth

                        // ==================================================
                        // PUBLIC
                        // ==================================================

                        .requestMatchers(
                                "/api/auth/**",
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui.html"
                        ).permitAll()

                        // ==================================================
                        // PUBLIC CATALOG
                        // ==================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/products/**",
                                "/api/categories/**"
                        ).permitAll()

                        // ==================================================
                        // PRODUCT MANAGEMENT
                        // ==================================================

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/products/*/restore"
                        ).hasAuthority(
                                SecurityPermissions.PRODUCT_RESTORE
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/products/*/permanent"
                        ).hasAuthority(
                                SecurityPermissions.PRODUCT_DELETE
                        )

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/products/**"
                        ).hasAuthority(
                                SecurityPermissions.PRODUCT_CREATE
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/products/**"
                        ).hasAuthority(
                                SecurityPermissions.PRODUCT_EDIT
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/products/**"
                        ).hasAuthority(
                                SecurityPermissions.PRODUCT_ARCHIVE
                        )

                        // ==================================================
                        // DEVICE MANAGEMENT
                        // ==================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/devices/**"
                        ).hasAuthority(
                                SecurityPermissions.DEVICE_READ
                        )

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/devices/**"
                        ).hasAuthority(
                                SecurityPermissions.DEVICE_CREATE
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/devices/*/restore"
                        ).hasAuthority(
                                SecurityPermissions.DEVICE_RESTORE
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/devices/*/permanent"
                        ).hasAuthority(
                                SecurityPermissions.DEVICE_DELETE
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/devices/**"
                        ).hasAuthority(
                                SecurityPermissions.DEVICE_EDIT
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/devices/**"
                        ).hasAuthority(
                                SecurityPermissions.DEVICE_ARCHIVE
                        )

                        // ==================================================
                        // USER MANAGEMENT
                        // ==================================================

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/admin/users/*/block"
                        ).hasAuthority(
                                SecurityPermissions.USER_BLOCK
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/admin/users/*/unblock"
                        ).hasAuthority(
                                SecurityPermissions.USER_UNBLOCK
                        )

                        .requestMatchers("/api/admin/**")
                        .hasAnyAuthority(
                                SecurityRoles.ADMIN,
                                SecurityRoles.DIRECTOR
                        )

                        .anyRequest().authenticated()
                );

        http.addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }
}