package com.robotron.server.dto.category;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public class CategoryUpdateRequest {

    @Schema(
            description = "Neuer Kategoriename",
            example = "Business Notebook"
    )
    @NotBlank(message = "Kategoriename darf nicht leer sein.")
    private String name;

    public CategoryUpdateRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
