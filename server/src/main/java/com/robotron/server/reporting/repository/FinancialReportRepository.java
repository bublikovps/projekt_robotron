package com.robotron.server.reporting.repository;

import com.robotron.server.model.Product;
import com.robotron.server.reporting.projection.ActiveDeviceProjection;
import com.robotron.server.reporting.projection.AssetValueProjection;
import com.robotron.server.reporting.projection.DepartmentAssetValueProjection;
import com.robotron.server.reporting.projection.ExpiringLicenseProjection;
import com.robotron.server.reporting.projection.InventoryValueProjection;
import com.robotron.server.reporting.projection.LowStockProjection;
import com.robotron.server.reporting.projection.ProductMarginProjection;
import com.robotron.server.reporting.projection.SupplierInventoryProjection;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface FinancialReportRepository
        extends Repository<Product, Long> {

    @Query(value = """
            SELECT
                id AS productId,
                sku AS sku,
                name AS name,
                manufacturer AS manufacturer,
                lagerbestand AS lagerbestand,
                purchase_price AS purchasePrice,
                inventory_value AS inventoryValue
            FROM inventory_value_report
            """, nativeQuery = true)
    List<InventoryValueProjection> findInventoryValueReport();

    @Query(value = """
            SELECT
                id AS deviceId,
                inventory_number AS inventoryNumber,
                serial_number AS serialNumber,
                status AS status,
                purchase_price AS purchasePrice,
                current_value AS currentValue,
                depreciation_value AS depreciationValue
            FROM asset_value_report
            """, nativeQuery = true)
    List<AssetValueProjection> findAssetValueReport();

    @Query(value = """
            SELECT
                id AS departmentId,
                name AS departmentName,
                device_count AS deviceCount,
                total_asset_value AS totalAssetValue
            FROM department_asset_value_report
            """, nativeQuery = true)
    List<DepartmentAssetValueProjection> findDepartmentAssetValueReport();

    @Query(value = """
            SELECT
                p.id AS productId,
                p.sku AS sku,
                p.name AS name,
                p.lagerbestand AS lagerbestand,
                p.minimum_stock AS minimumStock
            FROM products p
            WHERE p.lagerbestand <= :threshold
            ORDER BY p.lagerbestand ASC
            """, nativeQuery = true)
    List<LowStockProjection> findLowStockReport(
            Integer threshold
    );


    @Query(value = """
            SELECT
                id AS productId,
                sku AS sku,
                name AS name,
                purchase_price AS purchasePrice,
                sale_price AS salePrice,
                margin AS margin
            FROM product_margin_report
            """, nativeQuery = true)
    List<ProductMarginProjection> findProductMarginReport();

    @Query(value = """
            SELECT
                supplier AS supplier,
                product_count AS productCount,
                total_units AS totalUnits,
                inventory_value AS inventoryValue
            FROM supplier_inventory_report
            """, nativeQuery = true)
    List<SupplierInventoryProjection> findSupplierInventoryReport();

    @Query(value = """
            SELECT
                id AS deviceId,
                inventory_number AS inventoryNumber,
                serial_number AS serialNumber,
                status AS status,
                location AS location
            FROM active_device_report
            """, nativeQuery = true)
    List<ActiveDeviceProjection> findActiveDevicesReport();

    @Query(value = """
            SELECT
                id AS licenseId,
                software_name AS softwareName,
                vendor AS vendor,
                expiration_date AS expirationDate,
                status AS status
            FROM expiring_license_report
            """, nativeQuery = true)
    List<ExpiringLicenseProjection> findExpiringLicensesReport();
}