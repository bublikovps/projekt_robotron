package com.robotron.server.repository;

import com.robotron.server.model.Device;
import com.robotron.server.model.DeviceAssignment;
import com.robotron.server.model.Employee;
import com.robotron.server.model.enums.DeviceAssignmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeviceAssignmentRepository
        extends JpaRepository<DeviceAssignment, Long> {

    List<DeviceAssignment> findByStatus(
            DeviceAssignmentStatus status);

    List<DeviceAssignment> findByEmployeeId(
            Long employeeId);

    List<DeviceAssignment> findByEmployee(
            Employee employee);

    boolean existsByDeviceAndStatus(
            Device device,
            DeviceAssignmentStatus status);
}