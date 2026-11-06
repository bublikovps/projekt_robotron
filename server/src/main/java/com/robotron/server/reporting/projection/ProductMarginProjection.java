package com.robotron.server.reporting.projection;

import java.math.BigDecimal;

public interface ProductMarginProjection {

    Long getProductId();

    String getSku();

    String getName();

    BigDecimal getPurchasePrice();

    BigDecimal getSalePrice();

    BigDecimal getMargin();
}