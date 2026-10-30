package com.robotron.server.dto.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public class ProductCreateRequest {

    @NotBlank(message = "SKU darf nicht leer sein.")
    private String sku;

    @NotBlank(message = "Produktname darf nicht leer sein.")
    private String name;

    @NotBlank(message = "Hersteller darf nicht leer sein.")
    private String manufacturer;

    private String description;

    @NotNull(message = "Preis ist erforderlich.")
    @PositiveOrZero(message = "Preis darf nicht negativ sein.")
    private BigDecimal price;

    @PositiveOrZero(
        message = "Einkaufspreis darf nicht negativ sein."
    )
    private BigDecimal purchasePrice;

    @PositiveOrZero(
        message = "Verkaufspreis darf nicht negativ sein."
    )
    private BigDecimal salePrice;

    private String supplier;

    @PositiveOrZero(message = "Lagerbestand darf nicht negativ sein.")
    private int lagerbestand;

    @PositiveOrZero(message = "Mindestbestand darf nicht negativ sein.")
    private int minimumStock;

    @NotNull(message = "Kategorie ist erforderlich.")
    private Long categoryId;

    public ProductCreateRequest() {
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

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}