package com.robotron.server.dto.document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class MyInvoiceResponse {

    private String invoiceNumber;

    private String orderNumber;

    private BigDecimal totalGross;

    private LocalDateTime createdAt;

    public MyInvoiceResponse() {
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(
            String invoiceNumber
    ) {
        this.invoiceNumber = invoiceNumber;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(
            String orderNumber
    ) {
        this.orderNumber = orderNumber;
    }

    public BigDecimal getTotalGross() {
        return totalGross;
    }

    public void setTotalGross(
            BigDecimal totalGross
    ) {
        this.totalGross = totalGross;
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