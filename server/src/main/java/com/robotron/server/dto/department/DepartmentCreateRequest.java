package com.robotron.server.dto.department;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class DepartmentCreateRequest {

    @NotBlank(message = "Abteilungscode darf nicht leer sein.")
    @Size(max = 20)
    private String departmentCode;

    @NotBlank(message = "Name darf nicht leer sein.")
    @Size(max = 100)
    private String name;

    @Size(max = 500)
    private String description;

    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(
            String departmentCode) {

        this.departmentCode = departmentCode;
    }

    public String getName() {
        return name;
    }

    public void setName(
            String name) {

        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(
            String description) {

        this.description = description;
    }
}