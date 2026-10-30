package com.robotron.server.reporting.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FinancialReportRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Object[]> findInventoryValueReport() {

        return entityManager
                .createNativeQuery("""
                        SELECT *
                        FROM inventory_value_report
                        """)
                .getResultList();
    }

    public List<Object[]> findAssetValueReport() {

        return entityManager
                .createNativeQuery("""
                        SELECT *
                        FROM asset_value_report
                        """)
                .getResultList();
    }

    public List<Object[]> findDepartmentAssetValueReport() {

        return entityManager
                .createNativeQuery("""
                        SELECT *
                        FROM department_asset_value_report
                        """)
                .getResultList();
    }

    public List<Object[]> findLowStockReport() {

        return entityManager
                .createNativeQuery("""
                        SELECT
                                id,
                                sku,
                                name,
                                lagerbestand,
                                minimum_stock
                        FROM products
                        WHERE lagerbestand <= minimum_stock
                        ORDER BY lagerbestand ASC
                        """)
                .getResultList();
        }

      public List<Object[]> findProductMarginReport() {

        return entityManager
                .createNativeQuery("""
                        SELECT
                                id,
                                sku,
                                name,
                                purchase_price,
                                sale_price,
                                (
                                COALESCE(sale_price,0)
                                -
                                COALESCE(purchase_price,0)
                                ) AS margin
                        FROM products
                        ORDER BY margin DESC
                        """)
                .getResultList();
        }  

        public List<Object[]> findSupplierInventoryReport() {

        return entityManager
                .createNativeQuery("""
                        SELECT
                                supplier,
                                COUNT(*),
                                SUM(lagerbestand),
                                SUM(
                                COALESCE(lagerbestand,0)
                                *
                                COALESCE(purchase_price,0)
                                )
                        FROM products
                        GROUP BY supplier
                        ORDER BY supplier
                        """)
                .getResultList();
        }


        public List<Object[]> findActiveDevicesReport() {

        return entityManager
                .createNativeQuery("""
                        SELECT
                                id,
                                inventory_number,
                                serial_number,
                                status,
                                location
                        FROM device
                        WHERE active = true
                        ORDER BY inventory_number
                        """)
                .getResultList();
        }

        public List<Object[]> findExpiringLicensesReport() {

        return entityManager
                .createNativeQuery("""
                        SELECT
                                id,
                                software_name,
                                vendor,
                                expiration_date,
                                status
                        FROM software_license
                        WHERE expiration_date
                                <= CURRENT_DATE + 90
                        ORDER BY expiration_date
                        """)
                .getResultList();
        }
}