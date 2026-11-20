package com.robotron.server.repository;

import com.robotron.server.model.Invoice;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface InvoiceRepository
        extends JpaRepository<Invoice, Long> {

    Optional<Invoice> findByInvoiceNumber(
            String invoiceNumber
    );

    Optional<Invoice> findFirstByOrderId(
            Long orderId
    );

    List<Invoice>
        findByOrderUserIdOrderByIssuedAtDesc(
                Long userId
        );

}