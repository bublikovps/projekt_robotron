package com.robotron.server.reporting.dto;

import java.math.BigDecimal;

public class ProductMarginResponse {

    private Long productId;

    private String sku;

    private String name;

    private BigDecimal purchasePrice;

    private BigDecimal salePrice;

    private BigDecimal margin;

    public ProductMarginResponse(
            Long productId,
            String sku,
            String name,
            BigDecimal purchasePrice,
            BigDecimal salePrice,
            BigDecimal margin) {

        this.productId = productId;
        this.sku = sku;
        this.name = name;
        this.purchasePrice = purchasePrice;
        this.salePrice = salePrice;
        this.margin = margin;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(BigDecimal purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public BigDecimal getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(BigDecimal salePrice) {
        this.salePrice = salePrice;
    }

    public BigDecimal getMargin() {
        return margin;
    }

    public void setMargin(BigDecimal margin) {
        this.margin = margin;
    }
}