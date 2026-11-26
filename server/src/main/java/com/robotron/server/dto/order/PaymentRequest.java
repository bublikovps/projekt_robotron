package com.robotron.server.dto.order;

import com.robotron.server.model.enums.PaymentMethod;

public class PaymentRequest {

    private Long orderId;

    private PaymentMethod paymentMethod;

    private String idempotencyKey;

    public PaymentRequest() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(
            PaymentMethod paymentMethod
    ) {
        this.paymentMethod = paymentMethod;
    }

    public String getIdempotencyKey() {
        return idempotencyKey;
    }

    public void setIdempotencyKey(
            String idempotencyKey
    ) {
        this.idempotencyKey = idempotencyKey;
    }
}