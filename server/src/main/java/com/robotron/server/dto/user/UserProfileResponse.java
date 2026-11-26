package com.robotron.server.dto.user;

import com.robotron.server.model.enums.CustomerType;

import java.time.LocalDateTime;

import java.math.BigDecimal;


public class UserProfileResponse {

    private Long id;

    private String login;

    private String email;

    private CustomerType customerType;

    private String vorname;

    private String nachname;

    private BigDecimal accountBalance;

    private String companyName;

    private String ustIdnr;

    private String defaultShippingAddress;

    private LocalDateTime createdAt;

    private boolean passwordChangeRequired;

    public UserProfileResponse() {
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

    public void setLogin(String login) {
        this.login = login;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public CustomerType getCustomerType() {
        return customerType;
    }

    public void setCustomerType(
            CustomerType customerType
    ) {
        this.customerType = customerType;
    }

    public String getVorname() {
        return vorname;
    }

    public void setVorname(
            String vorname
    ) {
        this.vorname = vorname;
    }

    public String getNachname() {
        return nachname;
    }

    public void setNachname(
            String nachname
    ) {
        this.nachname = nachname;
    }

    public BigDecimal getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(
            BigDecimal accountBalance
    ) {
        this.accountBalance =
                accountBalance;
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

    public String getDefaultShippingAddress() {
        return defaultShippingAddress;
    }

    public void setDefaultShippingAddress(
            String defaultShippingAddress
    ) {
        this.defaultShippingAddress =
                defaultShippingAddress;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
            LocalDateTime createdAt
    ) {
        this.createdAt = createdAt;
    }

    public boolean isPasswordChangeRequired() {
        return passwordChangeRequired;
    }

    public void setPasswordChangeRequired(
            boolean passwordChangeRequired
    ) {
        this.passwordChangeRequired =
                passwordChangeRequired;
    }
}