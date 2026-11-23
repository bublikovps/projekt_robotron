package com.robotron.server.repository;

import com.robotron.server.model.DeliveryNote;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface DeliveryNoteRepository
        extends JpaRepository<DeliveryNote, Long> {

    Optional<DeliveryNote> findByDeliveryNumber(
            String deliveryNumber
    );

    Optional<DeliveryNote> findFirstByOrderId(
            Long orderId
    );

    List<DeliveryNote>
        findByOrderUserIdOrderByShippedAtDesc(
                Long userId
        );

}