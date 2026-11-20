package com.robotron.server.repository;

import com.robotron.server.model.Payment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository
        extends JpaRepository<Payment, Long> {

    Optional<Payment> findByIdempotencyKey(
            String idempotencyKey
    );

}