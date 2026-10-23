package com.robotron.server.service;

import com.robotron.server.dto.deviceassignment.DeviceAssignmentCreateRequest;
import com.robotron.server.dto.deviceassignment.DeviceAssignmentResponse;
import com.robotron.server.exception.BusinessException;
import com.robotron.server.exception.NotFoundException;
import com.robotron.server.mapper.DeviceAssignmentMapper;
import com.robotron.server.model.Device;
import com.robotron.server.model.DeviceAssignment;
import com.robotron.server.model.Employee;
import com.robotron.server.model.User;
import com.robotron.server.model.enums.DeviceAssignmentStatus;
import com.robotron.server.repository.DeviceAssignmentRepository;
import com.robotron.server.repository.DeviceRepository;
import com.robotron.server.repository.EmployeeRepository;
import com.robotron.server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DeviceAssignmentService {

    private final DeviceAssignmentRepository deviceAssignmentRepository;
    private final DeviceRepository deviceRepository;
    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;

    public DeviceAssignmentService(
            DeviceAssignmentRepository deviceAssignmentRepository,
            DeviceRepository deviceRepository,
            EmployeeRepository employeeRepository,
            UserRepository userRepository) {

        this.deviceAssignmentRepository = deviceAssignmentRepository;
        this.deviceRepository = deviceRepository;
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
    }

    public DeviceAssignmentResponse createAssignment(
            DeviceAssignmentCreateRequest request) {

        Device device = deviceRepository.findById(
                        request.getDeviceId())
                .orElseThrow(() ->
                        new NotFoundException("Device not found"));

        Employee employee = employeeRepository.findById(
                        request.getEmployeeId())
                .orElseThrow(() ->
                        new NotFoundException("Employee not found"));

        User assignedBy = userRepository.findById(
                        request.getAssignedByUserId())
                .orElseThrow(() ->
                        new NotFoundException("User not found"));

        boolean alreadyAssigned =
                deviceAssignmentRepository.existsByDeviceAndStatus(
                        device,
                        DeviceAssignmentStatus.ACTIVE);

        if (alreadyAssigned) {
            throw new BusinessException(
                    "Device is already assigned");
        }

        DeviceAssignment assignment =
                new DeviceAssignment();

        assignment.setDevice(device);
        assignment.setEmployee(employee);
        assignment.setAssignedBy(assignedBy);

        assignment.setAssignedDate(LocalDate.now());

        assignment.setExpectedReturnDate(
                request.getExpectedReturnDate());

        assignment.setStatus(
                DeviceAssignmentStatus.ACTIVE);

        assignment.setNotes(
                request.getNotes());

        DeviceAssignment saved =
                deviceAssignmentRepository.save(
                        assignment);

        return DeviceAssignmentMapper.toResponse(saved);
    }

    public DeviceAssignmentResponse returnDevice(
            Long assignmentId) {

        DeviceAssignment assignment =
                deviceAssignmentRepository.findById(
                                assignmentId)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Assignment not found"));

        assignment.setReturnedDate(
                LocalDate.now());

        assignment.setStatus(
                DeviceAssignmentStatus.RETURNED);

        DeviceAssignment saved =
                deviceAssignmentRepository.save(
                        assignment);

        return DeviceAssignmentMapper.toResponse(saved);
    }

    public List<DeviceAssignmentResponse> getAllAssignments() {

        return deviceAssignmentRepository
                .findAll()
                .stream()
                .map(DeviceAssignmentMapper::toResponse)
                .toList();
    }

    public List<DeviceAssignmentResponse> getActiveAssignments() {

        return deviceAssignmentRepository
                .findByStatus(
                        DeviceAssignmentStatus.ACTIVE)
                .stream()
                .map(DeviceAssignmentMapper::toResponse)
                .toList();
    }
}