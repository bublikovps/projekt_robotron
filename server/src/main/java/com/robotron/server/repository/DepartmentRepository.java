package com.robotron.server.repository;

import com.robotron.server.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentRepository
        extends JpaRepository<Department, Long> {

    List<Department> findByActiveTrue();

    boolean existsByDepartmentCodeIgnoreCase(
            String departmentCode);

    boolean existsByNameIgnoreCase(
            String name);
}