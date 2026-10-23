package com.robotron.server.dto.department;

public class DepartmentResponse {

    private Long id;

    private String departmentCode;

    private String name;

    private String description;

    private boolean active;

    public DepartmentResponse(
            Long id,
            String departmentCode,
            String name,
            String description,
            boolean active) {

        this.id = id;
        this.departmentCode = departmentCode;
        this.name = name;
        this.description = description;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public String getDepartmentCode() {
        return departmentCode;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public boolean isActive() {
        return active;
    }
}