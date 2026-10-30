package com.robotron.server.reporting.dto;

import java.math.BigDecimal;

public class AssetValueResponse {

    private Long deviceId;

    private String inventoryNumber;

    private String serialNumber;

    private String status;

    private BigDecimal purchasePrice;

    private BigDecimal currentValue;

    private BigDecimal depreciationValue;

    public AssetValueResponse() {
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
    }

    public String getInventoryNumber() {
        return inventoryNumber;
    }

    public void setInventoryNumber(String inventoryNumber) {
        this.inventoryNumber = inventoryNumber;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(BigDecimal purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public BigDecimal getCurrentValue() {
        return currentValue;
    }

    public void setCurrentValue(BigDecimal currentValue) {
        this.currentValue = currentValue;
    }

    public BigDecimal getDepreciationValue() {
        return depreciationValue;
    }

    public void setDepreciationValue(BigDecimal depreciationValue) {
        this.depreciationValue = depreciationValue;
    }
}