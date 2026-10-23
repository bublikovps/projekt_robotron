package com.robotron.server.repository;

import com.robotron.server.model.LicenseAssignment;
import com.robotron.server.model.SoftwareLicense;
import com.robotron.server.model.enums.LicenseAssignmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LicenseAssignmentRepository
        extends JpaRepository<LicenseAssignment, Long> {

    List<LicenseAssignment> findByStatus(
            LicenseAssignmentStatus status);

    List<LicenseAssignment> findByEmployeeId(
            Long employeeId);

    long countByLicenseAndStatus(
            SoftwareLicense license,
            LicenseAssignmentStatus status);
}