package com.robotron.server.dto.licenseassignment;

import com.robotron.server.model.enums.LicenseAssignmentStatus;

import java.time.LocalDate;

public class LicenseAssignmentResponse {

    private Long id;

    private Long employeeId;
    private String employeeName;

    private Long licenseId;
    private String softwareName;

    private String assignedByLogin;

    private LocalDate assignedDate;
    private LocalDate expirationDate;
    private LocalDate revokedDate;

    private LicenseAssignmentStatus status;

    private String notes;

    public LicenseAssignmentResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getLicenseId() {
        return licenseId;
    }

    public void setLicenseId(Long licenseId) {
        this.licenseId = licenseId;
    }

    public String getSoftwareName() {
        return softwareName;
    }

    public void setSoftwareName(String softwareName) {
        this.softwareName = softwareName;
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

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public LocalDate getRevokedDate() {
        return revokedDate;
    }

    public void setRevokedDate(LocalDate revokedDate) {
        this.revokedDate = revokedDate;
    }

    public LicenseAssignmentStatus getStatus() {
        return status;
    }

    public void setStatus(LicenseAssignmentStatus status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}