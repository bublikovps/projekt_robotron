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
import com.robotron.server.reporting.projection.InventoryValueProjection;
import com.robotron.server.reporting.projection.LowStockProjection;
import com.robotron.server.reporting.projection.ProductMarginProjection;
import com.robotron.server.reporting.projection.SupplierInventoryProjection;
import com.robotron.server.reporting.projection.AssetValueProjection;
import com.robotron.server.reporting.projection.DepartmentAssetValueProjection;
import com.robotron.server.reporting.projection.ActiveDeviceProjection;
import com.robotron.server.reporting.projection.ExpiringLicenseProjection;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FinancialReportService {

    private final FinancialReportRepository repository;

    public FinancialReportService(
            FinancialReportRepository repository) {

        this.repository = repository;
    }

    public List<InventoryValueResponse>
        getInventoryValueReport() {

        List<InventoryValueProjection> rows =
                repository.findInventoryValueReport();

        List<InventoryValueResponse> result =
                new ArrayList<>();

        for (InventoryValueProjection row : rows) {

                result.add(
                        new InventoryValueResponse(
                                row.getProductId(),
                                row.getSku(),
                                row.getName(),
                                row.getManufacturer(),
                                row.getLagerbestand(),
                                row.getPurchasePrice(),
                                row.getInventoryValue()
                        )
                );
        }

        return result;
        }

    public List<AssetValueResponse>
        getAssetValueReport() {

        List<AssetValueProjection> rows =
                repository.findAssetValueReport();

        List<AssetValueResponse> result =
                new ArrayList<>();

        for (AssetValueProjection row : rows) {

                result.add(
                        new AssetValueResponse(
                                row.getDeviceId(),
                                row.getInventoryNumber(),
                                row.getSerialNumber(),
                                row.getStatus(),
                                row.getPurchasePrice(),
                                row.getCurrentValue(),
                                row.getDepreciationValue()
                        )
                );
        }

        return result;
        }

    public List<DepartmentAssetValueResponse>
        getDepartmentAssetValueReport() {

        List<DepartmentAssetValueProjection> rows =
                repository.findDepartmentAssetValueReport();

        List<DepartmentAssetValueResponse> result =
                new ArrayList<>();

        for (DepartmentAssetValueProjection row : rows) {

                result.add(
                        new DepartmentAssetValueResponse(
                                row.getDepartmentId(),
                                row.getDepartmentName(),
                                row.getDeviceCount(),
                                row.getTotalAssetValue()
                        )
                );
        }

        return result;
        }

    public List<LowStockResponse>
        getLowStockReport(
                Integer threshold
        ) {

        List<LowStockProjection> rows =
                repository.findLowStockReport(
                        threshold
                );

        List<LowStockResponse> result =
                new ArrayList<>();

        for (LowStockProjection row : rows) {

                result.add(
                        new LowStockResponse(
                                row.getProductId(),
                                row.getSku(),
                                row.getName(),
                                row.getLagerbestand(),
                                row.getMinimumStock()
                        )
                );
        }

        return result;
        }

    public List<ProductMarginResponse>
        getProductMarginReport() {

        List<ProductMarginProjection> rows =
                repository.findProductMarginReport();

        List<ProductMarginResponse> result =
                new ArrayList<>();

        for (ProductMarginProjection row : rows) {

                result.add(
                        new ProductMarginResponse(
                                row.getProductId(),
                                row.getSku(),
                                row.getName(),
                                row.getPurchasePrice(),
                                row.getSalePrice(),
                                row.getMargin()
                        )
                );
        }

        return result;
        }


        public List<SupplierInventoryResponse>
        getSupplierInventoryReport() {

        List<SupplierInventoryProjection> rows =
                repository.findSupplierInventoryReport();

        List<SupplierInventoryResponse> result =
                new ArrayList<>();

        for (SupplierInventoryProjection row : rows) {

                result.add(
                        new SupplierInventoryResponse(
                                row.getSupplier(),
                                row.getProductCount(),
                                row.getTotalUnits(),
                                row.getInventoryValue()
                        )
                );
        }

        return result;
        }


        public List<ActiveDeviceResponse>
        getActiveDevicesReport() {

        List<ActiveDeviceProjection> rows =
                repository.findActiveDevicesReport();

        List<ActiveDeviceResponse> result =
                new ArrayList<>();

        for (ActiveDeviceProjection row : rows) {

                result.add(
                        new ActiveDeviceResponse(
                                row.getDeviceId(),
                                row.getInventoryNumber(),
                                row.getSerialNumber(),
                                row.getStatus(),
                                row.getLocation()
                        )
                );
        }

        return result;
        }

        public List<ExpiringLicenseResponse>
        getExpiringLicensesReport() {

        List<ExpiringLicenseProjection> rows =
                repository.findExpiringLicensesReport();

        List<ExpiringLicenseResponse> result =
                new ArrayList<>();

        for (ExpiringLicenseProjection row : rows) {

                result.add(
                        new ExpiringLicenseResponse(
                                row.getLicenseId(),
                                row.getSoftwareName(),
                                row.getVendor(),
                                row.getExpirationDate(),
                                row.getStatus()
                        )
                );
        }

        return result;
        }
}