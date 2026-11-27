-- =====================================================================
-- V8: Enterprise-Verkaufszyklus (Bestellungen, Lagerreservierung,
--     Zahlungen, GoBD-Rechnungen, Lieferscheine, Retouren & DSGVO)
-- =====================================================================

-- 1. Erweiterung der Tabelle products um Lagerreservierung
ALTER TABLE public.products
    ADD COLUMN reserved_stock integer DEFAULT 0 NOT NULL,
    ADD CONSTRAINT chk_products_stock_integrity
        CHECK (lagerbestand >= 0 AND reserved_stock >= 0 AND reserved_stock <= lagerbestand);

-- 2. Erweiterung der Tabelle users um Kundenstammdaten und DSGVO-Anonymisierung
ALTER TABLE public.users
    ADD COLUMN customer_type character varying(20),
    ADD COLUMN vorname character varying(100),
    ADD COLUMN nachname character varying(100),
    ADD COLUMN company_name character varying(150),
    ADD COLUMN ust_idnr character varying(50),
    ADD COLUMN default_shipping_address text,
    ADD COLUMN anonymized_at timestamp without time zone;

-- 3. Erweiterung der bestehenden Tabelle orders um Status und Idempotenz
ALTER TABLE public.orders
    ADD COLUMN order_number character varying(32) NOT NULL,
    ADD COLUMN status character varying(30) DEFAULT 'PENDING_PAYMENT' NOT NULL,
    ADD COLUMN idempotency_key character varying(64) NOT NULL,
    ADD COLUMN payment_expires_at timestamp without time zone,
    ADD COLUMN updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ADD CONSTRAINT uq_orders_order_number UNIQUE (order_number),
    ADD CONSTRAINT uq_orders_idempotency_key UNIQUE (idempotency_key);

CREATE INDEX idx_orders_user_id ON public.orders USING btree (user_id);
CREATE INDEX idx_orders_status ON public.orders USING btree (status);

CREATE TRIGGER trg_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Bestellpositionen (Order Items) mit historischer Preisfixierung
CREATE TABLE public.order_items (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    product_id bigint NOT NULL,
    product_sku_snapshot character varying(100) NOT NULL,
    product_name_snapshot character varying(255) NOT NULL,
    quantity integer NOT NULL,
    unit_price_net numeric(10,2) NOT NULL,
    vat_rate numeric(5,2) DEFAULT 19.00 NOT NULL,
    unit_price_gross numeric(10,2) NOT NULL,
    CONSTRAINT order_items_pkey PRIMARY KEY (id),
    CONSTRAINT chk_order_items_quantity CHECK (quantity > 0),
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id)
        REFERENCES public.orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id)
        REFERENCES public.products(id) ON DELETE RESTRICT
);

CREATE SEQUENCE public.order_items_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;
ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);
CREATE INDEX idx_order_items_order_id ON public.order_items USING btree (order_id);

-- 5. Zahlungstransaktionen und Erstattungen (Payments)
CREATE TABLE public.payments (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    payment_type character varying(20) NOT NULL,
    amount numeric(10,2) NOT NULL,
    payment_method character varying(30) NOT NULL,
    status character varying(30) NOT NULL,
    idempotency_key character varying(64) NOT NULL,
    external_transaction_id character varying(150),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT payments_pkey PRIMARY KEY (id),
    CONSTRAINT uq_payments_idempotency_key UNIQUE (idempotency_key),
    CONSTRAINT chk_payments_amount CHECK (amount > 0),
    CONSTRAINT fk_payments_order FOREIGN KEY (order_id)
        REFERENCES public.orders(id) ON DELETE RESTRICT
);

CREATE SEQUENCE public.payments_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;
ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);
CREATE INDEX idx_payments_order_id ON public.payments USING btree (order_id);

-- 6. GoBD-konforme Rechnungen und Gutschriften (Invoices & Credit Notes)
CREATE TABLE public.invoices (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    invoice_number character varying(32) NOT NULL,
    invoice_type character varying(20) NOT NULL,
    total_net numeric(10,2) NOT NULL,
    total_vat numeric(10,2) NOT NULL,
    total_gross numeric(10,2) NOT NULL,
    issued_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT invoices_pkey PRIMARY KEY (id),
    CONSTRAINT uq_invoices_invoice_number UNIQUE (invoice_number),
    CONSTRAINT fk_invoices_order FOREIGN KEY (order_id)
        REFERENCES public.orders(id) ON DELETE RESTRICT
);

