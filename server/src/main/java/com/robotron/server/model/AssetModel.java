package com.robotron.server.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_model")
public class AssetModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "asset_code",
            nullable = false,
            unique = true
    )
    private String assetCode;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String manufacturer;

    @Column(
            name = "asset_category",
            nullable = false
    )
    private String assetCategory;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(
            name = "default_purchase_price",
            precision = 12,
            scale = 2
    )
    private BigDecimal defaultPurchasePrice;

    @Column(
            name = "expected_lifetime_months"
    )
    private Integer expectedLifetimeMonths;

    @Column(
            name = "default_warranty_months"
    )
    private Integer defaultWarrantyMonths;

    @Column(nullable = false)
    private boolean active = true;

    @Column(
            name = "created_at",
            nullable = false,
            updatable = false
    )
    private LocalDateTime createdAt;

    @Column(
            name = "updated_at",
            nullable = false
    )
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

    }

    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();

    }

    public AssetModel() {
    }

    public Long getId() {
        return id;
    }

    public String getAssetCode() {
        return assetCode;
    }

    public void setAssetCode(String assetCode) {
        this.assetCode = assetCode;
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

    public String getAssetCategory() {
        return assetCategory;
    }

    public void setAssetCategory(
            String assetCategory
    ) {
        this.assetCategory = assetCategory;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(
            String description
    ) {
        this.description = description;
    }

    public BigDecimal getDefaultPurchasePrice() {
        return defaultPurchasePrice;
    }

    public void setDefaultPurchasePrice(
            BigDecimal defaultPurchasePrice
    ) {
        this.defaultPurchasePrice =
                defaultPurchasePrice;
    }

    public Integer getExpectedLifetimeMonths() {
        return expectedLifetimeMonths;
    }

    public void setExpectedLifetimeMonths(
            Integer expectedLifetimeMonths
    ) {
        this.expectedLifetimeMonths =
                expectedLifetimeMonths;
    }

    public Integer getDefaultWarrantyMonths() {
        return defaultWarrantyMonths;
    }

    public void setDefaultWarrantyMonths(
            Integer defaultWarrantyMonths
    ) {
        this.defaultWarrantyMonths =
                defaultWarrantyMonths;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(
            boolean active
    ) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}