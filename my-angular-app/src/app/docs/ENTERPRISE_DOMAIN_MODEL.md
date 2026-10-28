# Robotron Enterprise Platform

## Domain Architecture v2

---

# PUBLIC DOMAIN

Public pages and customer-facing functionality.

Modules:

- Catalog
- About
- News
- Support

---

# SALES DOMAIN

Product sales and customer ordering.

Modules:

- Product Catalog
- Categories
- Orders
- Customers

Entities:

- Category
- Product
- Order

---

# INVENTORY DOMAIN

Warehouse and stock management.

Modules:

- Warehouse
- Stock Management
- Inventory Operations

Entities:

- WarehouseStock
- Product

Purpose:

Tracks products available for sale
or available for conversion into company assets.

---

# ASSET DOMAIN

Company-owned resources.

Modules:

- Employees
- Departments
- Devices
- Software Licenses
- Contracts

Entities:

- Department
- Employee
- EmploymentContract
- Device
- SoftwareLicense
- DeviceAssignment
- LicenseAssignment

Important:

Devices are not products.

A Product becomes a Device when a
physical unit is assigned to company asset tracking.

A Device must never return to the sales catalog.

Device lifecycle:

IN_STOCK
→ ASSIGNED
→ RETURNED
→ REPAIR
→ RETIRED
→ DISPOSED

---

# FINANCE DOMAIN

Financial tracking and analysis.

Modules:

- Asset Valuation
- Cost Centers
- Budget Tracking
- Depreciation
- Financial Reports

Product Data:

- purchasePrice
- salePrice
- supplier

Device Data:

- purchasePrice
- currentValue
- depreciationRate
- retirementDate

Reports:

- Inventory Value
- Asset Value
- Department Costs
- Device Depreciation
- Disposed Assets

---

# ADMIN DOMAIN

System administration.

Modules:

- Users
- Roles
- Permissions
- System Settings

---

# GOVERNANCE DOMAIN

Audit and compliance.

Modules:

- Audit Log
- Reporting
- Analytics

---

# Enterprise Lifecycle

Category
→ Product
→ Warehouse Stock
→ Device
→ Device Assignment
→ Employee

SoftwareLicense
→ License Assignment
→ Employee