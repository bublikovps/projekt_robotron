CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    lagerbestand INT NOT NULL DEFAULT 0
);

INSERT INTO roles (name) VALUES 
('ROLE_ADMIN'), 
('ROLE_MANAGER'), 
('ROLE_CUSTOMER');

INSERT INTO users (username, email, password_hash) VALUES 
('admin', 'admin@b2b-shop.de', 'dummy_hash_for_now');

INSERT INTO user_roles (user_id, role_id) 
VALUES (1, 1);

INSERT INTO products (name, description, price, lagerbestand) VALUES 
('Laptops ThinkPad L14', 'Business Notebook 16GB RAM 512GB SSD', 899.00, 25),
('Cisco Switch 24-Port', 'Managed Gigabit Ethernet Switch', 450.50, 10),
('Server Rack 42U', 'Standard IT Server Enclosure Cabinet', 1200.00, 3);
