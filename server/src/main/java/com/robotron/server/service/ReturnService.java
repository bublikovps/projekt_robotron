package com.robotron.server.service;

import com.robotron.server.dto.order.ReturnCreateRequest;

import com.robotron.server.exception.BusinessException;
import com.robotron.server.exception.NotFoundException;

import com.robotron.server.model.Invoice;
import com.robotron.server.model.Order;
import com.robotron.server.model.OrderItem;
import com.robotron.server.model.Payment;
import com.robotron.server.model.Product;
import com.robotron.server.model.ReturnItem;
import com.robotron.server.model.ReturnRequest;

import com.robotron.server.model.enums.InvoiceType;
import com.robotron.server.model.enums.PaymentStatus;
import com.robotron.server.model.enums.PaymentType;
import com.robotron.server.model.enums.ReturnStatus;

import com.robotron.server.repository.InvoiceRepository;
import com.robotron.server.repository.OrderRepository;
import com.robotron.server.repository.PaymentRepository;
import com.robotron.server.repository.ProductRepository;
import com.robotron.server.repository.ReturnRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

import java.time.LocalDateTime;

import java.util.UUID;

@Service
public class ReturnService {

    private final ReturnRepository returnRepository;

    private final OrderRepository orderRepository;

    private final ProductRepository productRepository;

    private final InvoiceRepository invoiceRepository;

    private final PaymentRepository paymentRepository;

    public ReturnService(
            ReturnRepository returnRepository,
            OrderRepository orderRepository,
            ProductRepository productRepository,
            InvoiceRepository invoiceRepository,
            PaymentRepository paymentRepository
    ) {

        this.returnRepository = returnRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.invoiceRepository = invoiceRepository;
        this.paymentRepository = paymentRepository;

    }

    @Transactional
    public ReturnRequest createReturn(
            ReturnCreateRequest request
    ) {

        if (
                returnRepository
                        .findByIdempotencyKey(
                                request.getIdempotencyKey()
                        )
                        .isPresent()
        ) {

            throw new BusinessException(
                    "Return already exists."
            );

        }

        Order order =
                orderRepository
                        .findById(
                                request.getOrderId()
                        )
                        .orElseThrow(
                                () ->
                                        new NotFoundException(
                                                "Order not found."
                                        )
                        );

        ReturnRequest returnRequest =
                new ReturnRequest();

        returnRequest.setOrder(
                order
        );

        returnRequest.setReturnNumber(
                generateReturnNumber()
        );

        returnRequest.setIdempotencyKey(
                request.getIdempotencyKey()
        );

        returnRequest.setReason(
                request.getReason()
        );

        returnRequest.setStatus(
                ReturnStatus.REQUESTED
        );

        return returnRepository.save(
                returnRequest
        );
    }

    @Transactional
    public ReturnRequest approveReturn(
            Long returnId
    ) {

        ReturnRequest returnRequest =
                returnRepository
                        .findById(returnId)
                        .orElseThrow(
                                () ->
                                        new NotFoundException(
                                                "Return not found."
                                        )
                        );

        returnRequest.setStatus(
                ReturnStatus.APPROVED
        );

        return returnRepository.save(
                returnRequest
        );

    }

    @Transactional
    public ReturnRequest receiveReturn(
            Long returnId
    ) {

        ReturnRequest returnRequest =
                returnRepository
                        .findById(returnId)
                        .orElseThrow(
                                () ->
                                        new NotFoundException(
                                                "Return not found."
                                        )
                        );

        for (
                ReturnItem item :
                        returnRequest.getReturnItems()
        ) {

            if (!item.isRestockable()) {
                continue;
            }

            OrderItem orderItem =
                    item.getOrderItem();

            Product product =
                    orderItem.getProduct();

            product.setLagerbestand(
                    product.getLagerbestand()
                            + item.getQuantity()
            );

            productRepository.save(
                    product
            );

        }

        returnRequest.setStatus(
                ReturnStatus.RECEIVED
        );

        return returnRepository.save(
                returnRequest
        );
    }

    @Transactional
    public ReturnRequest refundReturn(
            Long returnId
    ) {

        ReturnRequest returnRequest =
                returnRepository
                        .findById(returnId)
                        .orElseThrow(
                                () ->
                                        new NotFoundException(
                                                "Return not found."
                                        )
                        );

        Order order =
                returnRequest.getOrder();

        Payment refundPayment =
                new Payment();

        refundPayment.setOrder(
                order
        );

        refundPayment.setPaymentType(
                PaymentType.REFUND
        );

        refundPayment.setAmount(
                order.getTotalPrice()
        );

        refundPayment.setStatus(
                PaymentStatus.SUCCEEDED
        );

        refundPayment.setIdempotencyKey(
                UUID.randomUUID().toString()
        );

        refundPayment.setExternalTransactionId(
                UUID.randomUUID().toString()
        );

        paymentRepository.save(
                refundPayment
        );

        Invoice creditNote =
                new Invoice();

        creditNote.setOrder(
                order
        );

        creditNote.setInvoiceNumber(
                "GS-"
                        + LocalDateTime.now().getYear()
                        + "-"
                        + UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase()
        );

        creditNote.setInvoiceType(
                InvoiceType.CREDIT_NOTE
        );

        creditNote.setTotalNet(
                order.getTotalPrice()
        );

        creditNote.setTotalVat(
                BigDecimal.ZERO
        );

        creditNote.setTotalGross(
                order.getTotalPrice()
        );

        invoiceRepository.save(
                creditNote
        );

        returnRequest.setStatus(
                ReturnStatus.REFUNDED
        );

        return returnRepository.save(
                returnRequest
        );

    }

    private String generateReturnNumber() {

        return "RT-"
                + LocalDateTime.now().getYear()
                + "-"
                + UUID.randomUUID()
                .toString()
                .substring(0, 8)
                .toUpperCase();

    }

}