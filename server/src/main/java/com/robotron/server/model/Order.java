package com.robotron.server.model;

import com.robotron.server.model.enums.CustomerType;
import com.robotron.server.model.enums.OrderStatus;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "customer_type",
            nullable = false
    )
    private CustomerType customerType;

    @Column(
            name = "vorname",
            nullable = false
    )
    private String vorname;

    @Column(
            name = "nachname",
            nullable = false
    )
    private String nachname;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "ust_idnr")
    private String ustIdnr;

    @Column(
            name = "shipping_address",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String shippingAddress;

    @Column(
            name = "total_price",
            nullable = false,
            precision = 10,
            scale = 2
    )
    private BigDecimal totalPrice;

    @Column(
            name = "order_number",
            nullable = false,
            unique = true
    )
    private String orderNumber;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "status",
            nullable = false
    )
    private OrderStatus status =
            OrderStatus.PENDING_PAYMENT;

    @Column(
            name = "idempotency_key",
            nullable = false,
            unique = true
    )
    private String idempotencyKey;

    @Column(name = "payment_expires_at")
    private LocalDateTime paymentExpiresAt;

    @Column(
            name = "created_at",
            updatable = false
    )
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<OrderItem> orderItems =
            new ArrayList<>();

    @OneToMany(
            mappedBy = "order"
    )
    private List<Payment> payments =
            new ArrayList<>();

    @OneToMany(
            mappedBy = "order"
    )
    private List<Invoice> invoices =
            new ArrayList<>();

    @OneToMany(
            mappedBy = "order"
    )
    private List<DeliveryNote> deliveryNotes =
            new ArrayList<>();

    @OneToMany(
            mappedBy = "order"
    )
    private List<ReturnRequest> returns =
            new ArrayList<>();

    @PrePersist
    protected void onCreate() {

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

    }

    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();

    }

    public Order() {
    }

    public Long getId() {
        return id;
    }

    public void setId(
            Long id
    ) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(
            User user
    ) {
        this.user = user;
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

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(
            String shippingAddress
    ) {
        this.shippingAddress = shippingAddress;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(
            BigDecimal totalPrice
    ) {
        this.totalPrice = totalPrice;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(
            String orderNumber
    ) {
        this.orderNumber = orderNumber;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(
            OrderStatus status
    ) {
        this.status = status;
    }

    public String getIdempotencyKey() {
        return idempotencyKey;
    }

    public void setIdempotencyKey(
            String idempotencyKey
    ) {
        this.idempotencyKey = idempotencyKey;
    }

    public LocalDateTime getPaymentExpiresAt() {
        return paymentExpiresAt;
    }

    public void setPaymentExpiresAt(
            LocalDateTime paymentExpiresAt
    ) {
        this.paymentExpiresAt = paymentExpiresAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
            LocalDateTime createdAt
    ) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(
            LocalDateTime updatedAt
    ) {
        this.updatedAt = updatedAt;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(
            List<OrderItem> orderItems
    ) {
        this.orderItems = orderItems;
    }

    public List<Payment> getPayments() {
        return payments;
    }

    public void setPayments(
            List<Payment> payments
    ) {
        this.payments = payments;
    }

    public List<Invoice> getInvoices() {
        return invoices;
    }

    public void setInvoices(
            List<Invoice> invoices
    ) {
        this.invoices = invoices;
    }

    public List<DeliveryNote> getDeliveryNotes() {
        return deliveryNotes;
    }

    public void setDeliveryNotes(
            List<DeliveryNote> deliveryNotes
    ) {
        this.deliveryNotes = deliveryNotes;
    }

    public List<ReturnRequest> getReturns() {
        return returns;
    }

    public void setReturns(
            List<ReturnRequest> returns
    ) {
        this.returns = returns;
    }
}