CREATE FUNCTION public.update_device_status()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.status = 'ACTIVE' THEN
        UPDATE device
        SET status = 'ASSIGNED'
        WHERE id = NEW.device_id;

    ELSIF NEW.status = 'RETURNED' THEN
        UPDATE device
        SET status = 'AVAILABLE'
        WHERE id = NEW.device_id;
    END IF;

    RETURN NEW;
END;
$$;

CREATE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

CREATE TABLE public.categories (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);

CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.categories_id_seq
    OWNED BY public.categories.id;

ALTER TABLE ONLY public.categories
    ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);

CREATE TABLE public.department (
    id bigint NOT NULL,
    department_code character varying(20) NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(500),
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    manager_employee_id bigint
);

CREATE SEQUENCE public.department_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.department_id_seq
    OWNED BY public.department.id;

ALTER TABLE ONLY public.department
    ALTER COLUMN id SET DEFAULT nextval('public.department_id_seq'::regclass);

CREATE TABLE public.products (
    id bigint NOT NULL,
    sku character varying(100) NOT NULL,
    name character varying(255) NOT NULL,
    manufacturer character varying(150) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    lagerbestand integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    category_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    minimum_stock integer DEFAULT 0 NOT NULL
);

CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.products_id_seq
    OWNED BY public.products.id;

ALTER TABLE ONLY public.products
    ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);

CREATE TABLE public.device (
    id bigint NOT NULL,
    product_id bigint NOT NULL,
    inventory_number character varying(50) NOT NULL,
    serial_number character varying(100) NOT NULL,
    manufacturer_asset_tag character varying(100),
    purchase_date date,
    purchase_price numeric(10,2),
    warranty_until date,
    status character varying(50) NOT NULL,
    location character varying(150),
    notes text,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_device_price
        CHECK (
            purchase_price IS NULL
            OR purchase_price >= 0
        )
);

CREATE SEQUENCE public.device_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.device_id_seq
    OWNED BY public.device.id;

ALTER TABLE ONLY public.device
    ALTER COLUMN id SET DEFAULT nextval('public.device_id_seq'::regclass);

