package com.robotron.server.service;

import com.robotron.server.dto.document.MyDeliveryNoteResponse;
import com.robotron.server.dto.document.MyInvoiceResponse;
import com.robotron.server.exception.NotFoundException;
import com.robotron.server.model.User;
import com.robotron.server.repository.DeliveryNoteRepository;
import com.robotron.server.repository.InvoiceRepository;
import com.robotron.server.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DocumentService {

    private final InvoiceRepository invoiceRepository;

    private final DeliveryNoteRepository deliveryNoteRepository;

    private final UserRepository userRepository;

    public DocumentService(
            InvoiceRepository invoiceRepository,
            DeliveryNoteRepository deliveryNoteRepository,
            UserRepository userRepository
    ) {

        this.invoiceRepository =
                invoiceRepository;

        this.deliveryNoteRepository =
                deliveryNoteRepository;

        this.userRepository =
                userRepository;

    }

    @Transactional(readOnly = true)
    public List<MyInvoiceResponse>
    getMyInvoices() {

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        User user =
                userRepository
                        .findByLogin(
                                auth.getName()
                        )
                        .orElseThrow(
                                () ->
                                        new NotFoundException(
                                                "User not found."
                                        )
                        );

        return invoiceRepository
                .findByOrderUserIdOrderByIssuedAtDesc(
                        user.getId()
                )
                .stream()
                .map(invoice -> {

                    MyInvoiceResponse dto =
                            new MyInvoiceResponse();

                    dto.setInvoiceNumber(
                            invoice.getInvoiceNumber()
                    );

                    dto.setOrderNumber(
                            invoice.getOrder()
                                    .getOrderNumber()
                    );

                    dto.setTotalGross(
                            invoice.getTotalGross()
                    );

                    dto.setCreatedAt(
                            invoice.getIssuedAt()
                    );

                    return dto;

                })
                .toList();

    }

    @Transactional(readOnly = true)
    public List<MyDeliveryNoteResponse>
    getMyDeliveryNotes() {

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        User user =
                userRepository
                        .findByLogin(
                                auth.getName()
                        )
                        .orElseThrow(
                                () ->
                                        new NotFoundException(
                                                "User not found."
                                        )
                        );

        return deliveryNoteRepository
                .findByOrderUserIdOrderByShippedAtDesc(
                        user.getId()
                )
                .stream()
                .map(note -> {

                    MyDeliveryNoteResponse dto =
                            new MyDeliveryNoteResponse();

                    dto.setDeliveryNumber(
                            note.getDeliveryNumber()
                    );

                    dto.setOrderNumber(
                            note.getOrder()
                                    .getOrderNumber()
                    );

                    dto.setTrackingNumber(
                            note.getTrackingNumber()
                    );

                    dto.setCreatedAt(
                            note.getShippedAt()
                    );

                    return dto;

                })
                .toList();

    }

}
