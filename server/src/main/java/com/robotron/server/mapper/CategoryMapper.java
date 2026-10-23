package com.robotron.server.mapper;

import com.robotron.server.dto.category.CategoryResponse;
import com.robotron.server.model.Category;

public class CategoryMapper {

    private CategoryMapper() {
    }

    public static CategoryResponse toResponse(
            Category category) {

        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.isActive()
        );
    }
}