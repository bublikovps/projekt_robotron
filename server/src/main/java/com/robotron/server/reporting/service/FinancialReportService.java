package com.robotron.server.reporting.service;

import com.robotron.server.reporting.dto.ActiveDeviceResponse;
import com.robotron.server.reporting.dto.AssetValueResponse;
import com.robotron.server.reporting.dto.DepartmentAssetValueResponse;
import com.robotron.server.reporting.dto.ExpiringLicenseResponse;
import com.robotron.server.reporting.dto.InventoryValueResponse;
import com.robotron.server.reporting.repository.FinancialReportRepository;
import com.robotron.server.reporting.dto.LowStockResponse;
import com.robotron.server.reporting.dto.ProductMarginResponse;
import com.robotron.server.reporting.dto.SupplierInventoryResponse;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class FinancialReportService {

    private final FinancialReportRepository repository;

    public FinancialReportService(
            FinancialReportRepository repository) {

        this.repository = repository;
    }

    public List<InventoryValueResponse> getInventoryValueReport() {

        List<Object[]> rows =
                repository.findInventoryValueReport();

        List<InventoryValueResponse> result =
                new ArrayList<>();

        for (Object[] row : rows) {

            InventoryValueResponse dto =
                    new InventoryValueResponse();

            dto.setProductId(
                    ((Number) row[0]).longValue());

            dto.setSku(
                    (String) row[1]);

            dto.setName(
                    (String) row[2]);

            dto.setManufacturer(
                    (String) row[3]);

            dto.setLagerbestand(
                    ((Number) row[4]).intValue());

            dto.setPurchasePrice(
                    (BigDecimal) row[5]);

            dto.setInventoryValue(
                    (BigDecimal) row[7]);

            result.add(dto);
        }

        return result;
    }

    public List<AssetValueResponse> getAssetValueReport() {

        List<Object[]> rows =
                repository.findAssetValueReport();

        List<AssetValueResponse> result =
                new ArrayList<>();

        for (Object[] row : rows) {

            AssetValueResponse dto =
                    new AssetValueResponse();

            dto.setDeviceId(
                    ((Number) row[0]).longValue());

            dto.setInventoryNumber(
                    (String) row[1]);

            dto.setSerialNumber(
                    (String) row[2]);

            dto.setStatus(
                    (String) row[3]);

            dto.setPurchasePrice(
                    (BigDecimal) row[4]);

            dto.setCurrentValue(
                    (BigDecimal) row[5]);

            dto.setDepreciationValue(
                    (BigDecimal) row[6]);

            result.add(dto);
        }

        return result;
    }

    public List<DepartmentAssetValueResponse>
    getDepartmentAssetValueReport() {

        List<Object[]> rows =
                repository.findDepartmentAssetValueReport();

        List<DepartmentAssetValueResponse>
                result = new ArrayList<>();

        for (Object[] row : rows) {

            DepartmentAssetValueResponse dto =
                    new DepartmentAssetValueResponse();

            dto.setDepartmentId(
                    ((Number) row[0]).longValue());

            dto.setDepartmentName(
                    (String) row[1]);

            dto.setDeviceCount(
                    ((Number) row[2]).longValue());

            dto.setTotalAssetValue(
                    (BigDecimal) row[3]);

            result.add(dto);
        }

        return result;
    }

    public List<LowStockResponse> getLowStockReport() {

        List<Object[]> rows =
                repository.findLowStockReport();

        List<LowStockResponse> result =
                new ArrayList<>();

        for (Object[] row : rows) {

                LowStockResponse dto =
                        new LowStockResponse();

                dto.setProductId(
                        ((Number) row[0]).longValue());

                dto.setSku(
                        (String) row[1]);

                dto.setName(
                        (String) row[2]);

                dto.setLagerbestand(
                        ((Number) row[3]).intValue());

                dto.setMinimumStock(
                        ((Number) row[4]).intValue());

                result.add(dto);
        }

        return result;
    }

    public List<ProductMarginResponse>
        getProductMarginReport() {

        List<Object[]> rows =
                repository.findProductMarginReport();

        List<ProductMarginResponse> result =
                new ArrayList<>();

        for (Object[] row : rows) {

                ProductMarginResponse dto =
                        new ProductMarginResponse();

                dto.setProductId(
                        ((Number) row[0]).longValue());

                dto.setSku(
                        (String) row[1]);

                dto.setName(
                        (String) row[2]);

                dto.setPurchasePrice(
                        (BigDecimal) row[3]);

                dto.setSalePrice(
                        (BigDecimal) row[4]);

                dto.setMargin(
                        (BigDecimal) row[5]);

                result.add(dto);
        }

        return result;
        }

        public List<SupplierInventoryResponse>
        getSupplierInventoryReport() {

        List<Object[]> rows =
                repository.findSupplierInventoryReport();

        List<SupplierInventoryResponse> result =
                new ArrayList<>();

        for (Object[] row : rows) {

                SupplierInventoryResponse dto =
                        new SupplierInventoryResponse();

                dto.setSupplier(
                        (String) row[0]);

                dto.setProductCount(
                        ((Number) row[1]).longValue());

                dto.setTotalUnits(
                        ((Number) row[2]).longValue());

                dto.setInventoryValue(
                        (BigDecimal) row[3]);

                result.add(dto);
        }

        return result;
        }


        public List<ActiveDeviceResponse>
        getActiveDevicesReport() {

        List<Object[]> rows =
                repository.findActiveDevicesReport();

        List<ActiveDeviceResponse> result =
                new ArrayList<>();

        for (Object[] row : rows) {

                ActiveDeviceResponse dto =
                        new ActiveDeviceResponse();

                dto.setDeviceId(
                        ((Number) row[0]).longValue());

                dto.setInventoryNumber(
                        (String) row[1]);

                dto.setSerialNumber(
                        (String) row[2]);

                dto.setStatus(
                        (String) row[3]);

                dto.setLocation(
                        (String) row[4]);

                result.add(dto);
        }

        return result;
        }

        public List<ExpiringLicenseResponse>
        getExpiringLicensesReport() {

        List<Object[]> rows =
                repository.findExpiringLicensesReport();

        List<ExpiringLicenseResponse> result =
                new ArrayList<>();

        for (Object[] row : rows) {

                ExpiringLicenseResponse dto =
                        new ExpiringLicenseResponse();

                dto.setLicenseId(
                        ((Number) row[0]).longValue());

                dto.setSoftwareName(
                        (String) row[1]);

                dto.setVendor(
                        (String) row[2]);

                dto.setExpirationDate(
                        ((java.sql.Date) row[3]).toLocalDate());

                dto.setStatus(
                        (String) row[4]);

                result.add(dto);
        }

        return result;
        }
}