package com.robotron.server.dto.contract;

import com.robotron.server.model.enums.ContractType;

import java.math.BigDecimal;
import java.time.LocalDate;

public class EmploymentContractResponse {

    private Long id;

    private Long employeeId;

    private String employeeNumber;

    private String employeeName;

    private String contractNumber;

    private ContractType contractType;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer weeklyHours;

    private BigDecimal salary;

    private boolean active;

    public EmploymentContractResponse(
            Long id,
            Long employeeId,
            String employeeNumber,
            String employeeName,
            String contractNumber,
            ContractType contractType,
            LocalDate startDate,
            LocalDate endDate,
            Integer weeklyHours,
            BigDecimal salary,
            boolean active) {

        this.id = id;
        this.employeeId = employeeId;
        this.employeeNumber = employeeNumber;
        this.employeeName = employeeName;
        this.contractNumber = contractNumber;
        this.contractType = contractType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.weeklyHours = weeklyHours;
        this.salary = salary;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public String getEmployeeNumber() {
        return employeeNumber;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public String getContractNumber() {
        return contractNumber;
    }

    public ContractType getContractType() {
        return contractType;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Integer getWeeklyHours() {
        return weeklyHours;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public boolean isActive() {
        return active;
    }
}