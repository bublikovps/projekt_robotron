package com.robotron.server.catalog.service;

import com.robotron.server.catalog.dto.CatalogCategoryResponse;
import com.robotron.server.catalog.dto.CatalogProductResponse;
import com.robotron.server.model.Category;
import com.robotron.server.model.Product;
import com.robotron.server.repository.CategoryRepository;
import com.robotron.server.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CatalogService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public CatalogService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<CatalogProductResponse> getProducts(
            String search,
            Long categoryId) {

        String query =
                search != null
                        ? search.trim()
                        : "";

        List<Product> products;

        if (categoryId != null) {

            products =
                    productRepository
                            .findByCategoryIdAndIsActiveTrueAndNameContainingIgnoreCase(
                                    categoryId,
                                    query
                            );

        } else if (!query.isEmpty()) {

            products =
                    productRepository
                            .findByIsActiveTrueAndNameContainingIgnoreCaseOrIsActiveTrueAndManufacturerContainingIgnoreCase(
                                    query,
                                    query
                            );
        } else {

            products =
                    productRepository.findByIsActiveTrue();
        }

        return products.stream()
                .map(this::toCatalogProductResponse)
                .toList();
    }

    public CatalogProductResponse getProductById(
            Long id) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Produkt nicht gefunden."
                                )
                        );

        return toCatalogProductResponse(product);
    }

    public List<CatalogCategoryResponse>
    getCategories() {

        return categoryRepository
                .findAll()
                .stream()
                .filter(Category::isActive)
                .map(category ->
                        new CatalogCategoryResponse(
                                category.getId(),
                                category.getName()
                        )
                )
                .toList();
    }

    private CatalogProductResponse
    toCatalogProductResponse(
            Product product) {

        String categoryName =
                product.getCategory() != null
                        ? product.getCategory().getName()
                        : null;

        return new CatalogProductResponse(
                product.getId(),
                product.getSku(),
                product.getName(),
                product.getManufacturer(),
                product.getDescription(),
                product.getPrice(),
                categoryName
        );
    }
}