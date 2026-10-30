package com.robotron.server.reporting.controller;

import com.robotron.server.reporting.service.FinancialReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

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
    @Operation(
            summary =
                    "Inventory Value Report")
    public Object getInventoryValueReport() {

        return service
                .getInventoryValueReport();
    }

    @GetMapping("/asset-value")
    @Operation(
            summary =
                    "Asset Value Report")
    public Object getAssetValueReport() {

        return service
                .getAssetValueReport();
    }

    @GetMapping("/department-assets")
    @Operation(
            summary =
                    "Department Asset Value Report")
    public Object getDepartmentAssetValueReport() {

        return service
                .getDepartmentAssetValueReport();
    }

    @GetMapping("/low-stock")
        @Operation(
                summary =
                        "Low Stock Report")
        public Object getLowStockReport() {

        return service
                .getLowStockReport();
        }

        @GetMapping("/product-margin")
        @Operation(
                summary =
                        "Product Margin Report")
        public Object getProductMarginReport() {

        return service
                .getProductMarginReport();
        }

        @GetMapping("/supplier-inventory")
        @Operation(summary = "Supplier Inventory Report")
        public Object getSupplierInventoryReport() {

        return service
                .getSupplierInventoryReport();
        }

        @GetMapping("/active-devices")
        @Operation(
                summary =
                        "Active Devices Report")
        public Object getActiveDevicesReport() {

        return service
                .getActiveDevicesReport();
        }

        @GetMapping("/expiring-licenses")
        @Operation(
                summary =
                        "Expiring Licenses Report")
        public Object getExpiringLicensesReport() {

        return service
                .getExpiringLicensesReport();
        }
}