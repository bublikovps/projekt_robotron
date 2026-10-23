package com.robotron.server.dto.device;

import com.robotron.server.model.enums.DeviceStatus;

import java.math.BigDecimal;
import java.time.LocalDate;

public class DeviceResponse {

    private Long id;

    private Long productId;

    private String productName;

    private String inventoryNumber;

    private String serialNumber;

    private String manufacturerAssetTag;

    private LocalDate purchaseDate;

    private BigDecimal purchasePrice;

    private LocalDate warrantyUntil;

    private DeviceStatus status;

    private String location;

    private String notes;

    private boolean active;

    public DeviceResponse(
            Long id,
            Long productId,
            String productName,
            String inventoryNumber,
            String serialNumber,
            String manufacturerAssetTag,
            LocalDate purchaseDate,
            BigDecimal purchasePrice,
            LocalDate warrantyUntil,
            DeviceStatus status,
            String location,
            String notes,
            boolean active) {

        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.inventoryNumber = inventoryNumber;
        this.serialNumber = serialNumber;
        this.manufacturerAssetTag = manufacturerAssetTag;
        this.purchaseDate = purchaseDate;
        this.purchasePrice = purchasePrice;
        this.warrantyUntil = warrantyUntil;
        this.status = status;
        this.location = location;
        this.notes = notes;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public Long getProductId() {
        return productId;
    }

    public String getProductName() {
        return productName;
    }

    public String getInventoryNumber() {
        return inventoryNumber;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public String getManufacturerAssetTag() {
        return manufacturerAssetTag;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public BigDecimal getPurchasePrice() {
        return purchasePrice;
    }

    public LocalDate getWarrantyUntil() {
        return warrantyUntil;
    }

    public DeviceStatus getStatus() {
        return status;
    }

    public String getLocation() {
        return location;
    }

    public String getNotes() {
        return notes;
    }

    public boolean isActive() {
        return active;
    }
}