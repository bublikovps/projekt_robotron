-- ==========================================
-- Financial Reporting Foundation
-- ==========================================

-- ==========================================
-- Inventory Value
-- ==========================================

CREATE OR REPLACE VIEW inventory_value_report AS
SELECT
    p.id,
    p.sku,
    p.name,
    p.manufacturer,
    p.lagerbestand,
    p.purchase_price,
    p.sale_price,

    (
        COALESCE(p.lagerbestand, 0)
        *
        COALESCE(p.purchase_price, 0)
    ) AS inventory_value

FROM products p;

-- ==========================================
-- Asset Value
-- ==========================================

CREATE OR REPLACE VIEW asset_value_report AS
SELECT
    d.id,
    d.inventory_number,
    d.serial_number,
    d.status,

    d.purchase_price,
    d.current_value,

    (
        COALESCE(d.purchase_price, 0)
        -
        COALESCE(d.current_value, 0)
    ) AS depreciation_value

FROM device d;

-- ==========================================
-- Department Asset Value
-- ==========================================

CREATE OR REPLACE VIEW department_asset_value_report AS
SELECT
    dep.id,
    dep.name,

    COUNT(d.id) AS device_count,

    COALESCE(
        SUM(d.current_value),
        0
    ) AS total_asset_value

FROM department dep

LEFT JOIN employee e
    ON e.department_id = dep.id

LEFT JOIN device_assignment da
    ON da.employee_id = e.id
   AND da.status = 'ACTIVE'

LEFT JOIN device d
    ON d.id = da.device_id

GROUP BY
    dep.id,
    dep.name;