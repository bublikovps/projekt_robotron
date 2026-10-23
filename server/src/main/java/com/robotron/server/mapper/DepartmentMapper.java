package com.robotron.server.mapper;

import com.robotron.server.dto.department.DepartmentResponse;
import com.robotron.server.model.Department;

public class DepartmentMapper {

    private DepartmentMapper() {
    }

    public static DepartmentResponse toResponse(
            Department department) {

        return new DepartmentResponse(
                department.getId(),
                department.getDepartmentCode(),
                department.getName(),
                department.getDescription(),
                department.isActive()
        );
    }
}