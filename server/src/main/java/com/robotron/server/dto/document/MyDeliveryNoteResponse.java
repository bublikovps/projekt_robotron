package com.robotron.server.dto.document;

import java.time.LocalDateTime;

public class MyDeliveryNoteResponse {

    private String deliveryNumber;

    private String orderNumber;

    private String trackingNumber;

    private LocalDateTime createdAt;

    public MyDeliveryNoteResponse() {
    }

    public String getDeliveryNumber() {
        return deliveryNumber;
    }

    public void setDeliveryNumber(
            String deliveryNumber
    ) {
        this.deliveryNumber = deliveryNumber;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(
            String orderNumber
    ) {
        this.orderNumber = orderNumber;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(
            String trackingNumber
    ) {
        this.trackingNumber = trackingNumber;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
            LocalDateTime createdAt
    ) {
        this.createdAt = createdAt;
    }

}