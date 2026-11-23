package com.robotron.server.repository;

import com.robotron.server.model.Order;
import com.robotron.server.model.enums.OrderStatus;
import com.robotron.server.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository
        extends JpaRepository<Order, Long> {

    Optional<Order> findByOrderNumber(
            String orderNumber
    );

    Optional<Order> findByIdempotencyKey(
            String idempotencyKey
    );

    List<Order> findByStatus(
            OrderStatus status
    );

    List<Order> findByUser(
                User user
        );

    List<Order> findByUserOrderByCreatedAtDesc(
                User user
        );

    boolean existsByUser(
                User user
        );

}