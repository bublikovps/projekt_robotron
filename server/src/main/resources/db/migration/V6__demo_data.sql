-- ==========================================
-- Demo Categories
-- ==========================================

INSERT INTO categories (name)
VALUES
('Laptops'),
('Monitore'),
('Software'),
('Netzwerk')
ON CONFLICT DO NOTHING;


-- ==========================================
-- Demo Departments
-- ==========================================

INSERT INTO department
(
    department_code,
    name,
    description
)
VALUES
(
    'IT',
    'IT-Abteilung',
    'Informations Technologie'
),
(
    'HR',
    'Human Resources',
    'Personalabteilung'
),
(
    'FIN',
    'Finanzabteilung',
    'Finanzen'
)
ON CONFLICT DO NOTHING;


-- ==========================================
-- Demo Employees
-- ==========================================

INSERT INTO employee
(
    department_id,
    employee_number,
    first_name,
    last_name,
    email,
    position,
    hire_date
)
VALUES

(
    1,
    'EMP-001',
    'Director',
    'Robotron',
    'director@robotron.local',
    'Director',
    CURRENT_DATE
),

(
    1,
    'EMP-002',
    'Admin',
    'Robotron',
    'admin@robotron.local',
    'Administrator',
    CURRENT_DATE
),

(
    1,
    'EMP-003',
    'Manager',
    'Robotron',
    'manager@robotron.local',
    'Manager',
    CURRENT_DATE
),

(
    2,
    'EMP-004',
    'Customer',
    'Robotron',
    'Customer',
    'customer@robotron.local',
    CURRENT_DATE
);


-- ==========================================
-- Demo Users
-- ==========================================

INSERT INTO users
(
    login,
    email,
    password_hash,
    employee_id,
    active,
    password_change_required
)
VALUES

(
    'director',
    'director@robotron.local',
    '$2a$10$YOUR_BCRYPT_HASH_HERE',
    1,
    true,
    true
),

(
    'admin',
    'admin@robotron.local',
    '$2a$10$YOUR_BCRYPT_HASH_HERE',
    2,
    true,
    true
),

(
    'manager',
    'manager@robotron.local',
    '$2a$10$YOUR_BCRYPT_HASH_HERE',
    3,
    true,
    true
),

(
    'customer',
    'customer@robotron.local',
    '$2a$10$YOUR_BCRYPT_HASH_HERE',
    4,
    true,
    true
);


-- ==========================================
-- Demo User Roles
-- ==========================================

INSERT INTO user_roles (user_id, role_id)

SELECT u.id, r.id
FROM users u
CROSS JOIN roles r
WHERE u.login = 'director'
AND r.name = 'ROLE_DIRECTOR';

INSERT INTO user_roles (user_id, role_id)

SELECT u.id, r.id
FROM users u
CROSS JOIN roles r
WHERE u.login = 'admin'
AND r.name = 'ROLE_ADMIN';

INSERT INTO user_roles (user_id, role_id)

SELECT u.id, r.id
FROM users u
CROSS JOIN roles r
WHERE u.login = 'manager'
AND r.name = 'ROLE_MANAGER';

INSERT INTO user_roles (user_id, role_id)

SELECT u.id, r.id
FROM users u
CROSS JOIN roles r
WHERE u.login = 'customer'
AND r.name = 'ROLE_CUSTOMER';

-- ==========================================
-- Demo Products
-- ==========================================

INSERT INTO products
(
    sku,
    name,
    manufacturer,
    price,
    purchase_price,
    sale_price,
    supplier,
    lagerbestand,
    minimum_stock,
    category_id,
    created_at,
    updated_at
)
VALUES

-- Laptops (1)

