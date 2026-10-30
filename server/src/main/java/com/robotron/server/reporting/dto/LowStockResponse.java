package com.robotron.server.reporting.dto;

public class LowStockResponse {

    private Long productId;

    private String sku;

    private String name;

    private Integer lagerbestand;

    private Integer minimumStock;

    public LowStockResponse() {
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

    public Integer getLagerbestand() {
        return lagerbestand;
    }

    public void setLagerbestand(Integer lagerbestand) {
        this.lagerbestand = lagerbestand;
    }

    public Integer getMinimumStock() {
        return minimumStock;
    }

    public void setMinimumStock(Integer minimumStock) {
        this.minimumStock = minimumStock;
    }
}