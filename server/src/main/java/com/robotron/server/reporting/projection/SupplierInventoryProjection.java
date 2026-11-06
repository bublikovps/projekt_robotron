package com.robotron.server.reporting.projection;

import java.math.BigDecimal;

public interface SupplierInventoryProjection {

    String getSupplier();

    Long getProductCount();

    Long getTotalUnits();

    BigDecimal getInventoryValue();
}