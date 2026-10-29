ALTER TABLE products
ADD COLUMN purchase_price NUMERIC(12,2);

ALTER TABLE products
ADD COLUMN sale_price NUMERIC(12,2);

ALTER TABLE devices
ADD COLUMN current_value NUMERIC(12,2);