package com.robotron.server.dto.contract;

import com.robotron.server.model.enums.ContractType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public class EmploymentContractUpdateRequest {

    @NotNull
    private Long employeeId;

    @NotBlank
    private String contractNumber;

    @NotNull
    private ContractType contractType;

    @NotNull
    private LocalDate startDate;

    private LocalDate endDate;

    @NotNull
    private Integer weeklyHours;

    @NotNull
    private BigDecimal salary;

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getContractNumber() {
        return contractNumber;
    }

    public void setContractNumber(String contractNumber) {
        this.contractNumber = contractNumber;
    }

    public ContractType getContractType() {
        return contractType;
    }

    public void setContractType(
            ContractType contractType) {

        this.contractType = contractType;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(
            LocalDate startDate) {

        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(
            LocalDate endDate) {

        this.endDate = endDate;
    }

    public Integer getWeeklyHours() {
        return weeklyHours;
    }

    public void setWeeklyHours(
            Integer weeklyHours) {

        this.weeklyHours = weeklyHours;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(
            BigDecimal salary) {

        this.salary = salary;
    }
}