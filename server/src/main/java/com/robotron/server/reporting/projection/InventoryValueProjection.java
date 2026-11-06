package com.robotron.server.reporting.projection;

import java.math.BigDecimal;

public interface InventoryValueProjection {

    Long getProductId();

    String getSku();

    String getName();

    String getManufacturer();

    Integer getLagerbestand();

    BigDecimal getPurchasePrice();

    BigDecimal getInventoryValue();
}