-- ==========================================
-- Default Roles
-- ==========================================

INSERT INTO roles (name)
VALUES
    ('ROLE_CUSTOMER'),
    ('ROLE_MANAGER'),
    ('ROLE_ADMIN'),
    ('ROLE_DIRECTOR')
ON CONFLICT (name) DO NOTHING;

-- ==========================================
-- Default Permissions
-- ==========================================

INSERT INTO permissions (name)
VALUES

    -- Products
    ('PRODUCT_VIEW'),
    ('PRODUCT_CREATE'),
    ('PRODUCT_EDIT'),
    ('PRODUCT_ARCHIVE'),

    -- Categories
    ('CATEGORY_VIEW'),
    ('CATEGORY_CREATE'),
    ('CATEGORY_EDIT'),
    ('CATEGORY_ARCHIVE'),

    -- Departments
    ('DEPARTMENT_VIEW'),
    ('DEPARTMENT_CREATE'),
    ('DEPARTMENT_EDIT'),
    ('DEPARTMENT_ARCHIVE'),

    -- Employees
    ('EMPLOYEE_VIEW'),
    ('EMPLOYEE_CREATE'),
    ('EMPLOYEE_EDIT'),
    ('EMPLOYEE_ARCHIVE'),

    -- Contracts
    ('CONTRACT_VIEW'),
    ('CONTRACT_CREATE'),
    ('CONTRACT_EDIT'),
    ('CONTRACT_ARCHIVE'),

    -- Devices
    ('DEVICE_VIEW'),
    ('DEVICE_CREATE'),
    ('DEVICE_EDIT'),
    ('DEVICE_ARCHIVE'),

    -- Licenses
    ('LICENSE_VIEW'),
    ('LICENSE_CREATE'),
    ('LICENSE_EDIT'),
    ('LICENSE_ARCHIVE'),

    -- Device Assignments
    ('ASSIGNMENT_VIEW'),
    ('ASSIGNMENT_CREATE'),
    ('ASSIGNMENT_RETURN'),

    -- License Assignments
    ('LICENSE_ASSIGNMENT_VIEW'),
    ('LICENSE_ASSIGNMENT_CREATE'),
    ('LICENSE_ASSIGNMENT_REVOKE'),

    -- Financial Reporting
    ('REPORT_VIEW'),

    -- Administration
    ('USER_CREATE'),
    ('USER_EDIT'),
    ('ROLE_MANAGE'),
    ('PERMISSION_MANAGE')

ON CONFLICT (name) DO NOTHING;

-- ==========================================
-- ROLE_CUSTOMER
-- ==========================================

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p
ON p.name IN (
    'PRODUCT_VIEW'
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

    'PRODUCT_VIEW',
    'PRODUCT_CREATE',
    'PRODUCT_EDIT',
    'PRODUCT_ARCHIVE',

    'CATEGORY_VIEW',
    'CATEGORY_CREATE',
    'CATEGORY_EDIT',
    'CATEGORY_ARCHIVE',

    'REPORT_VIEW'

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

    'PRODUCT_VIEW',
    'PRODUCT_CREATE',
    'PRODUCT_EDIT',
    'PRODUCT_ARCHIVE',

    'CATEGORY_VIEW',
    'CATEGORY_CREATE',
    'CATEGORY_EDIT',
    'CATEGORY_ARCHIVE',

    'DEPARTMENT_VIEW',
    'DEPARTMENT_CREATE',
    'DEPARTMENT_EDIT',
    'DEPARTMENT_ARCHIVE',

    'EMPLOYEE_VIEW',
    'EMPLOYEE_CREATE',
    'EMPLOYEE_EDIT',
    'EMPLOYEE_ARCHIVE',

    'CONTRACT_VIEW',
    'CONTRACT_CREATE',
    'CONTRACT_EDIT',
    'CONTRACT_ARCHIVE',

    'DEVICE_VIEW',
    'DEVICE_CREATE',
    'DEVICE_EDIT',
    'DEVICE_ARCHIVE',

    'LICENSE_VIEW',
    'LICENSE_CREATE',
    'LICENSE_EDIT',
    'LICENSE_ARCHIVE',

    'ASSIGNMENT_VIEW',
    'ASSIGNMENT_CREATE',
    'ASSIGNMENT_RETURN',

    'LICENSE_ASSIGNMENT_VIEW',
    'LICENSE_ASSIGNMENT_CREATE',
    'LICENSE_ASSIGNMENT_REVOKE',

    'REPORT_VIEW'
)
WHERE r.name = 'ROLE_ADMIN'
ON CONFLICT DO NOTHING;

-- ==========================================
-- ROLE_DIRECTOR
-- ==========================================

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'ROLE_DIRECTOR'
ON CONFLICT DO NOTHING;
