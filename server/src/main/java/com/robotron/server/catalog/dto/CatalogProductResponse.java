package com.robotron.server.catalog.dto;

import java.math.BigDecimal;

public class CatalogProductResponse {

    private Long id;

    private String sku;

    private String name;

    private String manufacturer;

    private String description;

    private BigDecimal price;

    private String categoryName;

    private String imageUrl;

    private int lagerbestand;

    public CatalogProductResponse() {
    }

    public CatalogProductResponse(
            Long id,
            String sku,
            String name,
            String manufacturer,
            String description,
            BigDecimal price,
            String categoryName,
            String imageUrl,
            int lagerbestand) {

        this.id = id;
        this.sku = sku;
        this.name = name;
        this.manufacturer = manufacturer;
        this.description = description;
        this.price = price;
        this.categoryName = categoryName;
        this.imageUrl = imageUrl;
        this.lagerbestand = lagerbestand;
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

    public void setManufacturer(
            String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(
            String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(
            BigDecimal price) {
        this.price = price;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(
            String categoryName) {
        this.categoryName = categoryName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(
            String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getLagerbestand() {
        return lagerbestand;
    }

    public void setLagerbestand(
            int lagerbestand) {
        this.lagerbestand = lagerbestand;
    }
}