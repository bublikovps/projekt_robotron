-- =====================================================
-- Inventory / Asset Separation
-- =====================================================

-- Product Financial Data

ALTER TABLE products
ADD COLUMN purchase_price NUMERIC(10,2);

ALTER TABLE products
ADD COLUMN supplier VARCHAR(255);

ALTER TABLE products
ADD COLUMN sale_price NUMERIC(10,2);

-- Device Financial Data

ALTER TABLE device
ADD COLUMN current_value NUMERIC(10,2);

ALTER TABLE device
ADD COLUMN retirement_date DATE;

-- Improve Device Lifecycle

ALTER TABLE device
DROP CONSTRAINT IF EXISTS chk_device_status;

ALTER TABLE device
ADD CONSTRAINT chk_device_status
CHECK (
    status IN (
        'IN_STOCK',
        'ASSIGNED',
        'RETURNED',
        'REPAIR',
        'RETIRED',
        'DISPOSED'
    )
);

-- Useful Financial Indexes

CREATE INDEX idx_products_purchase_price
ON products(purchase_price);

CREATE INDEX idx_device_current_value
ON device(current_value);

CREATE INDEX IF NOT EXISTS idx_device_status
ON device(status);