package com.robotron.server.service;

import com.robotron.server.dto.category.CategoryCreateRequest;
import com.robotron.server.dto.category.CategoryResponse;
import com.robotron.server.dto.category.CategoryUpdateRequest;
import com.robotron.server.exception.BusinessException;
import com.robotron.server.exception.NotFoundException;
import com.robotron.server.mapper.CategoryMapper;
import com.robotron.server.model.Category;
import com.robotron.server.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(
            CategoryRepository categoryRepository) {

        this.categoryRepository = categoryRepository;
    }

    public List<CategoryResponse> getAllCategories() {

        return categoryRepository.findByActiveTrue()
                .stream()
                .map(CategoryMapper::toResponse)
                .toList();
    }

    public CategoryResponse createCategory(
            CategoryCreateRequest request) {

        String categoryName =
                request.getName().trim();

        boolean alreadyExists = categoryRepository
                .findAll()
                .stream()
                .anyMatch(category ->
                        category.getName()
                                .equalsIgnoreCase(categoryName)
                );

        if (alreadyExists) {

            throw new BusinessException(
                    "Kategorie existiert bereits!"
            );
        }

        Category category = new Category();

        category.setName(categoryName);
        category.setActive(true);

        Category savedCategory =
                categoryRepository.save(category);

        return CategoryMapper.toResponse(
                savedCategory
        );
    }

    public CategoryResponse updateCategory(
            Long id,
            CategoryUpdateRequest request) {

        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Kategorie nicht gefunden!"
                                )
                        );

        category.setName(
                request.getName().trim()
        );

        Category updatedCategory =
                categoryRepository.save(category);

        return CategoryMapper.toResponse(
                updatedCategory
        );
    }

    public void archiveCategory(Long id) {

        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Kategorie nicht gefunden!"
                                )
                        );

        category.setActive(false);

        categoryRepository.save(category);
    }

    public void restoreCategory(Long id) {

        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Kategorie nicht gefunden!"
                                )
                        );

        category.setActive(true);

        categoryRepository.save(category);
    }

    public void permanentlyDeleteCategory(Long id) {

        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Kategorie nicht gefunden!"
                                )
                        );

        categoryRepository.delete(category);
    }
}