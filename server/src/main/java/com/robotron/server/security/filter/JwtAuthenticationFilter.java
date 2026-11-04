package com.robotron.server.security.filter;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.robotron.server.security.jwt.JwtUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import java.util.ArrayList;
import java.util.List;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

    public JwtAuthenticationFilter(
            JwtUtils jwtUtils
    ) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String token = null;

        String authHeader =
                request.getHeader(
                        "Authorization"
                );

        if (
                authHeader != null &&
                authHeader.startsWith(
                        "Bearer "
                )
        ) {

            token =
                    authHeader.substring(7);
        }

        if (
                token == null &&
                request.getCookies() != null
        ) {

            for (
                    Cookie cookie
                            : request.getCookies()
            ) {

                if (
                        "access_token"
                                .equals(
                                        cookie.getName()
                                )
                ) {

                    token =
                            cookie.getValue();

                    break;
                }
            }
        }

        if (token != null) {

            try {

                DecodedJWT decodedJWT =
                        jwtUtils.validateToken(
                                token
                        );

                String login =
                        decodedJWT.getSubject();

                String role =
                        decodedJWT
                                .getClaim("role")
                                .asString();

                List<String> permissions =
                        decodedJWT
                                .getClaim(
                                        "permissions"
                                )
                                .asList(
                                        String.class
                                );

                if (
                        login != null &&
                        SecurityContextHolder
                                .getContext()
                                .getAuthentication()
                                == null
                ) {

                    List<
                            SimpleGrantedAuthority
                            > authorities =
                            new ArrayList<>();

                    if (role != null) {

                        authorities.add(
                                new SimpleGrantedAuthority(
                                        role
                                )
                        );
                    }

                    if (permissions != null) {

                        for (
                                String permission
                                        : permissions
                        ) {

                            authorities.add(
                                    new SimpleGrantedAuthority(
                                            permission
                                    )
                            );
                        }
                    }

                    UsernamePasswordAuthenticationToken
                            authentication =

                            new UsernamePasswordAuthenticationToken(
                                    login,
                                    null,
                                    authorities
                            );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(
                                    authentication
                            );
                }

            } catch (Exception e) {

                SecurityContextHolder
                        .clearContext();
            }
        }

        filterChain.doFilter(
                request,
                response
        );
    }
}