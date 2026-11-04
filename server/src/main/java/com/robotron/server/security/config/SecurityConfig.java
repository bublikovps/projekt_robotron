package com.robotron.server.security.config;

import com.robotron.server.security.filter.JwtAuthenticationFilter;
import com.robotron.server.security.permissions.SecurityPermissions;
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
                .cors(cors -> {})
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
                                "/api/catalog/**"
                        ).permitAll()

                        // ==================================================
                        // CATEGORIES
                        // ==================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/categories/**"
                        ).hasAuthority(
                                SecurityPermissions.CATEGORY_READ
                        )

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/categories/**"
                        ).hasAuthority(
                                SecurityPermissions.CATEGORY_CREATE
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/categories/*/restore"
                        ).hasAuthority(
                                SecurityPermissions.CATEGORY_RESTORE
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/categories/*/permanent"
                        ).hasAuthority(
                                SecurityPermissions.CATEGORY_DELETE
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/categories/**"
                        ).hasAuthority(
                                SecurityPermissions.CATEGORY_EDIT
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/categories/**"
                        ).hasAuthority(
                                SecurityPermissions.CATEGORY_ARCHIVE
                        )

                        // ==================================================
                        // PRODUCTS
                        // ==================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/products/**"
                        ).hasAuthority(
                                SecurityPermissions.PRODUCT_READ
                        )

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/products/**"
                        ).hasAuthority(
                                SecurityPermissions.PRODUCT_CREATE
                        )

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
                        // DEPARTMENTS
                        // ==================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/departments/**"
                        ).hasAuthority(
                                SecurityPermissions.DEPARTMENT_READ
                        )

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/departments/**"
                        ).hasAuthority(
                                SecurityPermissions.DEPARTMENT_CREATE
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/departments/*/restore"
                        ).hasAuthority(
                                SecurityPermissions.DEPARTMENT_RESTORE
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/departments/*/permanent"
                        ).hasAuthority(
                                SecurityPermissions.DEPARTMENT_DELETE
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/departments/**"
                        ).hasAuthority(
                                SecurityPermissions.DEPARTMENT_EDIT
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/departments/**"
                        ).hasAuthority(
                                SecurityPermissions.DEPARTMENT_ARCHIVE
                        )

                        // ==================================================
                        // EMPLOYEES
                        // ==================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/employees/**"
                        ).hasAuthority(
                                SecurityPermissions.EMPLOYEE_READ
                        )

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/employees/**"
                        ).hasAuthority(
                                SecurityPermissions.EMPLOYEE_CREATE
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/employees/*/restore"
                        ).hasAuthority(
                                SecurityPermissions.EMPLOYEE_RESTORE
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/employees/*/permanent"
                        ).hasAuthority(
                                SecurityPermissions.EMPLOYEE_DELETE
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/employees/**"
                        ).hasAuthority(
                                SecurityPermissions.EMPLOYEE_EDIT
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/employees/**"
                        ).hasAuthority(
                                SecurityPermissions.EMPLOYEE_ARCHIVE
                        )

                        // ==================================================
                        // CONTRACTS
                        // ==================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/contracts/**"
                        ).hasAuthority(
                                SecurityPermissions.CONTRACT_READ
                        )

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/contracts/**"
                        ).hasAuthority(
                                SecurityPermissions.CONTRACT_CREATE
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/contracts/*/restore"
                        ).hasAuthority(
                                SecurityPermissions.CONTRACT_RESTORE
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/contracts/*/permanent"
                        ).hasAuthority(
                                SecurityPermissions.CONTRACT_DELETE
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/contracts/**"
                        ).hasAuthority(
                                SecurityPermissions.CONTRACT_EDIT
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/contracts/**"
                        ).hasAuthority(
                                SecurityPermissions.CONTRACT_ARCHIVE
                        )

                        // ==================================================
                        // DEVICES
                        // ==================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/devices",
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
                        // SOFTWARE LICENSES
                        // ==================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/software-licenses/**"
                        ).hasAuthority(
                                SecurityPermissions.LICENSE_READ
                        )

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/software-licenses/**"
                        ).hasAuthority(
                                SecurityPermissions.LICENSE_CREATE
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/software-licenses/**"
                        ).hasAuthority(
                                SecurityPermissions.LICENSE_EDIT
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/software-licenses/**"
                        ).hasAuthority(
                                SecurityPermissions.LICENSE_ARCHIVE
                        )

                        // ==================================================
                        // DEVICE ASSIGNMENTS
                        // ==================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/device-assignments/**"
                        ).hasAuthority(
                                SecurityPermissions.ASSIGNMENT_READ
                        )

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/device-assignments/**"
                        ).hasAuthority(
                                SecurityPermissions.ASSIGNMENT_CREATE
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/device-assignments/*/return"
                        ).hasAuthority(
                                SecurityPermissions.ASSIGNMENT_RETURN
                        )

                        // ==================================================
                        // LICENSE ASSIGNMENTS
                        // ==================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/license-assignments/**"
                        ).hasAuthority(
                                SecurityPermissions.LICENSE_ASSIGNMENT_READ
                        )

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/license-assignments/**"
                        ).hasAuthority(
                                SecurityPermissions.LICENSE_ASSIGNMENT_CREATE
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/license-assignments/*/revoke"
                        ).hasAuthority(
                                SecurityPermissions.LICENSE_ASSIGNMENT_REVOKE
                        )

                        // ==================================================
                        // ADMIN USERS
                        // ==================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/admin/users/**"
                        ).hasAuthority(
                                SecurityPermissions.USER_READ
                        )

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/admin/users/**"
                        ).hasAuthority(
                                SecurityPermissions.USER_CREATE
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/admin/users/*/role"
                        ).hasAuthority(
                                SecurityPermissions.ROLE_EDIT
                        )

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

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/admin/users/**"
                        ).hasAuthority(
                                SecurityPermissions.USER_DELETE
                        )

                        .anyRequest().permitAll()
                );

        http.addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }
}