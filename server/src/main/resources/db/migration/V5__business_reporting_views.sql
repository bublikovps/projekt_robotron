-- ==========================================
-- Business Reporting Views
-- ==========================================

-- ==========================================
-- Low Stock Report
-- ==========================================

CREATE OR REPLACE VIEW low_stock_report AS
SELECT
    id,
    sku,
    name,
    manufacturer,

    lagerbestand,
    minimum_stock,

    (
        minimum_stock - lagerbestand
    ) AS shortage

FROM products

WHERE lagerbestand <= minimum_stock;

-- ==========================================
-- Product Margin Report
-- ==========================================

CREATE OR REPLACE VIEW product_margin_report AS
SELECT
    id,
    sku,
    name,

    purchase_price,
    sale_price,

    (
        COALESCE(sale_price, 0)
        -
        COALESCE(purchase_price, 0)
    ) AS margin

FROM products;

-- ==========================================
-- Supplier Inventory Report
-- ==========================================

CREATE OR REPLACE VIEW supplier_inventory_report AS
SELECT

    supplier,

    COUNT(*) AS product_count,

    SUM(
        COALESCE(lagerbestand, 0)
    ) AS total_units,

    SUM(
        COALESCE(lagerbestand, 0)
        *
        COALESCE(purchase_price, 0)
    ) AS inventory_value

FROM products

GROUP BY supplier;

-- ==========================================
-- Active Device Report
-- ==========================================

CREATE OR REPLACE VIEW active_device_report AS
SELECT

    id,

    inventory_number,

    serial_number,

    status,

    current_value,

    location

FROM device

WHERE active = TRUE;

-- ==========================================
-- Expiring License Report
-- ==========================================

CREATE OR REPLACE VIEW expiring_license_report AS
SELECT

    id,

    software_name,

    vendor,

    expiration_date,

    status

FROM software_license

WHERE expiration_date IS NOT NULL;