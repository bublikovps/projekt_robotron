package com.robotron.server.reporting.controller;

import com.robotron.server.reporting.dto.ActiveDeviceResponse;
import com.robotron.server.reporting.dto.AssetValueResponse;
import com.robotron.server.reporting.dto.DepartmentAssetValueResponse;
import com.robotron.server.reporting.dto.ExpiringLicenseResponse;
import com.robotron.server.reporting.dto.InventoryValueResponse;
import com.robotron.server.reporting.dto.LowStockResponse;
import com.robotron.server.reporting.dto.ProductMarginResponse;
import com.robotron.server.reporting.dto.SupplierInventoryResponse;
import com.robotron.server.reporting.service.FinancialReportService;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


import java.util.List;

@RestController
@RequestMapping("/api/reports")
@Tag(name = "Financial Reporting")
public class FinancialReportController {

    private final FinancialReportService service;

    public FinancialReportController(
            FinancialReportService service) {

        this.service = service;
    }

    @GetMapping("/inventory-value")
    @Operation(summary = "Inventory Value Report")
    public List<InventoryValueResponse>
    getInventoryValueReport() {

        return service.getInventoryValueReport();
    }

    @GetMapping("/asset-value")
    @Operation(summary = "Asset Value Report")
    public List<AssetValueResponse>
    getAssetValueReport() {

        return service.getAssetValueReport();
    }

    @GetMapping("/department-assets")
    @Operation(summary = "Department Asset Value Report")
    public List<DepartmentAssetValueResponse>
    getDepartmentAssetValueReport() {

        return service.getDepartmentAssetValueReport();
    }

    @GetMapping("/low-stock")
    @Operation(summary = "Low Stock Report")
    public List<LowStockResponse>
    getLowStockReport(

            @RequestParam(
                    defaultValue = "5"
            )
            Integer threshold

    ) {

        return service.getLowStockReport(
                threshold
        );
    }

    @GetMapping("/product-margin")
    @Operation(summary = "Product Margin Report")
    public List<ProductMarginResponse>
    getProductMarginReport() {

        return service.getProductMarginReport();
    }

    @GetMapping("/supplier-inventory")
    @Operation(summary = "Supplier Inventory Report")
    public List<SupplierInventoryResponse>
    getSupplierInventoryReport() {

        return service.getSupplierInventoryReport();
    }

    @GetMapping("/active-devices")
    @Operation(summary = "Active Devices Report")
    public List<ActiveDeviceResponse>
    getActiveDevicesReport() {

        return service.getActiveDevicesReport();
    }

    @GetMapping("/expiring-licenses")
    @Operation(summary = "Expiring Licenses Report")
    public List<ExpiringLicenseResponse>
    getExpiringLicensesReport() {

        return service.getExpiringLicensesReport();
    }
}