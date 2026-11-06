package com.robotron.server.reporting.projection;

public interface LowStockProjection {

    Long getProductId();

    String getSku();

    String getName();

    Integer getLagerbestand();

    Integer getMinimumStock();
}