# Enterprise IT Resource & Asset Management Platform

# Architecture Constitution v2.0

---

# ADR-001

## Source of Truth Principle

```text
Business Domain
↓
Database
↓
Backend
↓
Frontend
```

Rules:

```text
1. Domain Model defines data structure.
2. Database follows Domain Model.
3. Backend follows Database.
4. Frontend follows Backend API.
```

Forbidden:

```text
Backend-driven database design.

Frontend-driven backend design.
```

---

# ADR-002

## Entity Lifecycle Standard

All master data entities support:

```text
Create
Read
Update

Archive
Restore
Permanent Delete
```

Entities:

```text
Product
Category
Department
Employee
EmploymentContract
Device
SoftwareLicense
```

---

# ADR-003

## One Platform Principle

```text
Asset Management
+
Product Catalog
+
Business Management
+
Financial Management
```

are parts of one platform.

Not separate applications.

---

# ADR-004

## ROLE_MANAGER

Business Management

Modules:

```text
Products
Categories
Warehouse
Orders
Reports
Import
Export
```

---

# ADR-005

## ROLE_ADMIN

IT Administration

Modules:

```text
Users
Roles
Permissions

Departments
Employees
Contracts

Devices
Licenses
Assignments
```

---

# ADR-006

## Employee ↔ User Relationship

```text
Employee 1 → 0..1 User
```

Meaning:

```text
An employee may have one system account.

A system account must belong
to exactly one employee.
```

Target Architecture:

```text
Employee
↓
User
↓
Roles
↓
Permissions
```

---

# ADR-007

## Employee v1.0

```text
employee

id
employee_number

first_name
last_name

email
phone

department_id
position

hire_date
termination_date

active

created_at
updated_at
```

Status:

```text
Completed
```

---

# ADR-008

## EmploymentContract v1.0

```text
employment_contract

id

employee_id

contract_number

contract_type

start_date
end_date

weekly_hours

salary

active

created_at
updated_at
```

Status:

```text
Completed
```

---

# ADR-009

## Device v1.0

```text
device

id

product_id

inventory_number
serial_number

manufacturer_asset_tag

purchase_date
purchase_price

warranty_until

status

location

notes

active

created_at
updated_at
```

Status:

```text
Completed
```

---

# ADR-010

## SoftwareLicense v1.0

```text
software_license

id

license_number

software_name

vendor

license_key

license_type

quantity
used_quantity

purchase_date

expiration_date

status

notes

active

created_at
updated_at
```

Status:

```text
Completed
```

---

# ADR-011

## DeviceAssignment v1.0

```text
device_assignment

id

employee_id
device_id

assigned_by_user_id

assigned_date

expected_return_date

returned_date

status

notes

created_at
updated_at
```

Status:

```text
Completed
```

---

# ADR-012

## LicenseAssignment v1.0

```text
license_assignment

id

employee_id

license_id

assigned_by_user_id

assigned_date

expiration_date

revoked_date

status

notes

created_at
updated_at
```

Status:

```text
Completed
```

---

# ADR-013

## Department v1.0

```text
department

id

department_code

name

description

manager_employee_id

active

created_at
updated_at
```

Status:

```text
Completed
```

---

# ADR-014

## Asset Management Database v1.0

Status:

```text
Approved
```

Tables:

```text
department
employee
employment_contract

device
software_license

device_assignment
license_assignment
```

Relations:

```text
users.employee_id
```

Database Features:

```text
updated_at trigger

device status synchronization
```

Result:

```text
Database layer approved.
```

---

# ADR-015

## Department Backend v1.0

Status:

```text
Completed
```

---

# ADR-016

## Employee Backend v1.0

Status:

```text
Completed
```

---

# ADR-017

## Business Process Endpoints

### Master Data

```text
Department
Employee
EmploymentContract
Device
SoftwareLicense
Product
Category
```

use:

```text
Create
Read
Update

Archive
Restore
Permanent Delete
```

---

### Business Process Entities

```text
DeviceAssignment
LicenseAssignment
```

must expose business actions.

Examples:

```text
DeviceAssignment

return
cancel
```

```text
LicenseAssignment

revoke
transfer
expire
```

Business actions are preferred over generic updates.

---

# ADR-018

## Backend Module Standard

Every master data module must contain:

```text
Database Table

Entity

Repository

DTO

Mapper

Service

Controller

Swagger Documentation
```

Implementation order:

```text
Business Domain
↓
Database
↓
Entity
↓
Repository
↓
DTO
↓
Mapper
↓
Service
↓
Controller
↓
Swagger
```

---

# ADR-019

## Hibernate Validation Rule

Before a module is marked as completed:

```properties
spring.jpa.hibernate.ddl-auto=validate
```

must start successfully.

Success Criteria:

```text
Entity
⇔
Database

100% synchronized
```

Only after successful validation:

```text
Module Status = Completed
```

---

# ADR-020

## Assignment Domain Rules

### DeviceAssignment

Lifecycle:

```text
ACTIVE
↓
RETURNED

ACTIVE
↓
LOST

ACTIVE
↓
DAMAGED
```

Rules:

