package com.robotron.server.dto.order;

public class ReturnCreateRequest {

    private Long orderId;

    private String reason;

    private String idempotencyKey;

    public ReturnCreateRequest() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(
            Long orderId
    ) {
        this.orderId = orderId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(
            String reason
    ) {
        this.reason = reason;
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