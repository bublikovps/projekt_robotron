package com.robotron.server.service;

import com.robotron.server.dto.contract.EmploymentContractCreateRequest;
import com.robotron.server.dto.contract.EmploymentContractResponse;
import com.robotron.server.dto.contract.EmploymentContractUpdateRequest;
import com.robotron.server.exception.BusinessException;
import com.robotron.server.exception.NotFoundException;
import com.robotron.server.mapper.EmploymentContractMapper;
import com.robotron.server.model.Employee;
import com.robotron.server.model.EmploymentContract;
import com.robotron.server.repository.EmployeeRepository;
import com.robotron.server.repository.EmploymentContractRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmploymentContractService {

    private final EmploymentContractRepository contractRepository;
    private final EmployeeRepository employeeRepository;

    public EmploymentContractService(
            EmploymentContractRepository contractRepository,
            EmployeeRepository employeeRepository) {

        this.contractRepository = contractRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<EmploymentContractResponse> getAllContracts() {

        return contractRepository.findByActiveTrue()
                .stream()
                .map(EmploymentContractMapper::toResponse)
                .toList();
    }

    public EmploymentContractResponse createContract(
            EmploymentContractCreateRequest request) {

        if (contractRepository.existsByContractNumberIgnoreCase(
                request.getContractNumber())) {

            throw new BusinessException(
                    "Vertragsnummer existiert bereits!"
            );
        }

        Employee employee =
                employeeRepository.findById(
                                request.getEmployeeId())
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Mitarbeiter nicht gefunden!"
                                ));

        EmploymentContract contract =
                new EmploymentContract();

        contract.setEmployee(employee);
        contract.setContractNumber(
                request.getContractNumber().trim());
        contract.setContractType(
                request.getContractType());
        contract.setStartDate(
                request.getStartDate());
        contract.setEndDate(
                request.getEndDate());
        contract.setWeeklyHours(
                request.getWeeklyHours());
        contract.setSalary(
                request.getSalary());
        contract.setActive(true);

        EmploymentContract saved =
                contractRepository.save(contract);

        return EmploymentContractMapper.toResponse(
                saved
        );
    }

    public EmploymentContractResponse updateContract(
            Long id,
            EmploymentContractUpdateRequest request) {

        EmploymentContract contract =
                contractRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Vertrag nicht gefunden!"
                                ));

        Employee employee =
                employeeRepository.findById(
                                request.getEmployeeId())
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Mitarbeiter nicht gefunden!"
                                ));

        contract.setEmployee(employee);
        contract.setContractNumber(
                request.getContractNumber().trim());
        contract.setContractType(
                request.getContractType());
        contract.setStartDate(
                request.getStartDate());
        contract.setEndDate(
                request.getEndDate());
        contract.setWeeklyHours(
                request.getWeeklyHours());
        contract.setSalary(
                request.getSalary());

        EmploymentContract updated =
                contractRepository.save(contract);

        return EmploymentContractMapper.toResponse(
                updated
        );
    }

    public void archiveContract(Long id) {

        EmploymentContract contract =
                contractRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Vertrag nicht gefunden!"
                                ));

        contract.setActive(false);

        contractRepository.save(contract);
    }

    public void restoreContract(Long id) {

        EmploymentContract contract =
                contractRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Vertrag nicht gefunden!"
                                ));

        contract.setActive(true);

        contractRepository.save(contract);
    }

    public void permanentlyDeleteContract(
            Long id) {

        EmploymentContract contract =
                contractRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Vertrag nicht gefunden!"
                                ));

        contractRepository.delete(contract);
    }
}