package com.robotron.server.repository;

import com.robotron.server.model.ReturnRequest;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReturnRepository
        extends JpaRepository<ReturnRequest, Long> {

    Optional<ReturnRequest> findByReturnNumber(
            String returnNumber
    );

    Optional<ReturnRequest> findByIdempotencyKey(
            String idempotencyKey
    );

}