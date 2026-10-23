package com.robotron.server.mapper;

import com.robotron.server.dto.product.ProductResponse;
import com.robotron.server.model.Product;

public class ProductMapper {

    private ProductMapper() {
    }

    public static ProductResponse toResponse(
            Product product) {

        String categoryName =
                product.getCategory() != null
                        ? product.getCategory().getName()
                        : null;

        Long categoryId =
                product.getCategory() != null
                        ? product.getCategory().getId()
                        : null;

        return new ProductResponse(
                product.getId(),
                product.getSku(),
                product.getName(),
                product.getManufacturer(),
                product.getDescription(),
                product.getPrice(),
                product.getLagerbestand(),
                product.getMinimumStock(),
                product.isActive(),
                categoryId,
                categoryName,
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }
}