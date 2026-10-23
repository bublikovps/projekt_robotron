package com.robotron.server.service;

import com.robotron.server.dto.product.ProductCreateRequest;
import com.robotron.server.dto.product.ProductResponse;
import com.robotron.server.dto.product.ProductUpdateRequest;
import com.robotron.server.exception.BusinessException;
import com.robotron.server.exception.NotFoundException;
import com.robotron.server.mapper.ProductMapper;
import com.robotron.server.model.Category;
import com.robotron.server.model.Product;
import com.robotron.server.repository.CategoryRepository;
import com.robotron.server.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<ProductResponse> getAllProducts(
            String search,
            Long categoryId) {

        String query =
                (search != null)
                        ? search.trim()
                        : "";

        List<Product> products;

        if (categoryId != null) {

            products = productRepository
                    .findByCategoryIdAndIsActiveTrueAndNameContainingIgnoreCase(
                            categoryId,
                            query
                    );

        } else if (!query.isEmpty()) {

            products = productRepository
                    .findByIsActiveTrueAndNameContainingIgnoreCaseOrIsActiveTrueAndManufacturerContainingIgnoreCase(
                            query,
                            query
                    );

        } else {

            products = productRepository.findByIsActiveTrue();
        }

        return products.stream()
                .map(ProductMapper::toResponse)
                .toList();
    }

    public ProductResponse createProduct(
            ProductCreateRequest request) {

        if (productRepository.existsBySku(request.getSku())) {

            throw new BusinessException(
                    "Die Artikelnummer (SKU) existiert bereits!"
            );
        }

        Category category = categoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() ->
                        new NotFoundException(
                                "Kategorie nicht gefunden!"
                        )
                );

        Product product = new Product();

        product.setSku(request.getSku().trim());
        product.setName(request.getName().trim());
        product.setManufacturer(
                request.getManufacturer().trim()
        );

        product.setDescription(
                request.getDescription()
        );

        product.setPrice(
                request.getPrice()
        );

        product.setLagerbestand(
                request.getLagerbestand()
        );

        product.setMinimumStock(
                request.getMinimumStock()
        );

        product.setCategory(category);

        product.setActive(true);

        Product savedProduct =
                productRepository.save(product);

        return ProductMapper.toResponse(savedProduct);
    }

    public ProductResponse updateProduct(
            Long id,
            ProductUpdateRequest request) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new NotFoundException(
                                "Produkt nicht gefunden!"
                        )
                );

        Category category = categoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() ->
                        new NotFoundException(
                                "Kategorie nicht gefunden!"
                        )
                );

        product.setName(
                request.getName().trim()
        );

        product.setManufacturer(
                request.getManufacturer().trim()
        );

        product.setDescription(
                request.getDescription()
        );

        product.setPrice(
                request.getPrice()
        );

        product.setLagerbestand(
                request.getLagerbestand()
        );

        product.setMinimumStock(
                request.getMinimumStock()
        );

        product.setCategory(category);

        Product updatedProduct =
                productRepository.save(product);

        return ProductMapper.toResponse(updatedProduct);
    }

    public void archiveProduct(Long id) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new NotFoundException(
                                "Produkt nicht gefunden!"
                        )
                );

        product.setActive(false);

        productRepository.save(product);
    }

    public void restoreProduct(Long id) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new NotFoundException(
                                "Produkt nicht gefunden!"
                        )
                );

        product.setActive(true);

        productRepository.save(product);
    }

    public void permanentlyDeleteProduct(Long id) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new NotFoundException(
                                "Produkt nicht gefunden!"
                        )
                );

        productRepository.delete(product);
    }
    public ProductResponse getProductById(
                Long id) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Produkt nicht gefunden!"
                                ));

        return ProductMapper.toResponse(
                product
        );
        }

}