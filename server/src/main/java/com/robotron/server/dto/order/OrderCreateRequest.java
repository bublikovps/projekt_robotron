package com.robotron.server.dto.order;

import com.robotron.server.model.enums.CustomerType;

import java.util.List;

public class OrderCreateRequest {

    private CustomerType customerType;

    private String vorname;

    private String nachname;

    private String companyName;

    private String ustIdnr;

    private String shippingAddress;

    private String idempotencyKey;

    private List<OrderItemRequest> items;

    public OrderCreateRequest() {
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

    public String getIdempotencyKey() {
        return idempotencyKey;
    }

    public void setIdempotencyKey(
            String idempotencyKey
    ) {
        this.idempotencyKey = idempotencyKey;
    }

    public List<OrderItemRequest> getItems() {
        return items;
    }

    public void setItems(
            List<OrderItemRequest> items
    ) {
        this.items = items;
    }
}