('NB-001','Dell Latitude 5540','Dell',1200,900,1200,'Dell GmbH',5,2,1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('NB-002','Lenovo ThinkPad T14','Lenovo',1400,1000,1400,'Lenovo Deutschland',3,1,1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('NB-003','HP EliteBook 860','HP',1500,1100,1500,'HP Deutschland',2,2,1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('NB-004','Microsoft Surface Laptop','Microsoft',1700,1300,1700,'Microsoft',1,2,1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('NB-005','ASUS ExpertBook','ASUS',1250,950,1250,'ASUS Deutschland',6,2,1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),

-- Monitore (2)

('MON-001','Dell UltraSharp 27','Dell',450,320,450,'Dell GmbH',8,3,2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('MON-002','LG UltraWide 34','LG',650,500,650,'LG Electronics',4,2,2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('MON-003','Samsung ViewFinity','Samsung',550,400,550,'Samsung',2,2,2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('MON-004','HP E27 G5','HP',350,240,350,'HP Deutschland',7,2,2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('MON-005','Lenovo ThinkVision','Lenovo',390,280,390,'Lenovo Deutschland',5,2,2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),

-- Software (3)

('SW-001','Microsoft Office 365','Microsoft',120,80,120,'Microsoft',50,10,3,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('SW-002','Adobe Acrobat Pro','Adobe',200,150,200,'Adobe',20,5,3,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('SW-003','ESET Protect','ESET',90,60,90,'ESET',30,5,3,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('SW-004','TeamViewer Corporate','TeamViewer',180,120,180,'TeamViewer',15,3,3,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('SW-005','JetBrains All Products','JetBrains',250,180,250,'JetBrains',10,2,3,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),

-- Netzwerk (4)

('NET-001','Cisco Catalyst 2960','Cisco',900,700,900,'Cisco',4,2,4,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('NET-002','Ubiquiti UniFi Switch','Ubiquiti',650,450,650,'Ubiquiti',3,2,4,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('NET-003','TP-Link Omada Router','TP-Link',300,220,300,'TP-Link',6,2,4,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('NET-004','MikroTik RB5009','MikroTik',420,300,420,'MikroTik',4,2,4,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('NET-005','Cisco Meraki MX','Cisco',1100,850,1100,'Cisco',2,1,4,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


-- ==========================================
-- Demo Devices
-- ==========================================

INSERT INTO device
(
    product_id,
    inventory_number,
    serial_number,
    status,
    location,
    current_value
)
VALUES

(1,'INV-001','SN-001','IN_STOCK','Chemnitz',850),
(2,'INV-002','SN-002','IN_STOCK','Chemnitz',950),
(3,'INV-003','SN-003','IN_STOCK','Leipzig',1050),
(4,'INV-004','SN-004','IN_STOCK','Dresden',1300),
(5,'INV-005','SN-005','IN_STOCK','Chemnitz',900),
(6,'INV-006','SN-006','IN_STOCK','Serverraum',300);


-- ==========================================
-- Demo Contracts
-- ==========================================

INSERT INTO employment_contract
(
    employee_id,
    contract_number,
    contract_type,
    start_date,
    weekly_hours,
    salary
)
VALUES

(
    1,
    'CTR-001',
    'UNBEFRISTET',
    CURRENT_DATE,
    40,
    8000
),

(
    2,
    'CTR-002',
    'UNBEFRISTET',
    CURRENT_DATE,
    40,
    5500
),

(
    3,
    'CTR-003',
    'UNBEFRISTET',
    CURRENT_DATE,
    40,
    4500
),

(
    4,
    'CTR-004',
    'MINIJOB',
    CURRENT_DATE,
    10,
    538
);


-- ==========================================
-- Demo Software Licenses
-- ==========================================

INSERT INTO software_license
(
    license_number,
    software_name,
    vendor,
    license_type,
    quantity,
    purchase_date,
    expiration_date,
    status
)
VALUES

(
    'LIC-001',
    'Microsoft 365 Business Premium',
    'Microsoft',
    'SUBSCRIPTION',
    50,
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '1 year',
    'ACTIVE'
),

(
    'LIC-002',
    'Adobe Acrobat Pro',
    'Adobe',
    'SUBSCRIPTION',
    20,
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '1 year',
    'ACTIVE'
),

(
    'LIC-003',
    'ESET Protect',
    'ESET',
    'SUBSCRIPTION',
    100,
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '1 year',
    'ACTIVE'
),

(
    'LIC-004',
    'JetBrains All Products',
    'JetBrains',
    'SUBSCRIPTION',
    15,
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '1 year',
    'ACTIVE'
),

(
    'LIC-005',
    'Windows 11 Pro',
    'Microsoft',
    'PERPETUAL',
    100,
    CURRENT_DATE,
    NULL,
    'ACTIVE'
);



-- ==========================================
-- Demo Device Assignments
-- ==========================================

INSERT INTO device_assignment
(
    employee_id,
    device_id,
    assigned_by_user_id,
    assigned_date,
    status
)
VALUES

(
    1,
    1,
    1,
    CURRENT_DATE,
    'ACTIVE'
),

(
    2,
    2,
    1,
    CURRENT_DATE,
    'ACTIVE'
),

(
    3,
    3,
    1,
    CURRENT_DATE,
    'ACTIVE'
);



-- ==========================================
-- Demo License Assignments
-- ==========================================

INSERT INTO license_assignment
(
    employee_id,
    license_id,
    assigned_by_user_id,
    assigned_date,
    status
)
VALUES

(
    1,
    1,
    1,
    CURRENT_DATE,
    'ACTIVE'
),

(
    2,
    2,
    1,
    CURRENT_DATE,
    'ACTIVE'
),

(
    3,
    3,
    1,
    CURRENT_DATE,
    'ACTIVE'
),

(
    1,
    5,
    1,
    CURRENT_DATE,
    'ACTIVE'
),

(
    2,
    5,
    1,
    CURRENT_DATE,
    'ACTIVE'
),

(
    3,
    5,
    1,
    CURRENT_DATE,
    'ACTIVE'
);









