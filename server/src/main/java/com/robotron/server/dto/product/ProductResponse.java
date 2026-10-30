package com.robotron.server.dto.product;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ProductResponse {

    private Long id;

    private String sku;

    private String name;

    private String manufacturer;

    private String description;

    private BigDecimal price;

    private BigDecimal purchasePrice;

    private BigDecimal salePrice;

    private String supplier;

    private int lagerbestand;

    private int minimumStock;

    private boolean active;

    private Long categoryId;

    private String categoryName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public ProductResponse() {
    }

    public ProductResponse(
            Long id,
            String sku,
            String name,
            String manufacturer,
            String description,
            BigDecimal price,
            BigDecimal purchasePrice,
            BigDecimal salePrice,
            String supplier,
            int lagerbestand,
            int minimumStock,
            boolean active,
            Long categoryId,
            String categoryName,
            LocalDateTime createdAt,
            LocalDateTime updatedAt) {

        this.id = id;
        this.sku = sku;
        this.name = name;
        this.manufacturer = manufacturer;
        this.description = description;
        this.price = price;
        this.purchasePrice = purchasePrice;
        this.salePrice = salePrice;
        this.supplier = supplier;
        this.lagerbestand = lagerbestand;
        this.minimumStock = minimumStock;
        this.active = active;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(
            BigDecimal purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public BigDecimal getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(
            BigDecimal salePrice) {
        this.salePrice = salePrice;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public int getLagerbestand() {
        return lagerbestand;
    }

    public void setLagerbestand(int lagerbestand) {
        this.lagerbestand = lagerbestand;
    }

    public int getMinimumStock() {
        return minimumStock;
    }

    public void setMinimumStock(int minimumStock) {
        this.minimumStock = minimumStock;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}