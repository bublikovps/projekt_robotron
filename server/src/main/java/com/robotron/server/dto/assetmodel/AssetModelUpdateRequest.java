package com.robotron.server.dto.assetmodel;

import java.math.BigDecimal;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(
        description = "Request for updating an asset model"
)
public class AssetModelUpdateRequest {

    
    @Schema(
            example = "LAP-DELL-5540"
    )
    private String assetCode;

    @Schema(
            example = "Dell Latitude 5540"
    )
    private String name;

    @Schema(
            example = "Dell"
    )
    private String manufacturer;

    @Schema(
            example = "LAPTOP"
    )
    private String assetCategory;

    @Schema(
            example = "Business Laptop"
    )
    private String description;

    @Schema(
            example = "1200.00"
    )
    private BigDecimal defaultPurchasePrice;

    @Schema(
            example = "48"
    )
    private Integer expectedLifetimeMonths;

    @Schema(
            example = "36"
    )
    private Integer defaultWarrantyMonths;

    @Schema(
            example = "true"
    )
    private boolean active;

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

    public void setAssetCategory(String assetCategory) {
        this.assetCategory = assetCategory;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getDefaultPurchasePrice() {
        return defaultPurchasePrice;
    }

    public void setDefaultPurchasePrice(
            BigDecimal defaultPurchasePrice) {
        this.defaultPurchasePrice = defaultPurchasePrice;
    }

    public Integer getExpectedLifetimeMonths() {
        return expectedLifetimeMonths;
    }

    public void setExpectedLifetimeMonths(
            Integer expectedLifetimeMonths) {
        this.expectedLifetimeMonths =
                expectedLifetimeMonths;
    }

    public Integer getDefaultWarrantyMonths() {
        return defaultWarrantyMonths;
    }

    public void setDefaultWarrantyMonths(
            Integer defaultWarrantyMonths) {
        this.defaultWarrantyMonths =
                defaultWarrantyMonths;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}