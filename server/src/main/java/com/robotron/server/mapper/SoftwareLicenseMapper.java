package com.robotron.server.mapper;

import com.robotron.server.dto.softwarelicense.SoftwareLicenseResponse;
import com.robotron.server.model.SoftwareLicense;

public class SoftwareLicenseMapper {

    private SoftwareLicenseMapper() {
    }

    public static SoftwareLicenseResponse toResponse(
            SoftwareLicense entity) {

        SoftwareLicenseResponse response =
                new SoftwareLicenseResponse();

        response.setId(entity.getId());

        response.setLicenseKey(
                entity.getLicenseKey());

        response.setSoftwareName(
                entity.getSoftwareName());

        response.setVendor(
                entity.getVendor());

        response.setLicenseType(
                entity.getLicenseType());

        response.setQuantity(
                entity.getQuantity());

        response.setUsedQuantity(
                entity.getUsedQuantity());

        response.setAvailableQuantity(
                entity.getQuantity()
                - entity.getUsedQuantity());

        response.setPurchaseDate(
                entity.getPurchaseDate());

        response.setExpirationDate(
                entity.getExpirationDate());

        response.setActive(
                entity.isActive());

        response.setNotes(
                entity.getNotes());

        return response;
    }
}