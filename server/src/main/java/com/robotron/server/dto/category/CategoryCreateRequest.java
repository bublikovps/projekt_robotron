package com.robotron.server.dto.category;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public class CategoryCreateRequest {

    @Schema(
            description = "Name der Kategorie",
            example = "Notebook"
    )
    @NotBlank(message = "Kategoriename darf nicht leer sein.")
    private String name;

    public CategoryCreateRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}