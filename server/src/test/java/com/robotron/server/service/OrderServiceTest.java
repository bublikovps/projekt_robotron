package com.robotron.server.service;

import com.robotron.server.dto.order.OrderCreateRequest;
import com.robotron.server.dto.order.OrderItemRequest;
import com.robotron.server.dto.order.PaymentRequest;
import com.robotron.server.dto.order.ShipOrderRequest;

import com.robotron.server.exception.BusinessException;

import com.robotron.server.model.Order;
import com.robotron.server.model.OrderItem;
import com.robotron.server.model.Payment;
import com.robotron.server.model.Product;
import com.robotron.server.model.User;

import com.robotron.server.model.enums.OrderStatus;

import com.robotron.server.repository.DeliveryNoteRepository;
import com.robotron.server.repository.InvoiceRepository;
import com.robotron.server.repository.OrderRepository;
import com.robotron.server.repository.PaymentRepository;
import com.robotron.server.repository.ProductRepository;
import com.robotron.server.repository.UserRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private InvoiceRepository invoiceRepository;

    @Mock
    private DeliveryNoteRepository deliveryNoteRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private OrderService orderService;

    @Test
    void shouldRejectDuplicateOrderByIdempotencyKey() {

        OrderCreateRequest request =
                new OrderCreateRequest();

        request.setIdempotencyKey(
                "ORDER-123"
        );

        when(
                orderRepository.findByIdempotencyKey(
                        "ORDER-123"
                )
        ).thenReturn(
                Optional.of(
                        new Order()
                )
        );

        assertThrows(

                BusinessException.class,

                () -> orderService.createOrder(
                        request
                )

        );

    }

    @Test
    void shouldRejectOrderWhenStockIsInsufficient() {

        Product product =
                new Product();

        product.setId(1L);

        product.setPrice(
                BigDecimal.valueOf(100)
        );

        product.setLagerbestand(
                5
        );

        product.setReservedStock(
                4
        );

        OrderItemRequest item =
                new OrderItemRequest();

        item.setProductId(
                1L
        );

        item.setQuantity(
                2
        );

        OrderCreateRequest request =
                new OrderCreateRequest();

        request.setIdempotencyKey(
                "ORDER-456"
        );

        request.setItems(
                List.of(item)
        );

        when(
                orderRepository.findByIdempotencyKey(
                        "ORDER-456"
                )
        ).thenReturn(
                Optional.empty()
        );

        when(
                productRepository.findByIdForUpdate(
                        1L
                )
        ).thenReturn(
                Optional.of(product)
        );

        assertThrows(

                BusinessException.class,

                () -> orderService.createOrder(
                        request
                )

        );

    }

    @Test
    void shouldRejectDuplicatePayment() {

        PaymentRequest request =
                new PaymentRequest();

        request.setIdempotencyKey(
                "PAYMENT-123"
        );

        when(
                paymentRepository.findByIdempotencyKey(
                        "PAYMENT-123"
                )
        ).thenReturn(
                Optional.of(
                        new Payment()
                )
        );

        assertThrows(

                BusinessException.class,

                () -> orderService.processPayment(
                        request
                )

        );

    }

    @Test
    void shouldRejectPaymentWhenBalanceIsTooLow() {

        User customer =
                new User();

        customer.setAccountBalance(
                BigDecimal.valueOf(50)
        );

        Order order =
                new Order();

        order.setId(1L);

        order.setUser(
                customer
        );

        order.setStatus(
                OrderStatus.PENDING_PAYMENT
        );

        order.setTotalPrice(
                BigDecimal.valueOf(150)
        );

        PaymentRequest request =
                new PaymentRequest();

        request.setOrderId(
                1L
        );

        request.setIdempotencyKey(
                "PAYMENT-456"
        );

        when(
                paymentRepository.findByIdempotencyKey(
                        "PAYMENT-456"
                )
        ).thenReturn(
                Optional.empty()
        );

        when(
                orderRepository.findById(
                        1L
                )
        ).thenReturn(
                Optional.of(order)
        );

        assertThrows(

                BusinessException.class,

                () -> orderService.processPayment(
                        request
                )

        );

    }

    @Test
    void shouldRejectPaymentWhenOrderIsNotPending() {

        User customer =
                new User();

        customer.setAccountBalance(
                BigDecimal.valueOf(10000)
        );

        Order order =
                new Order();

        order.setId(1L);

        order.setUser(
                customer
        );

        order.setStatus(
                OrderStatus.PAID
        );

        order.setTotalPrice(
                BigDecimal.valueOf(100)
        );

        PaymentRequest request =
                new PaymentRequest();

        request.setOrderId(
                1L
        );

        request.setIdempotencyKey(
                "PAYMENT-789"
        );

        when(
                paymentRepository.findByIdempotencyKey(
                        "PAYMENT-789"
                )
        ).thenReturn(
                Optional.empty()
        );

        when(
                orderRepository.findById(
                        1L
                )
        ).thenReturn(
                Optional.of(order)
        );

        assertThrows(

                BusinessException.class,

                () -> orderService.processPayment(
                        request
                )

        );

    }

    @Test
    void shouldRejectShippingIfOrderNotPaid() {

        Order order =
                new Order();

        order.setId(1L);

        order.setStatus(
                OrderStatus.PENDING_PAYMENT
        );

        User employee =
                new User();

        employee.setId(10L);

        when(
                orderRepository.findById(
                        1L
                )
        ).thenReturn(
                Optional.of(order)
        );

        when(
                userRepository.findById(
                        10L
                )
        ).thenReturn(
                Optional.of(employee)
        );

        ShipOrderRequest request =
                new ShipOrderRequest();

        request.setOrderId(
                1L
        );

        request.setShippedByUserId(
                10L
        );

        request.setTrackingNumber(
                "DHL123"
        );

        assertThrows(

                BusinessException.class,

                () -> orderService.shipOrder(
                        request
                )

        );

    }

    @Test
    void shouldReleaseExpiredReservations() {

        Product product =
                new Product();

        product.setLagerbestand(
                10
        );

        product.setReservedStock(
                5
        );

        OrderItem item =
                new OrderItem();

        item.setProduct(
                product
        );

        item.setQuantity(
                2
        );

        Order order =
                new Order();

        order.setStatus(
                OrderStatus.PENDING_PAYMENT
        );

        order.setPaymentExpiresAt(
                LocalDateTime.now()
                        .minusMinutes(5)
        );

        order.setOrderItems(
                List.of(item)
        );

        when(
                orderRepository.findByStatus(
                        OrderStatus.PENDING_PAYMENT
                )
        ).thenReturn(
                List.of(order)
        );

        orderService.releaseExpiredReservations();

        org.junit.jupiter.api.Assertions
                .assertEquals(
                        3,
                        product.getReservedStock()
                );

        org.junit.jupiter.api.Assertions
                .assertEquals(
                        OrderStatus.CANCELLED,
                        order.getStatus()
                );

    }

}