package com.robotron.server.dto.order;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class InvoiceResponse {

    private String invoiceNumber;

    private BigDecimal totalGross;

    private LocalDateTime issuedAt;

    public InvoiceResponse() {
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(
            String invoiceNumber
    ) {
        this.invoiceNumber = invoiceNumber;
    }

    public BigDecimal getTotalGross() {
        return totalGross;
    }

    public void setTotalGross(
            BigDecimal totalGross
    ) {
        this.totalGross = totalGross;
    }

    public LocalDateTime getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(
            LocalDateTime issuedAt
    ) {
        this.issuedAt = issuedAt;
    }
}