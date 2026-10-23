package com.robotron.server.service;

import com.robotron.server.dto.licenseassignment.LicenseAssignmentCreateRequest;
import com.robotron.server.dto.licenseassignment.LicenseAssignmentResponse;
import com.robotron.server.exception.BusinessException;
import com.robotron.server.exception.NotFoundException;
import com.robotron.server.mapper.LicenseAssignmentMapper;
import com.robotron.server.model.Employee;
import com.robotron.server.model.LicenseAssignment;
import com.robotron.server.model.SoftwareLicense;
import com.robotron.server.model.User;
import com.robotron.server.model.enums.LicenseAssignmentStatus;
import com.robotron.server.repository.EmployeeRepository;
import com.robotron.server.repository.LicenseAssignmentRepository;
import com.robotron.server.repository.SoftwareLicenseRepository;
import com.robotron.server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LicenseAssignmentService {

    private final LicenseAssignmentRepository assignmentRepository;
    private final SoftwareLicenseRepository licenseRepository;
    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;

    public LicenseAssignmentService(
            LicenseAssignmentRepository assignmentRepository,
            SoftwareLicenseRepository licenseRepository,
            EmployeeRepository employeeRepository,
            UserRepository userRepository) {

        this.assignmentRepository = assignmentRepository;
        this.licenseRepository = licenseRepository;
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
    }

    public LicenseAssignmentResponse createAssignment(
            LicenseAssignmentCreateRequest request) {

        Employee employee =
                employeeRepository.findById(
                                request.getEmployeeId())
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Employee not found"));

        SoftwareLicense license =
                licenseRepository.findById(
                                request.getLicenseId())
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "License not found"));

        User assignedBy =
                userRepository.findById(
                                request.getAssignedByUserId())
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "User not found"));

        if (license.getUsedQuantity()
                >= license.getQuantity()) {

            throw new BusinessException(
                    "No available licenses remaining");
        }

        LicenseAssignment assignment =
                new LicenseAssignment();

        assignment.setEmployee(employee);
        assignment.setLicense(license);
        assignment.setAssignedBy(assignedBy);

        assignment.setAssignedDate(
                LocalDate.now());

        assignment.setExpirationDate(
                request.getExpirationDate());

        assignment.setStatus(
                LicenseAssignmentStatus.ACTIVE);

        assignment.setNotes(
                request.getNotes());

        license.setUsedQuantity(
                license.getUsedQuantity() + 1);

        licenseRepository.save(license);

        LicenseAssignment saved =
                assignmentRepository.save(
                        assignment);

        return LicenseAssignmentMapper
                .toResponse(saved);
    }

    public LicenseAssignmentResponse revokeAssignment(
            Long id) {

        LicenseAssignment assignment =
                assignmentRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "License assignment not found"));

        if (assignment.getStatus()
                == LicenseAssignmentStatus.REVOKED) {

            throw new BusinessException(
                    "Assignment already revoked");
        }

        assignment.setStatus(
                LicenseAssignmentStatus.REVOKED);

        assignment.setRevokedDate(
                LocalDate.now());

        SoftwareLicense license =
                assignment.getLicense();

        if (license.getUsedQuantity() > 0) {

            license.setUsedQuantity(
                    license.getUsedQuantity() - 1);

            licenseRepository.save(license);
        }

        LicenseAssignment saved =
                assignmentRepository.save(
                        assignment);

        return LicenseAssignmentMapper
                .toResponse(saved);
    }

    public List<LicenseAssignmentResponse>
    getAllAssignments() {

        return assignmentRepository.findAll()
                .stream()
                .map(
                        LicenseAssignmentMapper::toResponse)
                .toList();
    }

    public List<LicenseAssignmentResponse>
    getActiveAssignments() {

        return assignmentRepository
                .findByStatus(
                        LicenseAssignmentStatus.ACTIVE)
                .stream()
                .map(
                        LicenseAssignmentMapper::toResponse)
                .toList();
    }
}