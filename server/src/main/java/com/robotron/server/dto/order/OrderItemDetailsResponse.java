package com.robotron.server.dto.order;

import java.math.BigDecimal;

public class OrderItemDetailsResponse {

    private String sku;

    private String productName;

    private int quantity;

    private BigDecimal unitPriceNet;

    private BigDecimal unitPriceGross;

    public OrderItemDetailsResponse() {
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(
            String productName
    ) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(
            int quantity
    ) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPriceNet() {
        return unitPriceNet;
    }

    public void setUnitPriceNet(
            BigDecimal unitPriceNet
    ) {
        this.unitPriceNet = unitPriceNet;
    }

    public BigDecimal getUnitPriceGross() {
        return unitPriceGross;
    }

    public void setUnitPriceGross(
            BigDecimal unitPriceGross
    ) {
        this.unitPriceGross = unitPriceGross;
    }

}