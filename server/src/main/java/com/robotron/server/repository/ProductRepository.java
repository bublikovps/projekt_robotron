package com.robotron.server.repository;

import com.robotron.server.model.Product;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    @Query("""
        SELECT p
        FROM Product p
        LEFT JOIN p.category c
        WHERE p.isActive = true
        AND (
            LOWER(p.name)
                LIKE LOWER(
                    CONCAT('%', :search, '%')
                )
            OR
            LOWER(p.manufacturer)
                LIKE LOWER(
                    CONCAT('%', :search, '%')
                )
            OR
            LOWER(p.sku)
                LIKE LOWER(
                    CONCAT('%', :search, '%')
                )
            OR
            LOWER(p.description)
                LIKE LOWER(
                    CONCAT('%', :search, '%')
                )
            OR
            LOWER(c.name)
                LIKE LOWER(
                    CONCAT('%', :search, '%')
                )
        )
    """)
    List<Product> searchProducts(
            @Param("search")
            String search
    );

    List<Product>
    findByCategoryIdAndIsActiveTrueAndNameContainingIgnoreCase(
            Long categoryId,
            String name
    );

    List<Product> findByIsActiveTrue();

    boolean existsBySku(
            String sku
    );
}