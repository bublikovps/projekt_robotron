package com.robotron.server.controller;

import com.robotron.server.dto.order.OrderCreateRequest;
import com.robotron.server.dto.order.OrderListResponse;
import com.robotron.server.dto.order.OrderResponse;
import com.robotron.server.dto.order.PaymentRequest;
import com.robotron.server.dto.order.PaymentResponse;
import com.robotron.server.dto.order.ShipOrderRequest;
import com.robotron.server.dto.order.ShipOrderResponse;

import com.robotron.server.dto.order.OrderDetailsResponse;

import com.robotron.server.service.OrderService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.robotron.server.dto.order.OrderDashboardResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name = "Sales Management",
        description = "Enterprise Order-to-Cash Management"
)
@RestController
@RequestMapping("/api/orders")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowCredentials = "true"
)
public class OrderController {

    private final OrderService orderService;

    public OrderController(
            OrderService orderService
    ) {

        this.orderService = orderService;

    }

    @Operation(
                summary = "Order Dashboard",
                description = "Returns order KPI overview."
        )
        @GetMapping("/dashboard")
        public ResponseEntity<OrderDashboardResponse>
        getDashboard() {

        return ResponseEntity.ok(
                orderService.getDashboard()
        );

        }

    @Operation(
            summary = "Get Orders",
            description = "Returns all orders."
    )
    @GetMapping
    public ResponseEntity<List<OrderListResponse>>
    getOrders() {

        return ResponseEntity.ok(
                orderService.getOrders()
        );

    }

    @Operation(
                summary = "Get Order Details",
                description = "Returns complete order information."
        )
        @GetMapping("/{orderNumber}")
        public ResponseEntity<OrderDetailsResponse>
        getOrderDetails(
                @PathVariable
                String orderNumber
        ) {

        return ResponseEntity.ok(
                orderService.getOrderDetails(
                        orderNumber
                )
        );

        }

    @Operation(
            summary = "Create Order",
            description = "Creates a new customer order and reserves stock."
    )
    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @RequestBody OrderCreateRequest request
    ) {

        return ResponseEntity.ok(
                orderService.createOrder(
                        request
                )
        );

    }

    @Operation(
            summary = "Process Payment",
            description = "Processes payment and creates invoice."
    )
    @PostMapping("/payment")
    public ResponseEntity<PaymentResponse> processPayment(
            @RequestBody PaymentRequest request
    ) {

        return ResponseEntity.ok(
                orderService.processPayment(
                        request
                )
        );

    }

    @Operation(
            summary = "Ship Order",
            description = "Creates delivery note and books goods issue."
    )
    @PostMapping("/ship")
    public ResponseEntity<ShipOrderResponse> shipOrder(
            @RequestBody ShipOrderRequest request
    ) {

        return ResponseEntity.ok(
                orderService.shipOrder(
                        request
                )
        );

    }

    @Operation(
                summary = "My Orders",
                description = "Returns orders of the authenticated customer."
        )
        @GetMapping("/my")
        public ResponseEntity<List<OrderListResponse>>
        getMyOrders() {

        return ResponseEntity.ok(
                orderService.getMyOrders()
        );

        }

}