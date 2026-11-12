package com.robotron.server.dto.category;

import io.swagger.v3.oas.annotations.media.Schema;

public class CategoryResponse {

    @Schema(
            description = "Eindeutige ID der Kategorie",
            example = "1"
    )
    private Long id;

    @Schema(
            description = "Name der Kategorie",
            example = "Notebook"
    )
    private String name;

    private boolean active;

    private Long productCount;

    public CategoryResponse(
            Long id,
            String name,
            boolean active,
            Long productCount) {

        this.id = id;
        this.name = name;
        this.active = active;
        this.productCount = productCount;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean isActive() {
        return active;
    }

    public Long getProductCount() {
        return productCount;
    }
}