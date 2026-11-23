package com.robotron.server.dto.order;

import java.math.BigDecimal;

public class OrderDashboardResponse {

    private long totalOrders;

    private long pendingOrders;

    private long paidOrders;

    private long shippedOrders;

    private long cancelledOrders;

    private BigDecimal totalRevenue;

    public OrderDashboardResponse() {
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(
            long totalOrders
    ) {
        this.totalOrders = totalOrders;
    }

    public long getPendingOrders() {
        return pendingOrders;
    }

    public void setPendingOrders(
            long pendingOrders
    ) {
        this.pendingOrders = pendingOrders;
    }

    public long getPaidOrders() {
        return paidOrders;
    }

    public void setPaidOrders(
            long paidOrders
    ) {
        this.paidOrders = paidOrders;
    }

    public long getShippedOrders() {
        return shippedOrders;
    }

    public void setShippedOrders(
            long shippedOrders
    ) {
        this.shippedOrders = shippedOrders;
    }

    public long getCancelledOrders() {
        return cancelledOrders;
    }

    public void setCancelledOrders(
            long cancelledOrders
    ) {
        this.cancelledOrders = cancelledOrders;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(
            BigDecimal totalRevenue
    ) {
        this.totalRevenue = totalRevenue;
    }

}
