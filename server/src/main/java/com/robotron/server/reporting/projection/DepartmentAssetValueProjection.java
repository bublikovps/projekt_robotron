package com.robotron.server.reporting.projection;

import java.math.BigDecimal;

public interface DepartmentAssetValueProjection {

    Long getDepartmentId();

    String getDepartmentName();

    Long getDeviceCount();

    BigDecimal getTotalAssetValue();
}