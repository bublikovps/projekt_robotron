package com.robotron.server.service;

import com.robotron.server.dto.order.*;

import com.robotron.server.exception.BusinessException;
import com.robotron.server.exception.NotFoundException;

import com.robotron.server.model.*;
import com.robotron.server.model.enums.*;

import com.robotron.server.repository.*;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.math.BigDecimal;

import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    private final ProductRepository productRepository;

    private final PaymentRepository paymentRepository;

    private final InvoiceRepository invoiceRepository;

    private final DeliveryNoteRepository deliveryNoteRepository;

    private final UserRepository userRepository;

    public OrderService(
            OrderRepository orderRepository,
            ProductRepository productRepository,
            PaymentRepository paymentRepository,
            InvoiceRepository invoiceRepository,
            DeliveryNoteRepository deliveryNoteRepository,
            UserRepository userRepository
    ) {

        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.paymentRepository = paymentRepository;
        this.invoiceRepository = invoiceRepository;
        this.deliveryNoteRepository = deliveryNoteRepository;
        this.userRepository = userRepository;

    }

    @Transactional
public OrderResponse createOrder(
        OrderCreateRequest request
) {

    if (
            orderRepository
                    .findByIdempotencyKey(
                            request.getIdempotencyKey()
                    )
                    .isPresent()
    ) {

        throw new BusinessException(
                "Order already exists."
        );

    }

    Order order = new Order();

    Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (
                auth != null
                &&
                auth.isAuthenticated()
                &&
                !"anonymousUser".equals(
                        auth.getName()
                )
        ) {

        userRepository
                .findByLogin(
                        auth.getName()
                )
                .ifPresent(
                        order::setUser
                );

        }

    order.setOrderNumber(
            generateOrderNumber()
    );

    order.setStatus(
            OrderStatus.PENDING_PAYMENT
    );

    order.setIdempotencyKey(
            request.getIdempotencyKey()
    );

    order.setCustomerType(
            request.getCustomerType()
    );

    order.setVorname(
            request.getVorname()
    );

    order.setNachname(
            request.getNachname()
    );

    order.setCompanyName(
            request.getCompanyName()
    );

    order.setUstIdnr(
            request.getUstIdnr()
    );

    order.setShippingAddress(
            request.getShippingAddress()
    );

    order.setPaymentExpiresAt(
            LocalDateTime.now()
                    .plusMinutes(30)
    );

    BigDecimal totalPrice =
            BigDecimal.ZERO;

    List<OrderItem> orderItems =
            new ArrayList<>();

    for (
            OrderItemRequest itemRequest
                    : request.getItems()
    ) {

        Product product =
                productRepository
                        .findByIdForUpdate(
                                itemRequest.getProductId()
                        )
                        .orElseThrow(
                                () ->
                                        new NotFoundException(
                                                "Product not found."
                                        )
                        );

        if (
                product.getAvailableStock()
                        < itemRequest.getQuantity()
        ) {

            throw new BusinessException(
                    "Insufficient stock."
            );

        }

        product.setReservedStock(
                product.getReservedStock()
                        + itemRequest.getQuantity()
        );

        productRepository.save(
                product
        );

        BigDecimal priceToUse =
                product.getSalePrice() != null
                        ? product.getSalePrice()
                        : product.getPrice();

        BigDecimal grossUnitPrice =
                priceToUse;

        BigDecimal netUnitPrice =
                grossUnitPrice.divide(
                        BigDecimal.valueOf(1.19),
                        2,
                        java.math.RoundingMode.HALF_UP
                );

        BigDecimal lineGrossTotal =
                grossUnitPrice.multiply(
                        BigDecimal.valueOf(
                                itemRequest.getQuantity()
                        )
                );

        totalPrice =
                totalPrice.add(
                        lineGrossTotal
                );

        OrderItem orderItem =
                new OrderItem();

        orderItem.setOrder(
                order
        );

        orderItem.setProduct(
                product
        );

        orderItem.setQuantity(
                itemRequest.getQuantity()
        );

        orderItem.setProductSkuSnapshot(
                product.getSku()
        );

        orderItem.setProductNameSnapshot(
                product.getName()
        );

        orderItem.setUnitPriceNet(
                netUnitPrice
        );

        orderItem.setVatRate(
                BigDecimal.valueOf(19)
        );

        orderItem.setUnitPriceGross(
                grossUnitPrice
        );

        orderItems.add(
                orderItem
        );

    }

    order.setTotalPrice(
            totalPrice
    );

    order.setOrderItems(
            orderItems
    );

    Order savedOrder =
            orderRepository.save(
                    order
            );

    OrderResponse response =
            new OrderResponse();

    response.setId(
            savedOrder.getId()
    );

    response.setOrderNumber(
            savedOrder.getOrderNumber()
    );

    response.setStatus(
            savedOrder.getStatus()
    );

    response.setTotalPrice(
            savedOrder.getTotalPrice()
    );

    response.setCreatedAt(
            savedOrder.getCreatedAt()
    );

    return response;

}
    @Transactional
    public PaymentResponse processPayment(
            PaymentRequest request
    ) {

        if (
                paymentRepository
                        .findByIdempotencyKey(
                                request.getIdempotencyKey()
                        )
                        .isPresent()
        ) {

            throw new BusinessException(
                    "Payment already processed."
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

        User customer =
                order.getUser();

        if (
                customer == null
        ) {

        throw new BusinessException(
                "Order has no customer assigned."
        );

        }

        if (
                order.getStatus()
                        != OrderStatus.PENDING_PAYMENT
        ) {

            throw new BusinessException(
                    "Order is not awaiting payment."
            );

        }

        if (
                customer
                        .getAccountBalance()
                        .compareTo(
                                order.getTotalPrice()
                        ) < 0
        ) {

        throw new BusinessException(
                "Insufficient account balance."
        );

        }

        Payment payment =
                new Payment();

        payment.setOrder(
                order
        );

        payment.setPaymentType(
                PaymentType.CHARGE
        );

        payment.setPaymentMethod(
                request.getPaymentMethod()
        );

        payment.setAmount(
                order.getTotalPrice()
        );

        payment.setStatus(
                PaymentStatus.SUCCEEDED
        );

        payment.setIdempotencyKey(
                request.getIdempotencyKey()
        );

        payment.setExternalTransactionId(
                UUID.randomUUID()
                        .toString()
        );

        payment =
                paymentRepository.save(
                        payment
                );

        Invoice invoice =
                new Invoice();

        invoice.setOrder(
                order
        );

        invoice.setInvoiceNumber(
                generateInvoiceNumber()
        );

        invoice.setInvoiceType(
                InvoiceType.INVOICE
        );

        BigDecimal gross =
        order.getTotalPrice();

        BigDecimal net =
                gross.divide(
                        BigDecimal.valueOf(1.19),
                        2,
                        java.math.RoundingMode.HALF_UP
                );

        BigDecimal vat =
                gross.subtract(net);

        invoice.setTotalNet(
                net
        );

        invoice.setTotalVat(
                vat
        );

        invoice.setTotalGross(
                gross
        );

        invoiceRepository.save(
                invoice
        );

        customer.setAccountBalance(
                customer
                        .getAccountBalance()
                        .subtract(
                                order.getTotalPrice()
                        )
        );

        userRepository.save(
                customer
        );

        order.setStatus(
                OrderStatus.PAID
        );

        orderRepository.save(
                order
        );

        PaymentResponse response =
                new PaymentResponse();

        response.setPaymentId(
                payment.getId()
        );

        response.setTransactionId(
                payment.getExternalTransactionId()
        );

        response.setStatus(
                payment.getStatus()
        );

        return response;

    }

    @Transactional
    public ShipOrderResponse shipOrder(
            ShipOrderRequest request
    ) {

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

        User shippedBy =
                userRepository
                        .findById(
                                request.getShippedByUserId()
                        )
                        .orElseThrow(
                                () ->
                                        new NotFoundException(
                                                "User not found."
                                        )
                        );

        if (
                order.getStatus()
                        != OrderStatus.PAID
        ) {

            throw new BusinessException(
                    "Order must be paid before shipping."
            );

        }

        for (
                OrderItem item :
                        order.getOrderItems()
        ) {

            Product product =
                    item.getProduct();

            product.setLagerbestand(
                    product.getLagerbestand()
                            - item.getQuantity()
            );

            product.setReservedStock(
                    product.getReservedStock()
                            - item.getQuantity()
            );

            productRepository.save(
                    product
            );

        }

        DeliveryNote deliveryNote =
                new DeliveryNote();

        deliveryNote.setOrder(
                order
        );

        deliveryNote.setShippedByUser(
                shippedBy
        );

        deliveryNote.setDeliveryNumber(
                generateDeliveryNumber()
        );

        deliveryNote.setTrackingNumber(
                request.getTrackingNumber()
        );

        deliveryNote =
                deliveryNoteRepository.save(
                        deliveryNote
                );

        order.setStatus(
                OrderStatus.SHIPPED
        );

        orderRepository.save(
                order
        );

        ShipOrderResponse response =
                new ShipOrderResponse();

        response.setDeliveryNumber(
                deliveryNote.getDeliveryNumber()
        );

        response.setTrackingNumber(
                deliveryNote.getTrackingNumber()
        );

        return response;

    }

    @Scheduled(fixedRate = 300000)
    @Transactional
    public void releaseExpiredReservations() {

        List<Order> pendingOrders =
                orderRepository.findByStatus(
                        OrderStatus.PENDING_PAYMENT
                );

        for (
                Order order :
                        pendingOrders
        ) {

            if (
                    order.getPaymentExpiresAt() == null
            ) {
                continue;
            }

            if (
                    order.getPaymentExpiresAt()
                            .isAfter(
                                    LocalDateTime.now()
                            )
            ) {
                continue;
            }

            for (
                    OrderItem item :
                            order.getOrderItems()
            ) {

                Product product =
                        item.getProduct();

                product.setReservedStock(
                        product.getReservedStock()
                                - item.getQuantity()
                );

                productRepository.save(
                        product
                );

            }

            order.setStatus(
                    OrderStatus.CANCELLED
            );

            orderRepository.save(
                    order
            );

        }

    }

    @Transactional(readOnly = true)
public List<OrderListResponse> getOrders() {

    return orderRepository
            .findAll()
            .stream()
            .map(order -> {

                OrderListResponse response =
                        new OrderListResponse();

                response.setId(
                        order.getId()
                );

                response.setOrderNumber(
                        order.getOrderNumber()
                );

                response.setCustomerName(
                        order.getVorname()
                                + " "
                                + order.getNachname()
                );

                response.setCompanyName(
                        order.getCompanyName()
                );

                response.setStatus(
                        order.getStatus()
                );

                response.setTotalPrice(
                        order.getTotalPrice()
                );

                response.setCreatedAt(
                        order.getCreatedAt()
                );

                invoiceRepository
                        .findFirstByOrderId(
                                order.getId()
                        )
                        .ifPresent(invoice ->
                                response.setInvoiceNumber(
                                        invoice.getInvoiceNumber()
                                )
                        );

                deliveryNoteRepository
                        .findFirstByOrderId(
                                order.getId()
                        )
                        .ifPresent(deliveryNote -> {

                            response.setDeliveryNumber(
                                    deliveryNote.getDeliveryNumber()
                            );

                            response.setTrackingNumber(
                                    deliveryNote.getTrackingNumber()
                            );

                        });

                return response;

            })
            .toList();

}

       @Transactional(readOnly = true)
public OrderDetailsResponse getOrderDetails(
        String orderNumber
) {

    Order order =
            orderRepository
                    .findByOrderNumber(
                            orderNumber
                    )
                    .orElseThrow(
                            () ->
                                    new NotFoundException(
                                            "Order not found."
                                    )
                    );

    OrderDetailsResponse response =
            new OrderDetailsResponse();

    response.setId(
            order.getId()
    );

    response.setOrderNumber(
            order.getOrderNumber()
    );

    response.setStatus(
            order.getStatus()
    );

    response.setCustomerName(
            order.getVorname()
                    + " "
                    + order.getNachname()
    );

    response.setCompanyName(
            order.getCompanyName()
    );

    response.setUstIdnr(
            order.getUstIdnr()
    );

    response.setShippingAddress(
            order.getShippingAddress()
    );

    response.setTotalPrice(
            order.getTotalPrice()
    );

    response.setCreatedAt(
            order.getCreatedAt()
    );

    invoiceRepository
            .findFirstByOrderId(
                    order.getId()
            )
            .ifPresent(invoice ->
                    response.setInvoiceNumber(
                            invoice.getInvoiceNumber()
                    )
            );

    deliveryNoteRepository
            .findFirstByOrderId(
                    order.getId()
            )
            .ifPresent(deliveryNote -> {

                response.setDeliveryNumber(
                        deliveryNote.getDeliveryNumber()
                );

                response.setTrackingNumber(
                        deliveryNote.getTrackingNumber()
                );

            });

    List<OrderItemDetailsResponse> items =
            order.getOrderItems()
                    .stream()
                    .map(item -> {

                        OrderItemDetailsResponse dto =
                                new OrderItemDetailsResponse();

                        dto.setSku(
                                item.getProductSkuSnapshot()
                        );

                        dto.setProductName(
                                item.getProductNameSnapshot()
                        );

                        dto.setQuantity(
                                item.getQuantity()
                        );

                        dto.setUnitPriceNet(
                                item.getUnitPriceNet()
                        );

                        dto.setUnitPriceGross(
                                item.getUnitPriceGross()
                        );

                        return dto;

                    })
                    .toList();

    response.setItems(
            items
    );

    return response;

} 

@Transactional(readOnly = true)
public List<OrderListResponse> getMyOrders() {

    Authentication auth =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication();

    String login =
            auth.getName();

    User user =
            userRepository
                    .findByLogin(login)
                    .orElseThrow(
                            () ->
                                    new NotFoundException(
                                            "User not found."
                                    )
                    );

    return orderRepository
            .findByUserOrderByCreatedAtDesc(
                    user
            )
            .stream()
            .map(order -> {

                OrderListResponse response =
                        new OrderListResponse();

                response.setId(
                        order.getId()
                );

                response.setOrderNumber(
                        order.getOrderNumber()
                );

                response.setCustomerName(
                        order.getVorname()
                        + " "
                        + order.getNachname()
                );

                response.setCompanyName(
                        order.getCompanyName()
                );

                response.setStatus(
                        order.getStatus()
                );

                response.setTotalPrice(
                        order.getTotalPrice()
                );

                response.setCreatedAt(
                        order.getCreatedAt()
                );

                return response;

            })
            .toList();

}


@Transactional(readOnly = true)
public OrderDashboardResponse getDashboard() {

    List<Order> orders =
            orderRepository.findAll();

    OrderDashboardResponse response =
            new OrderDashboardResponse();

    response.setTotalOrders(
            orders.size()
    );

    response.setPendingOrders(
            orders.stream()
                    .filter(order ->
                            order.getStatus()
                                    == OrderStatus.PENDING_PAYMENT
                    )
                    .count()
    );

    response.setPaidOrders(
            orders.stream()
                    .filter(order ->
                            order.getStatus()
                                    == OrderStatus.PAID
                    )
                    .count()
    );

    response.setShippedOrders(
            orders.stream()
                    .filter(order ->
                            order.getStatus()
                                    == OrderStatus.SHIPPED
                    )
                    .count()
    );

    response.setCancelledOrders(
            orders.stream()
                    .filter(order ->
                            order.getStatus()
                                    == OrderStatus.CANCELLED
                    )
                    .count()
    );

    response.setTotalRevenue(
            orders.stream()
                    .filter(order ->
                            order.getStatus()
                                    != OrderStatus.CANCELLED
                    )
                    .map(Order::getTotalPrice)
                    .reduce(
                            BigDecimal.ZERO,
                            BigDecimal::add
                    )
    );

    return response;

}

    private String generateOrderNumber() {

        return "ORD-"
                + LocalDateTime.now().getYear()
                + "-"
                + UUID.randomUUID()
                .toString()
                .substring(0, 8)
                .toUpperCase();

    }

    private String generateInvoiceNumber() {

        return "RE-"
                + LocalDateTime.now().getYear()
                + "-"
                + UUID.randomUUID()
                .toString()
                .substring(0, 8)
                .toUpperCase();

    }

    private String generateDeliveryNumber() {

        return "LS-"
                + LocalDateTime.now().getYear()
                + "-"
                + UUID.randomUUID()
                .toString()
                .substring(0, 8)
                .toUpperCase();

    }

}