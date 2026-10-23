package com.robotron.server.repository;

import com.robotron.server.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    List<Employee> findByActiveTrue();

    boolean existsByEmployeeNumberIgnoreCase(
            String employeeNumber);

    boolean existsByEmailIgnoreCase(
            String email);
}