package com.robotron.server.dto.order;

public class ShipOrderRequest {

    private Long orderId;

    private Long shippedByUserId;

    private String trackingNumber;

    public ShipOrderRequest() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(
            Long orderId
    ) {
        this.orderId = orderId;
    }

    public Long getShippedByUserId() {
        return shippedByUserId;
    }

    public void setShippedByUserId(
            Long shippedByUserId
    ) {
        this.shippedByUserId =
                shippedByUserId;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(
            String trackingNumber
    ) {
        this.trackingNumber =
                trackingNumber;
    }
}