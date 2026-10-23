package com.robotron.server.service;

import com.robotron.server.dto.department.DepartmentCreateRequest;
import com.robotron.server.dto.department.DepartmentResponse;
import com.robotron.server.dto.department.DepartmentUpdateRequest;
import com.robotron.server.exception.BusinessException;
import com.robotron.server.exception.NotFoundException;
import com.robotron.server.mapper.DepartmentMapper;
import com.robotron.server.model.Department;
import com.robotron.server.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(
            DepartmentRepository departmentRepository) {

        this.departmentRepository = departmentRepository;
    }

    public List<DepartmentResponse> getAllDepartments() {

        return departmentRepository.findByActiveTrue()
                .stream()
                .map(DepartmentMapper::toResponse)
                .toList();
    }

    public DepartmentResponse createDepartment(
            DepartmentCreateRequest request) {

        if (departmentRepository
                .existsByDepartmentCodeIgnoreCase(
                        request.getDepartmentCode())) {

            throw new BusinessException(
                    "Abteilungscode existiert bereits!"
            );
        }

        if (departmentRepository
                .existsByNameIgnoreCase(
                        request.getName())) {

            throw new BusinessException(
                    "Abteilung existiert bereits!"
            );
        }

        Department department =
                new Department();

        department.setDepartmentCode(
                request.getDepartmentCode().trim()
        );

        department.setName(
                request.getName().trim()
        );

        department.setDescription(
                request.getDescription()
        );

        department.setActive(true);

        Department savedDepartment =
                departmentRepository.save(department);

        return DepartmentMapper.toResponse(
                savedDepartment
        );
    }

    public DepartmentResponse updateDepartment(
            Long id,
            DepartmentUpdateRequest request) {

        Department department =
                departmentRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Abteilung nicht gefunden!"
                                )
                        );

        department.setDepartmentCode(
                request.getDepartmentCode().trim()
        );

        department.setName(
                request.getName().trim()
        );

        department.setDescription(
                request.getDescription()
        );

        Department updatedDepartment =
                departmentRepository.save(
                        department
                );

        return DepartmentMapper.toResponse(
                updatedDepartment
        );
    }

    public void archiveDepartment(Long id) {

        Department department =
                departmentRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Abteilung nicht gefunden!"
                                )
                        );

        department.setActive(false);

        departmentRepository.save(
                department
        );
    }

    public void restoreDepartment(Long id) {

        Department department =
                departmentRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Abteilung nicht gefunden!"
                                )
                        );

        department.setActive(true);

        departmentRepository.save(
                department
        );
    }

    public void permanentlyDeleteDepartment(
            Long id) {

        Department department =
                departmentRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Abteilung nicht gefunden!"
                                )
                        );

        departmentRepository.delete(
                department
        );
    }
}