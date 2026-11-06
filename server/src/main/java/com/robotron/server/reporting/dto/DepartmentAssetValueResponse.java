package com.robotron.server.reporting.dto;

import java.math.BigDecimal;

public class DepartmentAssetValueResponse {

    private Long departmentId;

    private String departmentName;

    private Long deviceCount;

    private BigDecimal totalAssetValue;

    public DepartmentAssetValueResponse(
            Long departmentId,
            String departmentName,
            Long deviceCount,
            BigDecimal totalAssetValue) {

        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.deviceCount = deviceCount;
        this.totalAssetValue = totalAssetValue;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Long getDeviceCount() {
        return deviceCount;
    }

    public void setDeviceCount(Long deviceCount) {
        this.deviceCount = deviceCount;
    }

    public BigDecimal getTotalAssetValue() {
        return totalAssetValue;
    }

    public void setTotalAssetValue(BigDecimal totalAssetValue) {
        this.totalAssetValue = totalAssetValue;
    }
}