package com.robotron.server.dto.productimport;

import java.math.BigDecimal;

public class ProductImportRow {

    private String sku;

    private String name;

    private String manufacturer;

    private String supplier;

    private BigDecimal price;

    private BigDecimal purchasePrice;

    private BigDecimal salePrice;

    private String category;

    private int stock;

    private int minimumStock;

    private String description;

    private String imageUrl;

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

    public void setManufacturer(
            String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(
            String supplier) {
        this.supplier = supplier;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(
            BigDecimal price) {
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

    public String getCategory() {
        return category;
    }

    public void setCategory(
            String category) {
        this.category = category;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(
            int stock) {
        this.stock = stock;
    }

    public int getMinimumStock() {
        return minimumStock;
    }

    public void setMinimumStock(
            int minimumStock) {
        this.minimumStock = minimumStock;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(
            String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(
            String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