```text
One active device assignment per device.

A device assigned to one employee
cannot be assigned to another employee
until returned.
```

---

### LicenseAssignment

Lifecycle:

```text
ACTIVE
↓
REVOKED

ACTIVE
↓
EXPIRED

ACTIVE
↓
TRANSFERRED
```

Rules:

```text
License quantity must never be exceeded.

used_quantity <= quantity

License assignment creation increases
used_quantity.

License revocation decreases
used_quantity.
```

---

# ADR-021

## Permissions Architecture

Source of Truth:

```text
Business Capability
↓
Permission
↓
Role
↓
Backend Security
↓
Frontend Visibility
```

Permissions are defined before:

```text
Role Mapping
Security Configuration
Frontend Navigation
```

Examples:

```text
DEVICE_CREATE
DEVICE_EDIT
DEVICE_ARCHIVE

LICENSE_CREATE
LICENSE_EDIT
LICENSE_ARCHIVE

ASSIGNMENT_CREATE
ASSIGNMENT_RETURN

LICENSE_ASSIGNMENT_CREATE
LICENSE_ASSIGNMENT_REVOKE
```

---

# ADR-022

## Audit Readiness

All core entities must contain:

```text
created_at
updated_at
active
```

Entities:

```text
Department
Employee
EmploymentContract
Device
SoftwareLicense
```

Purpose:

```text
Reporting
Audit
Compliance
History Tracking
```

---

# ADR-023

## Current Project Status

Phase 1

```text
Security ✅
```

Phase 2

```text
Products ✅
Categories ✅
```

Phase 3

```text
Architecture ✅
```

Phase 4

```text
Asset Management Database ✅
```

Phase 5

```text
Department ✅
Employee ✅
EmploymentContract ✅

Device ✅
DeviceAssignment ✅

SoftwareLicense ✅
LicenseAssignment ✅

Asset Management Backend ✅
```

Next Planned Phases:

```text
Reporting
Audit
Dashboard
Financial Management
Advanced Assignment Workflows
```

---

# ADR-024

## Swagger Documentation Standard

Every controller must define:

```text
@Tag
```

Every endpoint must define:

```text
@Operation
```

Naming format:

```text
< Entity > Management

Department Management
Employee Management
Contract Management
Device Management
Software License Management

Device Assignment Management
License Assignment Management
```

---

# ADR-025

## Inventory and Asset Separation

Status:

```text
Accepted
```

Decision:

```text
Products and Devices are separated lifecycle entities.
```

Product Purpose:

```text
Products represent commercial items
available in warehouse and catalog.
```

Device Purpose:

```text
Devices represent physical company assets.
```

Product Lifecycle:

```text
Catalog
↓
Warehouse
↓
Sale
```

or

```text
Catalog
↓
Warehouse
↓
Device Creation
```

Device Lifecycle:

```text
IN_STOCK
↓
ASSIGNED
↓
RETURNED
↓
REPAIR
```

or

```text
IN_STOCK
↓
ASSIGNED
↓
RETURNED
↓
RETIRED
↓
DISPOSED
```

Rules:

```text
Creating a Device decreases Product stock.

A Device never becomes a Product again.

Returned Devices remain company assets.

Disposed Devices remain archived
for reporting and audit purposes.
```

---

# ADR-026

## Finance Readiness

Status:

```text
Accepted
```

Purpose:

```text
Every inventory and asset object
must be financially traceable.
```

Product Financial Data:

```text
purchase_price

sale_price

supplier
```

Device Financial Data:

```text
purchase_price

current_value

depreciation_rate

retirement_date
```

Financial Reporting Targets:

```text
Inventory Value

Asset Value

Department Asset Value

License Costs

Disposed Asset Value

Depreciation Reports
```

---

# Enterprise Platform Domains

## PUBLIC DOMAIN

```text
Catalog

About

News

Support
```

---

## SALES DOMAIN

```text
Products

Categories

Orders

Customers
```

---

## INVENTORY DOMAIN

```text
Warehouse

Stock Operations

Goods Receipt

Inventory Control

Stock Movement
```

---

## ASSET DOMAIN

```text
Departments

Employees

Employment Contracts

Devices

Software Licenses

Device Assignments

License Assignments
```

---

## FINANCIAL DOMAIN

```text
Inventory Valuation

Asset Valuation

Depreciation

Cost Centers

Budget Tracking

Financial Reports
```

---

## ADMIN DOMAIN

```text
Users

Roles

Permissions

System Settings
```

---

## GOVERNANCE DOMAIN

```text
Audit Log

Reporting

Analytics

Compliance
```

---

# Asset Management Domain

```text
Department
↓
Employee
↓
EmploymentContract

Employee
↓
User

Product
↓
Warehouse Stock
↓
Device
↓
DeviceAssignment

SoftwareLicense
↓
LicenseAssignment
```

Status:

```text
Implemented
```

---

# Architecture Principle

Never develop:

```text
Frontend first
Backend second
Database third
```

Always develop:

```text
Business Domain
↓
Database
↓
Backend
↓
Frontend
```

This rule is mandatory for the entire platform.