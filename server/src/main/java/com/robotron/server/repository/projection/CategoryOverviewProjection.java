package com.robotron.server.repository.projection;

public interface CategoryOverviewProjection {

    Long getId();

    String getName();

    boolean isActive();

    Long getProductCount();
}