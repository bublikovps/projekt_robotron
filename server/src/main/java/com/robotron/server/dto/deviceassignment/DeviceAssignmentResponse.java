package com.robotron.server.dto.deviceassignment;

import com.robotron.server.model.enums.DeviceAssignmentStatus;

import java.time.LocalDate;

public class DeviceAssignmentResponse {

    private Long id;

    private Long deviceId;
    private String inventoryNumber;

    private Long employeeId;
    private String employeeName;

    private Long assignedByUserId;
    private String assignedByLogin;

    private LocalDate assignedDate;
    private LocalDate expectedReturnDate;
    private LocalDate returnedDate;

    private DeviceAssignmentStatus status;

    private String notes;

    public DeviceAssignmentResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
    }

    public String getInventoryNumber() {
        return inventoryNumber;
    }

    public void setInventoryNumber(String inventoryNumber) {
        this.inventoryNumber = inventoryNumber;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public Long getAssignedByUserId() {
        return assignedByUserId;
    }

    public void setAssignedByUserId(Long assignedByUserId) {
        this.assignedByUserId = assignedByUserId;
    }

    public String getAssignedByLogin() {
        return assignedByLogin;
    }

    public void setAssignedByLogin(String assignedByLogin) {
        this.assignedByLogin = assignedByLogin;
    }

    public LocalDate getAssignedDate() {
        return assignedDate;
    }

    public void setAssignedDate(LocalDate assignedDate) {
        this.assignedDate = assignedDate;
    }

    public LocalDate getExpectedReturnDate() {
        return expectedReturnDate;
    }

    public void setExpectedReturnDate(LocalDate expectedReturnDate) {
        this.expectedReturnDate = expectedReturnDate;
    }

    public LocalDate getReturnedDate() {
        return returnedDate;
    }

    public void setReturnedDate(LocalDate returnedDate) {
        this.returnedDate = returnedDate;
    }

    public DeviceAssignmentStatus getStatus() {
        return status;
    }

    public void setStatus(DeviceAssignmentStatus status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}