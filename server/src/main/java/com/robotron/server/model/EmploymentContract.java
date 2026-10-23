package com.robotron.server.model;

import com.robotron.server.model.enums.ContractType;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "employment_contract")
public class EmploymentContract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "employee_id",
            nullable = false
    )
    private Employee employee;

    @Column(
            name = "contract_number",
            nullable = false,
            unique = true
    )
    private String contractNumber;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "contract_type",
            nullable = false
    )
    private ContractType contractType;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "weekly_hours")
    private Integer weeklyHours;

    private BigDecimal salary;

    @Column(nullable = false)
    private boolean active = true;

    @CreationTimestamp
    @Column(
            name = "created_at",
            nullable = false,
            updatable = false
    )
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(
            name = "updated_at",
            nullable = false
    )
    private LocalDateTime updatedAt;

    public EmploymentContract() {
    }

    public Long getId() {
        return id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(
            Employee employee) {

        this.employee = employee;
    }

    public String getContractNumber() {
        return contractNumber;
    }

    public void setContractNumber(
            String contractNumber) {

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

    public boolean isActive() {
        return active;
    }

    public void setActive(
            boolean active) {

        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}