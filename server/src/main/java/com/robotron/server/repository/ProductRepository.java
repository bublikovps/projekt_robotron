package com.robotron.server.repository;

import com.robotron.server.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Поиск по всей базе только активных товаров
    List<Product> findByIsActiveTrueAndNameContainingIgnoreCaseOrIsActiveTrueAndManufacturerContainingIgnoreCase(String name, String manufacturer);
    
    // Поиск активных товаров строго внутри выбранной категории
    List<Product> findByCategoryIdAndIsActiveTrueAndNameContainingIgnoreCase(Long categoryId, String name);
    
    // Вывод вообще всех активных товаров на главную
    List<Product> findByIsActiveTrue();

    boolean existsBySku(String sku);
}
