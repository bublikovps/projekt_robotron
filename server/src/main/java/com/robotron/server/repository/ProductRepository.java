package com.robotron.server.repository;

import com.robotron.server.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
     
    List<Product> findByIsActiveTrueAndNameContainingIgnoreCaseOrIsActiveTrueAndManufacturerContainingIgnoreCase(String name, String manufacturer);
     
    List<Product> findByCategoryIdAndIsActiveTrueAndNameContainingIgnoreCase(Long categoryId, String name);
     
    List<Product> findByIsActiveTrue();

    boolean existsBySku(String sku);
}
