-- ==========================================
-- Default Roles
-- ==========================================

INSERT INTO roles (name, description)
VALUES
(
    'ROLE_CUSTOMER',
    'Standardkunde'
),
(
    'ROLE_MANAGER',
    'Lager- und Produktverwaltung'
),
(
    'ROLE_ADMIN',
    'Systemadministrator'
),
(
    'ROLE_DIRECTOR',
    'Generaldirektor mit Vollzugriff'
)
ON CONFLICT (name) DO NOTHING;


-- ==========================================
-- Default Permissions
-- ==========================================

INSERT INTO permissions (name, description)
VALUES

-- User Management

('USER_READ', 'Benutzer anzeigen'),
('USER_CREATE', 'Benutzer erstellen'),
('USER_EDIT', 'Benutzer bearbeiten'),
('USER_DELETE', 'Benutzer löschen'),

('USER_BLOCK', 'Benutzer sperren'),
('USER_UNBLOCK', 'Benutzer entsperren'),

-- Role Management

('ROLE_READ', 'Rollen anzeigen'),
('ROLE_CREATE', 'Rollen erstellen'),
('ROLE_EDIT', 'Rollen bearbeiten'),
('ROLE_DELETE', 'Rollen löschen'),

-- Product Categories

('CATEGORY_READ', 'Produktkategorien anzeigen'),
('CATEGORY_CREATE', 'Produktkategorien erstellen'),
('CATEGORY_EDIT', 'Produktkategorien bearbeiten'),
('CATEGORY_ARCHIVE', 'Produktkategorien archivieren'),
('CATEGORY_RESTORE', 'Produktkategorien wiederherstellen'),
('CATEGORY_DELETE', 'Produktkategorien löschen'),

-- Products

('PRODUCT_READ', 'Produkte anzeigen'),
('PRODUCT_CREATE', 'Produkte erstellen'),
('PRODUCT_EDIT', 'Produkte bearbeiten'),
('PRODUCT_DELETE', 'Produkte löschen'),

('PRODUCT_ARCHIVE', 'Produkte archivieren'),
('PRODUCT_RESTORE', 'Produkte wiederherstellen'),

('PRODUCT_IMPORT', 'Produkte importieren'),
('PRODUCT_EXPORT', 'Produkte exportieren'),

-- Orders

('ORDER_READ', 'Bestellungen anzeigen'),
('ORDER_CREATE', 'Bestellungen erstellen'),
('ORDER_EDIT', 'Bestellungen bearbeiten'),
('ORDER_DELETE', 'Bestellungen löschen'),

('ORDER_ARCHIVE', 'Bestellungen archivieren'),
('ORDER_RESTORE', 'Bestellungen wiederherstellen'),

('ORDER_APPROVE', 'Bestellungen freigeben'),
('ORDER_CANCEL', 'Bestellungen stornieren'),
('ORDER_EXPORT', 'Bestellungen exportieren'),

-- Customers

('CUSTOMER_READ', 'Kunden anzeigen'),
('CUSTOMER_CREATE', 'Kunden erstellen'),
('CUSTOMER_EDIT', 'Kunden bearbeiten'),
('CUSTOMER_DELETE', 'Kunden löschen'),

('CUSTOMER_BLOCK', 'Kunden sperren'),
('CUSTOMER_UNBLOCK', 'Kunden entsperren'),

-- Warehouse

('WAREHOUSE_READ', 'Lagerdaten anzeigen'),
('WAREHOUSE_CREATE', 'Lagereinträge erstellen'),
('WAREHOUSE_EDIT', 'Lagerdaten bearbeiten'),
('WAREHOUSE_DELETE', 'Lagerdaten löschen'),

-- Reporting

('REPORT_VIEW', 'Berichte anzeigen'),
('REPORT_EXPORT', 'Berichte exportieren'),

-- Dashboard / Audit

('DASHBOARD_VIEW', 'Arbeitsbereich anzeigen'),
('AUDIT_VIEW', 'Audit-Protokolle anzeigen'),

('SYSTEM_SETTINGS', 'Systemeinstellungen ändern'),
('SYSTEM_AUDIT', 'Audit Logs anzeigen'),

-- Departments

('DEPARTMENT_READ', 'Abteilungen anzeigen'),
('DEPARTMENT_CREATE', 'Abteilungen erstellen'),
('DEPARTMENT_EDIT', 'Abteilungen bearbeiten'),
('DEPARTMENT_ARCHIVE', 'Abteilungen archivieren'),
('DEPARTMENT_RESTORE', 'Abteilungen wiederherstellen'),
('DEPARTMENT_DELETE', 'Abteilungen löschen'),

-- Employees

('EMPLOYEE_READ', 'Mitarbeiter anzeigen'),
('EMPLOYEE_CREATE', 'Mitarbeiter erstellen'),
('EMPLOYEE_EDIT', 'Mitarbeiter bearbeiten'),
('EMPLOYEE_ARCHIVE', 'Mitarbeiter archivieren'),
('EMPLOYEE_RESTORE', 'Mitarbeiter wiederherstellen'),
('EMPLOYEE_DELETE', 'Mitarbeiter löschen'),

