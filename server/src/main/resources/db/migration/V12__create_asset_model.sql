-- =====================================================
-- Asset Models
-- Enterprise Asset Management
-- =====================================================

CREATE TABLE asset_model
(
    id BIGSERIAL PRIMARY KEY,

    asset_code VARCHAR(50)
        NOT NULL
        UNIQUE,

    name VARCHAR(255)
        NOT NULL,

    manufacturer VARCHAR(255)
        NOT NULL,

    asset_category VARCHAR(100)
        NOT NULL,

    description TEXT,

    default_purchase_price NUMERIC(12,2),

    expected_lifetime_months INTEGER,

    default_warranty_months INTEGER,

    active BOOLEAN
        NOT NULL
        DEFAULT TRUE,

    created_at TIMESTAMP
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Demo Asset Models
-- =====================================================

INSERT INTO asset_model
(
    asset_code,
    name,
    manufacturer,
    asset_category,
    description,
    default_purchase_price,
    expected_lifetime_months,
    default_warranty_months
)
VALUES

(
    'LAP-DELL-5540',
    'Dell Latitude 5540',
    'Dell',
    'LAPTOP',
    'Business Laptop',
    1200.00,
    48,
    36
),

(
    'LAP-LENOVO-T14',
    'Lenovo ThinkPad T14',
    'Lenovo',
    'LAPTOP',
    'Business Laptop',
    1400.00,
    48,
    36
),

(
    'LAP-HP-860',
    'HP EliteBook 860',
    'HP',
    'LAPTOP',
    'Business Laptop',
    1500.00,
    48,
    36
),

(
    'LAP-MS-SURFACE',
    'Microsoft Surface Laptop',
    'Microsoft',
    'LAPTOP',
    'Premium Notebook',
    1700.00,
    48,
    24
),

(
    'MON-DELL-U27',
    'Dell UltraSharp 27',
    'Dell',
    'MONITOR',
    'Office Monitor',
    450.00,
    60,
    36
),

(
    'MON-DELL-P2725H',
    'Dell P2725H',
    'Dell',
    'MONITOR',
    'Business Monitor',
    280.00,
    60,
    36
);