CREATE SEQUENCE public.invoices_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER SEQUENCE public.invoices_id_seq OWNED BY public.invoices.id;
ALTER TABLE ONLY public.invoices ALTER COLUMN id SET DEFAULT nextval('public.invoices_id_seq'::regclass);
CREATE INDEX idx_invoices_order_id ON public.invoices USING btree (order_id);

-- 7. Warenausgang und Lieferscheine (Delivery Notes)
CREATE TABLE public.delivery_notes (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    delivery_number character varying(32) NOT NULL,
    shipped_by_user_id bigint NOT NULL,
    tracking_number character varying(100),
    shipped_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT delivery_notes_pkey PRIMARY KEY (id),
    CONSTRAINT uq_delivery_notes_number UNIQUE (delivery_number),
    CONSTRAINT fk_delivery_notes_order FOREIGN KEY (order_id)
        REFERENCES public.orders(id) ON DELETE RESTRICT,
    CONSTRAINT fk_delivery_notes_user FOREIGN KEY (shipped_by_user_id)
        REFERENCES public.users(id) ON DELETE RESTRICT
);

CREATE SEQUENCE public.delivery_notes_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER SEQUENCE public.delivery_notes_id_seq OWNED BY public.delivery_notes.id;
ALTER TABLE ONLY public.delivery_notes ALTER COLUMN id SET DEFAULT nextval('public.delivery_notes_id_seq'::regclass);

-- 8. Retourenmanagement (Returns & Return Items)
CREATE TABLE public.returns (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    return_number character varying(32) NOT NULL,
    status character varying(30) DEFAULT 'REQUESTED' NOT NULL,
    reason text,
    idempotency_key character varying(64) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT returns_pkey PRIMARY KEY (id),
    CONSTRAINT uq_returns_number UNIQUE (return_number),
    CONSTRAINT uq_returns_idempotency_key UNIQUE (idempotency_key),
    CONSTRAINT fk_returns_order FOREIGN KEY (order_id)
        REFERENCES public.orders(id) ON DELETE RESTRICT
);

CREATE SEQUENCE public.returns_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER SEQUENCE public.returns_id_seq OWNED BY public.returns.id;
ALTER TABLE ONLY public.returns ALTER COLUMN id SET DEFAULT nextval('public.returns_id_seq'::regclass);

CREATE TRIGGER trg_returns_updated_at
    BEFORE UPDATE ON public.returns
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.return_items (
    id bigint NOT NULL,
    return_id bigint NOT NULL,
    order_item_id bigint NOT NULL,
    quantity integer NOT NULL,
    restockable boolean DEFAULT true NOT NULL,
    CONSTRAINT return_items_pkey PRIMARY KEY (id),
    CONSTRAINT chk_return_items_quantity CHECK (quantity > 0),
    CONSTRAINT fk_return_items_return FOREIGN KEY (return_id)
        REFERENCES public.returns(id) ON DELETE CASCADE,
    CONSTRAINT fk_return_items_order_item FOREIGN KEY (order_item_id)
        REFERENCES public.order_items(id) ON DELETE RESTRICT
);

CREATE SEQUENCE public.return_items_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER SEQUENCE public.return_items_id_seq OWNED BY public.return_items.id;
ALTER TABLE ONLY public.return_items ALTER COLUMN id SET DEFAULT nextval('public.return_items_id_seq'::regclass);

-- 9. Zusaetzliche Berechtigungen fuer Versand, Rechnungen und Retouren
INSERT INTO public.permissions (name, description)
VALUES
    ('ORDER_SHIP', 'Warenausgang buchen und Lieferschein erstellen'),
    ('INVOICE_READ', 'Rechnungen und Gutschriften einsehen'),
    ('RETURN_CREATE', 'Retoure anmelden'),
    ('RETURN_PROCESS', 'Retouren pruefen und Rueckerstattung freigeben')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r
JOIN public.permissions p ON p.name IN ('INVOICE_READ', 'RETURN_CREATE')
WHERE r.name = 'ROLE_CUSTOMER'
ON CONFLICT DO NOTHING;

INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r
JOIN public.permissions p ON p.name IN ('ORDER_SHIP', 'INVOICE_READ', 'RETURN_PROCESS')
WHERE r.name IN ('ROLE_MANAGER', 'ROLE_DIRECTOR')
ON CONFLICT DO NOTHING;