-- Contracts

('CONTRACT_READ', 'Verträge anzeigen'),
('CONTRACT_CREATE', 'Verträge erstellen'),
('CONTRACT_EDIT', 'Verträge bearbeiten'),
('CONTRACT_ARCHIVE', 'Verträge archivieren'),
('CONTRACT_RESTORE', 'Verträge wiederherstellen'),
('CONTRACT_DELETE', 'Verträge löschen'),

-- Devices

('DEVICE_READ', 'Geräte anzeigen'),
('DEVICE_CREATE', 'Geräte erstellen'),
('DEVICE_EDIT', 'Geräte bearbeiten'),
('DEVICE_ARCHIVE', 'Geräte archivieren'),
('DEVICE_RESTORE', 'Geräte wiederherstellen'),
('DEVICE_DELETE', 'Geräte löschen'),

-- Licenses

('LICENSE_READ', 'Lizenzen anzeigen'),
('LICENSE_CREATE', 'Lizenzen erstellen'),
('LICENSE_EDIT', 'Lizenzen bearbeiten'),
('LICENSE_ARCHIVE', 'Lizenzen archivieren'),
('LICENSE_RESTORE', 'Lizenzen wiederherstellen'),
('LICENSE_DELETE', 'Lizenzen löschen'),

-- Device Assignments

('ASSIGNMENT_READ', 'Gerätezuweisungen anzeigen'),
('ASSIGNMENT_CREATE', 'Geräte zuweisen'),
('ASSIGNMENT_RETURN', 'Geräte zurücknehmen'),
('ASSIGNMENT_CANCEL', 'Gerätezuweisung stornieren'),

-- License Assignments

('LICENSE_ASSIGNMENT_READ', 'Lizenzzuweisungen anzeigen'),
('LICENSE_ASSIGNMENT_CREATE', 'Lizenzen zuweisen'),
('LICENSE_ASSIGNMENT_REVOKE', 'Lizenzen entziehen'),
('LICENSE_ASSIGNMENT_TRANSFER', 'Lizenzen übertragen')

ON CONFLICT (name) DO NOTHING;

-- ==========================================
-- ROLE_CUSTOMER
-- ==========================================

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p
ON p.name IN (

    'CUSTOMER_READ',

    'CATEGORY_READ',

    'ORDER_CREATE',
    'ORDER_READ',

    'PRODUCT_READ'

)
WHERE r.name = 'ROLE_CUSTOMER'
ON CONFLICT DO NOTHING;


-- ==========================================
-- ROLE_MANAGER
-- ==========================================

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p
ON p.name IN (

    'DASHBOARD_VIEW',

    'CATEGORY_READ',
    'CATEGORY_CREATE',
    'CATEGORY_EDIT',
    'CATEGORY_ARCHIVE',
    'CATEGORY_RESTORE',

    'ORDER_APPROVE',
    'ORDER_CANCEL',
    'ORDER_EDIT',
    'ORDER_READ',

    'PRODUCT_READ',
    'PRODUCT_CREATE',
    'PRODUCT_EDIT',
    'PRODUCT_ARCHIVE',
    'PRODUCT_RESTORE',

    'REPORT_VIEW',

    'WAREHOUSE_READ',
    'WAREHOUSE_CREATE',
    'WAREHOUSE_EDIT'

)
WHERE r.name = 'ROLE_MANAGER'
ON CONFLICT DO NOTHING;

-- ==========================================
-- ROLE_ADMIN
-- ==========================================

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p
ON p.name IN (

    -- Dashboard

    'DASHBOARD_VIEW',

    -- Users

    'USER_READ',
    'USER_CREATE',
    'USER_EDIT',
    'USER_BLOCK',
    'USER_UNBLOCK',

    -- Roles

    'ROLE_READ',
    'ROLE_EDIT',
    'ROLE_CREATE',

    -- Departments

    'DEPARTMENT_READ',
    'DEPARTMENT_CREATE',
    'DEPARTMENT_EDIT',
    'DEPARTMENT_ARCHIVE',
    'DEPARTMENT_RESTORE',
    'DEPARTMENT_DELETE',

    -- Employees

    'EMPLOYEE_READ',
    'EMPLOYEE_CREATE',
    'EMPLOYEE_EDIT',
    'EMPLOYEE_ARCHIVE',
    'EMPLOYEE_RESTORE',
    'EMPLOYEE_DELETE',

    -- Contracts

    'CONTRACT_READ',
    'CONTRACT_CREATE',
    'CONTRACT_EDIT',
    'CONTRACT_ARCHIVE',
    'CONTRACT_RESTORE',
    'CONTRACT_DELETE',

    -- Devices

    'DEVICE_READ',
    'DEVICE_CREATE',
    'DEVICE_EDIT',
    'DEVICE_ARCHIVE',
    'DEVICE_RESTORE',
    'DEVICE_DELETE',

    -- Licenses

    'LICENSE_READ',
    'LICENSE_CREATE',
    'LICENSE_EDIT',
    'LICENSE_ARCHIVE',
    'LICENSE_RESTORE',
    'LICENSE_DELETE',

    -- Device Assignments

    'ASSIGNMENT_READ',
    'ASSIGNMENT_CREATE',
    'ASSIGNMENT_RETURN',
    'ASSIGNMENT_CANCEL',

    -- License Assignments

    'LICENSE_ASSIGNMENT_READ',
    'LICENSE_ASSIGNMENT_CREATE',
    'LICENSE_ASSIGNMENT_REVOKE',
    'LICENSE_ASSIGNMENT_TRANSFER',

    -- Reporting

    'REPORT_VIEW',
    'REPORT_EXPORT',

    -- Audit

    'AUDIT_VIEW',

    -- System

    'SYSTEM_SETTINGS',

    -- Customer View

    'CUSTOMER_READ',
    'CUSTOMER_EDIT'

)
WHERE r.name = 'ROLE_ADMIN'
ON CONFLICT DO NOTHING;

