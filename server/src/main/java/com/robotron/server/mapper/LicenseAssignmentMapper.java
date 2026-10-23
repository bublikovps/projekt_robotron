package com.robotron.server.mapper;

import com.robotron.server.dto.licenseassignment.LicenseAssignmentResponse;
import com.robotron.server.model.LicenseAssignment;

public class LicenseAssignmentMapper {

    private LicenseAssignmentMapper() {
    }

    public static LicenseAssignmentResponse toResponse(
            LicenseAssignment entity) {

        LicenseAssignmentResponse response =
                new LicenseAssignmentResponse();

        response.setId(entity.getId());

        response.setEmployeeId(
                entity.getEmployee().getId());

        response.setEmployeeName(
                entity.getEmployee().getFirstName()
                        + " "
                        + entity.getEmployee().getLastName());

        response.setLicenseId(
                entity.getLicense().getId());

        response.setSoftwareName(
                entity.getLicense().getSoftwareName());

        response.setAssignedByLogin(
                entity.getAssignedBy().getLogin());

        response.setAssignedDate(
                entity.getAssignedDate());

        response.setExpirationDate(
                entity.getExpirationDate());

        response.setRevokedDate(
                entity.getRevokedDate());

        response.setStatus(
                entity.getStatus());

        response.setNotes(
                entity.getNotes());

        return response;
    }
}