package com.robotron.server.reporting.dto;

import java.math.BigDecimal;

public class InventoryValueResponse {

    private Long productId;

    private String sku;

    private String name;

    private String manufacturer;

    private Integer lagerbestand;

    private BigDecimal purchasePrice;

    private BigDecimal inventoryValue;

    public InventoryValueResponse() {
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

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public Integer getLagerbestand() {
        return lagerbestand;
    }

    public void setLagerbestand(Integer lagerbestand) {
        this.lagerbestand = lagerbestand;
    }

    public BigDecimal getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(BigDecimal purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public BigDecimal getInventoryValue() {
        return inventoryValue;
    }

    public void setInventoryValue(BigDecimal inventoryValue) {
        this.inventoryValue = inventoryValue;
    }
}