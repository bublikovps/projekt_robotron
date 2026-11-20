package com.robotron.server.dto.user;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class UserResponse {

    private Long id;

    private String login;

    private String email;

    private String role;

    private boolean active;

    private LocalDateTime createdAt;

    private String customerType;

    private String companyName;

    private String ustIdnr;

    private BigDecimal accountBalance;

    public UserResponse() {
    }

    public UserResponse(
            Long id,
            String login,
            String email,
            String role,
            boolean active,
            LocalDateTime createdAt,
            String customerType,
            String companyName,
            String ustIdnr,
            BigDecimal accountBalance
    ) {

        this.id = id;
        this.login = login;
        this.email = email;
        this.role = role;
        this.active = active;
        this.createdAt = createdAt;

        this.customerType = customerType;
        this.companyName = companyName;
        this.ustIdnr = ustIdnr;
        this.accountBalance = accountBalance;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(
            String login
    ) {
        this.login = login;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(
            String email
    ) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(
            String role
    ) {
        this.role = role;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(
            boolean active
    ) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
            LocalDateTime createdAt
    ) {
        this.createdAt = createdAt;
    }

    public String getCustomerType() {
        return customerType;
    }

    public void setCustomerType(
            String customerType
    ) {
        this.customerType = customerType;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(
            String companyName
    ) {
        this.companyName = companyName;
    }

    public String getUstIdnr() {
        return ustIdnr;
    }

    public void setUstIdnr(
            String ustIdnr
    ) {
        this.ustIdnr = ustIdnr;
    }

    public BigDecimal getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(
            BigDecimal accountBalance
    ) {
        this.accountBalance = accountBalance;
    }

}