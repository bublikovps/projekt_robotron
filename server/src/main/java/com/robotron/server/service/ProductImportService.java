package com.robotron.server.service;

import com.robotron.server.dto.productimport.ProductImportRow;
import com.robotron.server.model.Category;
import com.robotron.server.model.Product;
import com.robotron.server.repository.CategoryRepository;
import com.robotron.server.repository.ProductRepository;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductImportService {

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    public ProductImportService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository) {

        this.productRepository =
                productRepository;

        this.categoryRepository =
                categoryRepository;
    }

    public int importProducts(
            MultipartFile file
    ) throws IOException {

        List<ProductImportRow> rows =
                readProducts(file);

        int importedCount = 0;

        for (ProductImportRow row : rows) {

            if (
                    row.getSku() == null
                            || row.getSku().isBlank()
            ) {
                continue;
            }

            if (
                    productRepository.existsBySku(
                            row.getSku()
                    )
            ) {
                continue;
            }

            Category category =
                    categoryRepository
                            .findAll()
                            .stream()
                            .filter(c ->
                                    c.getName()
                                     .equalsIgnoreCase(
                                             row.getCategory()
                                     )
                            )
                            .findFirst()
                            .orElseThrow(
                                    () ->
                                            new RuntimeException(
                                                    "Kategorie nicht gefunden: "
                                                            + row.getCategory()
                                            )
                            );

            Product product =
                    new Product();

            product.setSku(
                    row.getSku()
            );

            product.setName(
                    row.getName()
            );

            product.setManufacturer(
                    row.getManufacturer()
            );

            product.setSupplier(
                    row.getSupplier()
            );

            product.setPrice(
                    row.getPrice()
            );

            product.setPurchasePrice(
                    row.getPurchasePrice()
            );

            product.setSalePrice(
                    row.getSalePrice()
            );

            product.setDescription(
                    row.getDescription()
            );

            product.setImageUrl(
                    row.getImageUrl()
            );

            product.setLagerbestand(
                    row.getStock()
            );

            product.setMinimumStock(
                    row.getMinimumStock()
            );

            product.setCategory(
                    category
            );

            product.setActive(true);

            productRepository.save(
                    product
            );

            importedCount++;
        }

        return importedCount;
    }

    private List<ProductImportRow>
    readProducts(
            MultipartFile file
    ) throws IOException {

        List<ProductImportRow> rows =
                new ArrayList<>();

        try (
                XSSFWorkbook workbook =
                        new XSSFWorkbook(
                                file.getInputStream()
                        )
        ) {

            Sheet sheet =
                    workbook.getSheetAt(0);

            for (
                    int i = 1;
                    i <= sheet.getLastRowNum();
                    i++
            ) {

                Row row =
                        sheet.getRow(i);

                if (row == null) {
                    continue;
                }

                ProductImportRow item =
                        new ProductImportRow();

                item.setSku(
                        getString(row, 0)
                );

                item.setName(
                        getString(row, 1)
                );

                item.setManufacturer(
                        getString(row, 2)
                );

                item.setSupplier(
                        getString(row, 3)
                );

                item.setPrice(
                        getDecimal(row, 4)
                );

                item.setPurchasePrice(
                        getDecimal(row, 5)
                );

                item.setSalePrice(
                        getDecimal(row, 6)
                );

                item.setCategory(
                        getString(row, 7)
                );

                item.setStock(
                        getInteger(row, 8)
                );

                item.setMinimumStock(
                        getInteger(row, 9)
                );

                item.setDescription(
                        getString(row, 10)
                );

                item.setImageUrl(
                        getString(row, 11)
                );

                rows.add(item);
            }
        }

        return rows;
    }

    private String getString(
            Row row,
            int index
    ) {

        if (row.getCell(index) == null) {
            return null;
        }

        return row
                .getCell(index)
                .toString()
                .trim();
    }

    private BigDecimal getDecimal(
            Row row,
            int index
    ) {

        if (row.getCell(index) == null) {

            return BigDecimal.ZERO;
        }

        return BigDecimal.valueOf(
                row.getCell(index)
                        .getNumericCellValue()
        );
    }

    private int getInteger(
            Row row,
            int index
    ) {

        if (row.getCell(index) == null) {

            return 0;
        }

        return (int)
                row.getCell(index)
                        .getNumericCellValue();
    }
}