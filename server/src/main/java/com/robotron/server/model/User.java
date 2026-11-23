package com.robotron.server.model;

import com.robotron.server.model.enums.CustomerType;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import java.math.BigDecimal;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            unique = true,
            nullable = false
    )
    private String login;

    @Column(
            unique = true,
            nullable = false
    )
    private String email;

    @Column(
            name = "password_hash",
            nullable = false
    )
    private String passwordHash;

    @Column(
            name = "created_at",
            updatable = false
    )
    private LocalDateTime createdAt =
            LocalDateTime.now();

    @Column(
            name = "password_change_required",
            nullable = false
    )
    private boolean passwordChangeRequired = true;

    @Column(nullable = false)
    private boolean active = true;

    @Enumerated(EnumType.STRING)
    @Column(name = "customer_type")
    private CustomerType customerType;

    @Column(name = "vorname")
    private String vorname;

    @Column(name = "nachname")
    private String nachname;

    @Column(
            name = "account_balance",
            nullable = false,
            precision = 12,
            scale = 2
    )
    private BigDecimal accountBalance =
            BigDecimal.valueOf(10000);

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "ust_idnr")
    private String ustIdnr;

    @Column(name = "default_shipping_address")
    private String defaultShippingAddress;

    @Column(name = "anonymized_at")
    private LocalDateTime anonymizedAt;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns =
            @JoinColumn(name = "user_id"),
            inverseJoinColumns =
            @JoinColumn(name = "role_id")
    )
    private Set<Role> roles =
            new HashSet<>();

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(
            Long id
    ) {
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

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(
            String passwordHash
    ) {
        this.passwordHash = passwordHash;
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

    public boolean isActive() {
        return active;
    }

    public void setActive(
            boolean active
    ) {
        this.active = active;
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

    public LocalDateTime getAnonymizedAt() {
        return anonymizedAt;
    }

    public void setAnonymizedAt(
            LocalDateTime anonymizedAt
    ) {
        this.anonymizedAt = anonymizedAt;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(
            Set<Role> roles
    ) {
        this.roles = roles;
    }
}