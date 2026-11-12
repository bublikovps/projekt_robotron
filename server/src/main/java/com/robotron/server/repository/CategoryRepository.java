package com.robotron.server.repository;

import com.robotron.server.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import com.robotron.server.repository.projection.CategoryOverviewProjection;

import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository
        extends JpaRepository<Category, Long> {

    List<Category> findByActiveTrue();

    @Query("""
        SELECT
            c.id AS id,
            c.name AS name,
            c.active AS active,
            COUNT(p.id) AS productCount
        FROM Category c
        LEFT JOIN c.products p
        GROUP BY
            c.id,
            c.name,
            c.active
    """)

    List<CategoryOverviewProjection>
    findCategoryOverview();
}
