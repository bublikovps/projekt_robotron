package com.robotron.server.reporting.projection;

import java.math.BigDecimal;

public interface AssetValueProjection {

    Long getDeviceId();

    String getInventoryNumber();

    String getSerialNumber();

    String getStatus();

    BigDecimal getPurchasePrice();

    BigDecimal getCurrentValue();

    BigDecimal getDepreciationValue();
}