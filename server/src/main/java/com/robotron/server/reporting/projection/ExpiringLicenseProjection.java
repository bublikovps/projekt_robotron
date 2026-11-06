package com.robotron.server.reporting.projection;

import java.time.LocalDate;

public interface ExpiringLicenseProjection {

    Long getLicenseId();

    String getSoftwareName();

    String getVendor();

    LocalDate getExpirationDate();

    String getStatus();
}