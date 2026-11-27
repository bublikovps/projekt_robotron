package com.robotron.server.service;

import com.robotron.server.dto.assetmodelimport.AssetModelImportRow;
import com.robotron.server.model.AssetModel;
import com.robotron.server.repository.AssetModelRepository;

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
public class AssetModelImportService {

    private final AssetModelRepository
            assetModelRepository;

    public AssetModelImportService(
            AssetModelRepository assetModelRepository
    ) {

        this.assetModelRepository =
                assetModelRepository;

    }

    public int importAssetModels(
            MultipartFile file
    ) throws IOException {

        List<AssetModelImportRow> rows =
                readAssetModels(file);

        int importedCount = 0;

        for (
                AssetModelImportRow row
                        : rows
        ) {

            if (
                    row.getAssetCode() == null
                    ||
                    row.getAssetCode().isBlank()
            ) {
                continue;
            }

            if (
                    assetModelRepository
                            .existsByAssetCodeIgnoreCase(
                                    row.getAssetCode()
                            )
            ) {
                continue;
            }

            AssetModel assetModel =
                    new AssetModel();

            assetModel.setAssetCode(
                    row.getAssetCode()
            );

            assetModel.setName(
                    row.getName()
            );

            assetModel.setManufacturer(
                    row.getManufacturer()
            );

            assetModel.setAssetCategory(
                    row.getAssetCategory()
            );

            assetModel.setDescription(
                    row.getDescription()
            );

            assetModel.setDefaultPurchasePrice(
                    row.getDefaultPurchasePrice()
            );

            assetModel.setExpectedLifetimeMonths(
                    row.getExpectedLifetimeMonths()
            );

            assetModel.setDefaultWarrantyMonths(
                    row.getDefaultWarrantyMonths()
            );

            assetModel.setActive(true);

            assetModelRepository.save(
                    assetModel
            );

            importedCount++;
        }

        return importedCount;
    }

    private List<AssetModelImportRow>
    readAssetModels(
            MultipartFile file
    ) throws IOException {

        List<AssetModelImportRow> rows =
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

                AssetModelImportRow item =
                        new AssetModelImportRow();

                item.setAssetCode(
                        getString(row, 0)
                );

                item.setName(
                        getString(row, 1)
                );

                item.setManufacturer(
                        getString(row, 2)
                );

                item.setAssetCategory(
                        getString(row, 3)
                );

                item.setDescription(
                        getString(row, 4)
                );

                item.setDefaultPurchasePrice(
                        getDecimal(row, 5)
                );

                item.setExpectedLifetimeMonths(
                        getInteger(row, 6)
                );

                item.setDefaultWarrantyMonths(
                        getInteger(row, 7)
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

        if (
                row.getCell(index)
                        == null
        ) {
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

        if (
                row.getCell(index)
                        == null
        ) {

            return BigDecimal.ZERO;
        }

        return BigDecimal.valueOf(
                row.getCell(index)
                        .getNumericCellValue()
        );
    }

    private Integer getInteger(
            Row row,
            int index
    ) {

        if (
                row.getCell(index)
                        == null
        ) {

            return 0;
        }

        return (int)
                row.getCell(index)
                        .getNumericCellValue();
    }

}