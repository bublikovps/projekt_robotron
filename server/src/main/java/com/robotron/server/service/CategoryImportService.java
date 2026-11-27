package com.robotron.server.service;

import com.robotron.server.dto.categoryimport.CategoryImportRow;
import com.robotron.server.model.Category;
import com.robotron.server.repository.CategoryRepository;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryImportService {

    private final CategoryRepository categoryRepository;

    public CategoryImportService(
            CategoryRepository categoryRepository
    ) {
        this.categoryRepository = categoryRepository;
    }

    public int importExcel(
            MultipartFile file
    ) throws Exception {

        List<CategoryImportRow> rows =
                readRows(file);

        int importedCount = 0;

        for (CategoryImportRow row : rows) {

            if (row.getName() == null) {
                continue;
            }

            String categoryName =
                    row.getName().trim();

            if (categoryName.isBlank()) {
                continue;
            }

            boolean exists =
                    categoryRepository
                            .findAll()
                            .stream()
                            .anyMatch(category ->
                                    category.getName()
                                            .equalsIgnoreCase(categoryName)
                            );

            if (exists) {
                continue;
            }

            Category category =
                    new Category();

            category.setName(categoryName);
            category.setActive(true);

            categoryRepository.save(category);

            importedCount++;
        }

        return importedCount;
    }

    private List<CategoryImportRow> readRows(
            MultipartFile file
    ) throws Exception {

        List<CategoryImportRow> rows =
                new ArrayList<>();

        try (
                InputStream inputStream =
                        file.getInputStream();

                Workbook workbook =
                        new XSSFWorkbook(inputStream)
        ) {

            Sheet sheet =
                    workbook.getSheetAt(0);

            for (int rowIndex = 1;
                 rowIndex <= sheet.getLastRowNum();
                 rowIndex++) {

                Row excelRow =
                        sheet.getRow(rowIndex);

                if (excelRow == null) {
                    continue;
                }

                CategoryImportRow row =
                        new CategoryImportRow();

                row.setName(
                        getCellValue(
                                excelRow.getCell(0)
                        )
                );

                rows.add(row);
            }
        }

        return rows;
    }

    private String getCellValue(
            Cell cell
    ) {

        if (cell == null) {
            return "";
        }

        return switch (cell.getCellType()) {

            case STRING ->
                    cell.getStringCellValue();

            case NUMERIC ->
                    String.valueOf(
                            (long) cell.getNumericCellValue()
                    );

            case BOOLEAN ->
                    String.valueOf(
                            cell.getBooleanCellValue()
                    );

            default -> "";
        };
    }
}