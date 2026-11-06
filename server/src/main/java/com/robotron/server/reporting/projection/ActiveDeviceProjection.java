package com.robotron.server.reporting.projection;

public interface ActiveDeviceProjection {

    Long getDeviceId();

    String getInventoryNumber();

    String getSerialNumber();

    String getStatus();

    String getLocation();
}
