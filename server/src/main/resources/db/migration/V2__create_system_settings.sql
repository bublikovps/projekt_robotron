CREATE TABLE system_settings (
                                 id BIGSERIAL PRIMARY KEY,
                                 setting_key VARCHAR(100) NOT NULL UNIQUE,
                                 setting_value VARCHAR(500)
);