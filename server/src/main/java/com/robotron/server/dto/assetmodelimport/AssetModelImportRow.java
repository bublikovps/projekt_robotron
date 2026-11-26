package com.robotron.server.dto.assetmodelimport;

import java.math.BigDecimal;

public class AssetModelImportRow {

    private String assetCode;

    private String name;

    private String manufacturer;

    private String assetCategory;

    private String description;

    private BigDecimal defaultPurchasePrice;

    private Integer expectedLifetimeMonths;

    private Integer defaultWarrantyMonths;

    public String getAssetCode() {
        return assetCode;
    }

    public void setAssetCode(
            String assetCode
    ) {
        this.assetCode = assetCode;
    }

    public String getName() {
        return name;
    }

    public void setName(
            String name
    ) {
        this.name = name;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(
            String manufacturer
    ) {
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
}