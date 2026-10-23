package com.robotron.server.mapper;

import com.robotron.server.dto.deviceassignment.DeviceAssignmentResponse;
import com.robotron.server.model.DeviceAssignment;

public class DeviceAssignmentMapper {

    private DeviceAssignmentMapper() {
    }

    public static DeviceAssignmentResponse toResponse(
            DeviceAssignment entity) {

        DeviceAssignmentResponse response =
                new DeviceAssignmentResponse();

        response.setId(entity.getId());

        response.setDeviceId(
                entity.getDevice().getId());

        response.setInventoryNumber(
                entity.getDevice().getInventoryNumber());

        response.setEmployeeId(
                entity.getEmployee().getId());

        response.setEmployeeName(
                entity.getEmployee().getFirstName()
                        + " "
                        + entity.getEmployee().getLastName());

        response.setAssignedByLogin(
                entity.getAssignedBy().getLogin());

        response.setAssignedDate(
                entity.getAssignedDate());

        response.setExpectedReturnDate(
                entity.getExpectedReturnDate());

        response.setReturnedDate(
                entity.getReturnedDate());

        response.setStatus(
                entity.getStatus());

        response.setNotes(
                entity.getNotes());

        return response;
    }
}