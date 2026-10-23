package com.robotron.server.service;

import com.robotron.server.dto.employee.EmployeeCreateRequest;
import com.robotron.server.dto.employee.EmployeeResponse;
import com.robotron.server.dto.employee.EmployeeUpdateRequest;
import com.robotron.server.exception.BusinessException;
import com.robotron.server.exception.NotFoundException;
import com.robotron.server.mapper.EmployeeMapper;
import com.robotron.server.model.Department;
import com.robotron.server.model.Employee;
import com.robotron.server.repository.DepartmentRepository;
import com.robotron.server.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    private final DepartmentRepository departmentRepository;

    public EmployeeService(
            EmployeeRepository employeeRepository,
            DepartmentRepository departmentRepository) {

        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<EmployeeResponse> getAllEmployees() {

        return employeeRepository.findByActiveTrue()
                .stream()
                .map(EmployeeMapper::toResponse)
                .toList();
    }

    public EmployeeResponse createEmployee(
            EmployeeCreateRequest request) {

        if (employeeRepository
                .existsByEmployeeNumberIgnoreCase(
                        request.getEmployeeNumber())) {

            throw new BusinessException(
                    "Mitarbeiternummer existiert bereits!"
            );
        }

        if (employeeRepository
                .existsByEmailIgnoreCase(
                        request.getEmail())) {

            throw new BusinessException(
                    "E-Mail existiert bereits!"
            );
        }

        Department department =
                departmentRepository.findById(
                                request.getDepartmentId())
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Abteilung nicht gefunden!"
                                ));

        Employee employee = new Employee();

        employee.setDepartment(department);
        employee.setEmployeeNumber(
                request.getEmployeeNumber().trim());

        employee.setFirstName(
                request.getFirstName().trim());

        employee.setLastName(
                request.getLastName().trim());

        employee.setEmail(
                request.getEmail().trim());

        employee.setPhone(
                request.getPhone());

        employee.setPosition(
                request.getPosition().trim());

        employee.setHireDate(
                request.getHireDate());

        employee.setActive(true);

        Employee savedEmployee =
                employeeRepository.save(employee);

        return EmployeeMapper.toResponse(
                savedEmployee);
    }

    public EmployeeResponse updateEmployee(
            Long id,
            EmployeeUpdateRequest request) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Mitarbeiter nicht gefunden!"
                                ));

        Department department =
                departmentRepository.findById(
                                request.getDepartmentId())
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Abteilung nicht gefunden!"
                                ));

        employee.setDepartment(department);

        employee.setEmployeeNumber(
                request.getEmployeeNumber().trim());

        employee.setFirstName(
                request.getFirstName().trim());

        employee.setLastName(
                request.getLastName().trim());

        employee.setEmail(
                request.getEmail().trim());

        employee.setPhone(
                request.getPhone());

        employee.setPosition(
                request.getPosition().trim());

        employee.setHireDate(
                request.getHireDate());

        Employee updatedEmployee =
                employeeRepository.save(employee);

        return EmployeeMapper.toResponse(
                updatedEmployee);
    }

    public void archiveEmployee(Long id) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Mitarbeiter nicht gefunden!"
                                ));

        employee.setActive(false);

        employeeRepository.save(employee);
    }

    public void restoreEmployee(Long id) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Mitarbeiter nicht gefunden!"
                                ));

        employee.setActive(true);

        employeeRepository.save(employee);
    }

    public void permanentlyDeleteEmployee(
            Long id) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Mitarbeiter nicht gefunden!"
                                ));

        employeeRepository.delete(employee);
    }
}