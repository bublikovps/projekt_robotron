package com.robotron.server.dto.user;

import com.robotron.server.model.enums.CustomerType;

public class CustomerProfileUpdateRequest {

    private CustomerType customerType;

    private String vorname;

    private String nachname;

    private String companyName;

    private String ustIdnr;

    private String defaultShippingAddress;

    public CustomerProfileUpdateRequest() {
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

    public String getDefaultShippingAddress() {
        return defaultShippingAddress;
    }

    public void setDefaultShippingAddress(
            String defaultShippingAddress
    ) {
        this.defaultShippingAddress =
                defaultShippingAddress;
    }
}