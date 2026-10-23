package com.robotron.server.dto.employee;

public class EmployeeResponse {

    private Long id;

    private Long departmentId;

    private String departmentName;

    private String employeeNumber;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String position;

    private boolean active;

    public EmployeeResponse(
            Long id,
            Long departmentId,
            String departmentName,
            String employeeNumber,
            String firstName,
            String lastName,
            String email,
            String phone,
            String position,
            boolean active) {

        this.id = id;
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.employeeNumber = employeeNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.position = position;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public String getEmployeeNumber() {
        return employeeNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getPosition() {
        return position;
    }

    public boolean isActive() {
        return active;
    }
}