-- ==========================================
-- ROLE_DIRECTOR
-- ==========================================

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p
ON p.name IN (

    -- User Management

    'USER_READ',
    'USER_CREATE',
    'USER_EDIT',
    'USER_DELETE',
    'USER_BLOCK',
    'USER_UNBLOCK',

    -- Role Management

    'ROLE_READ',
    'ROLE_CREATE',
    'ROLE_EDIT',
    'ROLE_DELETE',

    -- Customer Management

    'CUSTOMER_READ',
    'CUSTOMER_CREATE',
    'CUSTOMER_EDIT',
    'CUSTOMER_DELETE',
    'CUSTOMER_BLOCK',
    'CUSTOMER_UNBLOCK',

    -- Category Management

    'CATEGORY_READ',
    'CATEGORY_CREATE',
    'CATEGORY_EDIT',
    'CATEGORY_ARCHIVE',
    'CATEGORY_RESTORE',
    'CATEGORY_DELETE',

    -- Product Management

    'PRODUCT_READ',
    'PRODUCT_CREATE',
    'PRODUCT_EDIT',
    'PRODUCT_DELETE',
    'PRODUCT_ARCHIVE',
    'PRODUCT_RESTORE',
    'PRODUCT_IMPORT',
    'PRODUCT_EXPORT',

    -- Order Management

    'ORDER_READ',
    'ORDER_CREATE',
    'ORDER_EDIT',
    'ORDER_DELETE',
    'ORDER_ARCHIVE',
    'ORDER_RESTORE',
    'ORDER_APPROVE',
    'ORDER_CANCEL',
    'ORDER_EXPORT',

    -- Warehouse

    'WAREHOUSE_READ',
    'WAREHOUSE_CREATE',
    'WAREHOUSE_EDIT',
    'WAREHOUSE_DELETE',

    -- Departments

    'DEPARTMENT_READ',
    'DEPARTMENT_CREATE',
    'DEPARTMENT_EDIT',
    'DEPARTMENT_ARCHIVE',
    'DEPARTMENT_RESTORE',
    'DEPARTMENT_DELETE',

    -- Employees

    'EMPLOYEE_READ',
    'EMPLOYEE_CREATE',
    'EMPLOYEE_EDIT',
    'EMPLOYEE_ARCHIVE',
    'EMPLOYEE_RESTORE',
    'EMPLOYEE_DELETE',

    -- Contracts

    'CONTRACT_READ',
    'CONTRACT_CREATE',
    'CONTRACT_EDIT',
    'CONTRACT_ARCHIVE',
    'CONTRACT_RESTORE',
    'CONTRACT_DELETE',

    -- Devices

    'DEVICE_READ',
    'DEVICE_CREATE',
    'DEVICE_EDIT',
    'DEVICE_ARCHIVE',
    'DEVICE_RESTORE',
    'DEVICE_DELETE',

    -- Licenses

    'LICENSE_READ',
    'LICENSE_CREATE',
    'LICENSE_EDIT',
    'LICENSE_ARCHIVE',
    'LICENSE_RESTORE',
    'LICENSE_DELETE',

    -- Device Assignments

    'ASSIGNMENT_READ',
    'ASSIGNMENT_CREATE',
    'ASSIGNMENT_RETURN',
    'ASSIGNMENT_CANCEL',

    -- License Assignments

    'LICENSE_ASSIGNMENT_READ',
    'LICENSE_ASSIGNMENT_CREATE',
    'LICENSE_ASSIGNMENT_REVOKE',
    'LICENSE_ASSIGNMENT_TRANSFER',

    -- Reporting

    'REPORT_VIEW',
    'REPORT_EXPORT',

    -- Dashboard

    'DASHBOARD_VIEW',

    -- Audit

    'AUDIT_VIEW',

    -- System

    'SYSTEM_SETTINGS',
    'SYSTEM_AUDIT'

)
WHERE r.name = 'ROLE_DIRECTOR'
ON CONFLICT DO NOTHING;

