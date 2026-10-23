package com.robotron.server.mapper;

import com.robotron.server.dto.employee.EmployeeResponse;
import com.robotron.server.model.Employee;

public class EmployeeMapper {

    private EmployeeMapper() {
    }

    public static EmployeeResponse toResponse(
            Employee employee) {

        return new EmployeeResponse(
                employee.getId(),
                employee.getDepartment().getId(),
                employee.getDepartment().getName(),
                employee.getEmployeeNumber(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getPhone(),
                employee.getPosition(),
                employee.isActive()
        );
    }
}