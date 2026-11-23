INSERT INTO permissions (
    name,
    description
)
VALUES (
    'USER_ANONYMIZE',
    'Benutzer DSGVO-konform anonymisieren'
)
ON CONFLICT (name) DO NOTHING;

-- ROLE_ADMIN

INSERT INTO role_permissions (
    role_id,
    permission_id
)
SELECT
    r.id,
    p.id
FROM roles r
JOIN permissions p
    ON p.name = 'USER_ANONYMIZE'
WHERE r.name = 'ROLE_ADMIN'
ON CONFLICT DO NOTHING;

-- ROLE_DIRECTOR

INSERT INTO role_permissions (
    role_id,
    permission_id
)
SELECT
    r.id,
    p.id
FROM roles r
JOIN permissions p
    ON p.name = 'USER_ANONYMIZE'
WHERE r.name = 'ROLE_DIRECTOR'
ON CONFLICT DO NOTHING;