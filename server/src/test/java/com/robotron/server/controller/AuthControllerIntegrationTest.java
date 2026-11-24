package com.robotron.server.controller;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.robotron.server.dto.auth.LoginRequest;
import com.robotron.server.dto.auth.RegisterRequest;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldRejectShortLogin() throws Exception {

        RegisterRequest request =
                new RegisterRequest();

        request.setLogin(
                "abc"
        );

        request.setEmail(
                "user@test.de"
        );

        request.setPassword(
                "ValidPass1!"
        );

        mockMvc.perform(

                        post(
                                "/api/auth/register"
                        )

                                .contentType(
                                        MediaType.APPLICATION_JSON
                                )

                                .content(
                                        objectMapper
                                                .writeValueAsString(
                                                        request
                                                )
                                )

                )

                .andExpect(
                        status()
                                .isBadRequest()
                );

    }

    @Test
    void shouldRejectInvalidEmail() throws Exception {

        RegisterRequest request =
                new RegisterRequest();

        request.setLogin(
                "validuser"
        );

        request.setEmail(
                "wrongEmail"
        );

        request.setPassword(
                "ValidPass1!"
        );

        mockMvc.perform(

                        post(
                                "/api/auth/register"
                        )

                                .contentType(
                                        MediaType.APPLICATION_JSON
                                )

                                .content(
                                        objectMapper
                                                .writeValueAsString(
                                                        request
                                                )
                                )

                )

                .andExpect(
                        status()
                                .isBadRequest()
                );

    }

    @Test
    void shouldRejectWeakPassword() throws Exception {

        RegisterRequest request =
                new RegisterRequest();

        request.setLogin(
                "validuser"
        );

        request.setEmail(
                "user@test.de"
        );

        request.setPassword(
                "123456"
        );

        mockMvc.perform(

                        post(
                                "/api/auth/register"
                        )

                                .contentType(
                                        MediaType.APPLICATION_JSON
                                )

                                .content(
                                        objectMapper
                                                .writeValueAsString(
                                                        request
                                                )
                                )

                )

                .andExpect(
                        status()
                                .isBadRequest()
                );

    }

    @Test
    void shouldRejectUnknownUserLogin() throws Exception {

        LoginRequest request =
                new LoginRequest();

        request.setLogin(
                "ghost"
        );

        request.setPassword(
                "Password1!"
        );

        mockMvc.perform(

                        post(
                                "/api/auth/login"
                        )

                                .contentType(
                                        MediaType.APPLICATION_JSON
                                )

                                .content(
                                        objectMapper
                                                .writeValueAsString(
                                                        request
                                                )
                                )

                )

                .andExpect(
                        status()
                                .isUnauthorized()
                );

    }

}