package com.robotron.server.mapper;

import com.robotron.server.dto.device.DeviceResponse;
import com.robotron.server.model.Device;

public class DeviceMapper {

    private DeviceMapper() {
    }

    public static DeviceResponse toResponse(
            Device device) {

        return new DeviceResponse(

                device.getId(),

                device.getProduct().getId(),

                device.getProduct().getName(),

                device.getInventoryNumber(),

                device.getSerialNumber(),

                device.getManufacturerAssetTag(),

                device.getPurchaseDate(),

                device.getPurchasePrice(),

                device.getWarrantyUntil(),

                device.getStatus(),

                device.getLocation(),

                device.getNotes(),

                device.isActive()
        );
    }

}