CREATE TABLE public.employee (
    id bigint NOT NULL,
    department_id bigint NOT NULL,
    employee_number character varying(50) NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(50),
    "position" character varying(150) NOT NULL,
    hire_date date NOT NULL,
    termination_date date,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE SEQUENCE public.employee_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.employee_id_seq
    OWNED BY public.employee.id;

ALTER TABLE ONLY public.employee
    ALTER COLUMN id SET DEFAULT nextval('public.employee_id_seq'::regclass);

CREATE TABLE public.device_assignment (
    id bigint NOT NULL,
    employee_id bigint NOT NULL,
    device_id bigint NOT NULL,
    assigned_by_user_id bigint NOT NULL,
    assigned_date date NOT NULL,
    expected_return_date date,
    returned_date date,
    status character varying(50) NOT NULL,
    notes text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE SEQUENCE public.device_assignment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.device_assignment_id_seq
    OWNED BY public.device_assignment.id;

ALTER TABLE ONLY public.device_assignment
    ALTER COLUMN id SET DEFAULT nextval('public.device_assignment_id_seq'::regclass);

CREATE TABLE public.employment_contract (
    id bigint NOT NULL,
    employee_id bigint NOT NULL,
    contract_number character varying(50) NOT NULL,
    contract_type character varying(50) NOT NULL,
    start_date date NOT NULL,
    end_date date,
    weekly_hours integer NOT NULL,
    salary numeric(10,2) NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_salary CHECK (salary >= 0),
    CONSTRAINT chk_weekly_hours CHECK (weekly_hours > 0)
);

CREATE SEQUENCE public.employment_contract_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.employment_contract_id_seq
    OWNED BY public.employment_contract.id;

ALTER TABLE ONLY public.employment_contract
    ALTER COLUMN id SET DEFAULT nextval('public.employment_contract_id_seq'::regclass);

CREATE TABLE public.software_license (
    id bigint NOT NULL,
    license_number character varying(50) NOT NULL,
    software_name character varying(200) NOT NULL,
    vendor character varying(150) NOT NULL,
    license_key character varying(500),
    license_type character varying(50) NOT NULL,
    quantity integer NOT NULL,
    purchase_date date,
    expiration_date date,
    status character varying(50) NOT NULL,
    notes text,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    used_quantity integer DEFAULT 0 NOT NULL,
    CONSTRAINT chk_license_quantity CHECK (quantity > 0)
);

CREATE SEQUENCE public.software_license_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.software_license_id_seq
    OWNED BY public.software_license.id;

ALTER TABLE ONLY public.software_license
    ALTER COLUMN id SET DEFAULT nextval('public.software_license_id_seq'::regclass);

CREATE TABLE public.license_assignment (
    id bigint NOT NULL,
    employee_id bigint NOT NULL,
    license_id bigint NOT NULL,
    assigned_by_user_id bigint NOT NULL,
    assigned_date date NOT NULL,
    expiration_date date,
    revoked_date date,
    status character varying(50) NOT NULL,
    notes text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE SEQUENCE public.license_assignment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.license_assignment_id_seq
    OWNED BY public.license_assignment.id;

ALTER TABLE ONLY public.license_assignment
    ALTER COLUMN id SET DEFAULT nextval('public.license_assignment_id_seq'::regclass);

CREATE TABLE public.users (
    id bigint NOT NULL,
    login character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    password_change_required boolean DEFAULT true NOT NULL,
    active boolean DEFAULT true NOT NULL,
    employee_id bigint
);

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.users_id_seq
    OWNED BY public.users.id;

ALTER TABLE ONLY public.users
    ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

CREATE TABLE public.orders (
    id bigint NOT NULL,
    user_id bigint,
    customer_type character varying(20) NOT NULL,
    vorname character varying(100) NOT NULL,
    nachname character varying(100) NOT NULL,
    company_name character varying(150),
    ust_idnr character varying(50),
    shipping_address text NOT NULL,
    total_price numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.orders_id_seq
    OWNED BY public.orders.id;

ALTER TABLE ONLY public.orders
    ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);

CREATE TABLE public.password_reset_tokens (
    id bigint NOT NULL,
    token character varying(255) NOT NULL,
    user_id bigint NOT NULL,
    expiry_date timestamp without time zone NOT NULL
);

CREATE SEQUENCE public.password_reset_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.password_reset_tokens_id_seq
    OWNED BY public.password_reset_tokens.id;

ALTER TABLE ONLY public.password_reset_tokens
    ALTER COLUMN id SET DEFAULT nextval('public.password_reset_tokens_id_seq'::regclass);

CREATE TABLE public.permissions (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(255)
);

CREATE SEQUENCE public.permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.permissions_id_seq
    OWNED BY public.permissions.id;

ALTER TABLE ONLY public.permissions
    ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);

CREATE TABLE public.role_permissions (
    role_id bigint NOT NULL,
    permission_id bigint NOT NULL
);

CREATE TABLE public.roles (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(255)
);

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.roles_id_seq
    OWNED BY public.roles.id;

ALTER TABLE ONLY public.roles
    ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);

CREATE TABLE public.user_roles (
    user_id bigint NOT NULL,
    role_id bigint NOT NULL
);

CREATE TABLE public.system_settings (
    id bigint NOT NULL,
    setting_key character varying(100) NOT NULL,
    setting_value character varying(500)
);

CREATE SEQUENCE public.system_settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.system_settings_id_seq
    OWNED BY public.system_settings.id;

ALTER TABLE ONLY public.system_settings
    ALTER COLUMN id SET DEFAULT nextval('public.system_settings_id_seq'::regclass);

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_department_code_key UNIQUE (department_code);

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.device_assignment
    ADD CONSTRAINT device_assignment_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.device
    ADD CONSTRAINT device_inventory_number_key UNIQUE (inventory_number);

ALTER TABLE ONLY public.device
    ADD CONSTRAINT device_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.device
    ADD CONSTRAINT device_serial_number_key UNIQUE (serial_number);

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_email_key UNIQUE (email);

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_employee_number_key UNIQUE (employee_number);

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.employment_contract
    ADD CONSTRAINT employment_contract_contract_number_key UNIQUE (contract_number);

ALTER TABLE ONLY public.employment_contract
    ADD CONSTRAINT employment_contract_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.license_assignment
    ADD CONSTRAINT license_assignment_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_token_key UNIQUE (token);

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_name_key UNIQUE (name);

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_sku_key UNIQUE (sku);

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_pkey PRIMARY KEY (role_id, permission_id);

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.software_license
    ADD CONSTRAINT software_license_license_number_key UNIQUE (license_number);

ALTER TABLE ONLY public.software_license
    ADD CONSTRAINT software_license_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.system_settings
    ADD CONSTRAINT system_settings_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.system_settings
    ADD CONSTRAINT system_settings_setting_key_key UNIQUE (setting_key);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uq_users_employee UNIQUE (employee_id);

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_login_key UNIQUE (login);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

CREATE INDEX idx_assignment_assigned_date
    ON public.device_assignment USING btree (assigned_date);

CREATE INDEX idx_assignment_device
    ON public.device_assignment USING btree (device_id);

CREATE INDEX idx_assignment_employee
    ON public.device_assignment USING btree (employee_id);

CREATE INDEX idx_assignment_status
    ON public.device_assignment USING btree (status);

CREATE INDEX idx_contract_employee
    ON public.employment_contract USING btree (employee_id);

CREATE INDEX idx_contract_number
    ON public.employment_contract USING btree (contract_number);

CREATE INDEX idx_department_code
    ON public.department USING btree (department_code);

CREATE INDEX idx_department_name
    ON public.department USING btree (name);

CREATE INDEX idx_device_inventory
    ON public.device USING btree (inventory_number);

CREATE INDEX idx_device_product
    ON public.device USING btree (product_id);

CREATE INDEX idx_device_serial
    ON public.device USING btree (serial_number);

CREATE INDEX idx_device_status
    ON public.device USING btree (status);

CREATE INDEX idx_employee_department
    ON public.employee USING btree (department_id);

CREATE INDEX idx_employee_last_name
    ON public.employee USING btree (last_name);

CREATE INDEX idx_employee_number
    ON public.employee USING btree (employee_number);

CREATE INDEX idx_license_assignment_assigned_date
    ON public.license_assignment USING btree (assigned_date);

CREATE INDEX idx_license_assignment_employee
    ON public.license_assignment USING btree (employee_id);

CREATE INDEX idx_license_assignment_license
    ON public.license_assignment USING btree (license_id);

CREATE INDEX idx_license_assignment_status
    ON public.license_assignment USING btree (status);

CREATE INDEX idx_license_expiration
    ON public.software_license USING btree (expiration_date);

CREATE INDEX idx_license_name
    ON public.software_license USING btree (software_name);

CREATE INDEX idx_license_number
    ON public.software_license USING btree (license_number);

CREATE INDEX idx_license_vendor
    ON public.software_license USING btree (vendor);

CREATE INDEX idx_users_employee
    ON public.users USING btree (employee_id);

CREATE TRIGGER trg_contract_updated_at
    BEFORE UPDATE ON public.employment_contract
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_department_updated_at
    BEFORE UPDATE ON public.department
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_device_assignment_status
    AFTER INSERT OR UPDATE ON public.device_assignment
    FOR EACH ROW
    EXECUTE FUNCTION public.update_device_status();

CREATE TRIGGER trg_device_assignment_updated_at
    BEFORE UPDATE ON public.device_assignment
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_device_updated_at
    BEFORE UPDATE ON public.device
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_employee_updated_at
    BEFORE UPDATE ON public.employee
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_license_assignment_updated_at
    BEFORE UPDATE ON public.license_assignment
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_license_updated_at
    BEFORE UPDATE ON public.software_license
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE ONLY public.device_assignment
    ADD CONSTRAINT fk_assignment_device
    FOREIGN KEY (device_id)
    REFERENCES public.device(id)
    ON DELETE RESTRICT;

ALTER TABLE ONLY public.device_assignment
    ADD CONSTRAINT fk_assignment_employee
    FOREIGN KEY (employee_id)
    REFERENCES public.employee(id)
    ON DELETE RESTRICT;

ALTER TABLE ONLY public.device_assignment
    ADD CONSTRAINT fk_assignment_user
    FOREIGN KEY (assigned_by_user_id)
    REFERENCES public.users(id)
    ON DELETE RESTRICT;

ALTER TABLE ONLY public.employment_contract
    ADD CONSTRAINT fk_contract_employee
    FOREIGN KEY (employee_id)
    REFERENCES public.employee(id)
    ON DELETE RESTRICT;

ALTER TABLE ONLY public.department
    ADD CONSTRAINT fk_department_manager
    FOREIGN KEY (manager_employee_id)
    REFERENCES public.employee(id)
    ON DELETE SET NULL;

ALTER TABLE ONLY public.device
    ADD CONSTRAINT fk_device_product
    FOREIGN KEY (product_id)
    REFERENCES public.products(id)
    ON DELETE RESTRICT;

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT fk_employee_department
    FOREIGN KEY (department_id)
    REFERENCES public.department(id);

ALTER TABLE ONLY public.license_assignment
    ADD CONSTRAINT fk_license_assignment_employee
    FOREIGN KEY (employee_id)
    REFERENCES public.employee(id)
    ON DELETE RESTRICT;

ALTER TABLE ONLY public.license_assignment
    ADD CONSTRAINT fk_license_assignment_license
    FOREIGN KEY (license_id)
    REFERENCES public.software_license(id)
    ON DELETE RESTRICT;

ALTER TABLE ONLY public.license_assignment
    ADD CONSTRAINT fk_license_assignment_user
    FOREIGN KEY (assigned_by_user_id)
    REFERENCES public.users(id)
    ON DELETE RESTRICT;

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_product_category
    FOREIGN KEY (category_id)
    REFERENCES public.categories(id)
    ON DELETE SET NULL;

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT fk_role_permissions_permission
    FOREIGN KEY (permission_id)
    REFERENCES public.permissions(id)
    ON DELETE CASCADE;

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT fk_role_permissions_role
    FOREIGN KEY (role_id)
    REFERENCES public.roles(id)
    ON DELETE CASCADE;

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT fk_token_user
    FOREIGN KEY (user_id)
    REFERENCES public.users(id)
    ON DELETE CASCADE;

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_users_employee
    FOREIGN KEY (employee_id)
    REFERENCES public.employee(id)
    ON DELETE RESTRICT;

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES public.users(id);

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey
    FOREIGN KEY (role_id)
    REFERENCES public.roles(id)
    ON DELETE CASCADE;

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES public.users(id)
    ON DELETE CASCADE;