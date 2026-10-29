# Robotron Enterprise Domain Model

## Enterprise Resource Flow

Product
↓
Warehouse Stock
↓
Device
↓
Device Assignment
↓
Employee

Software License
↓
License Assignment
↓
Employee

---

# Product Domain

## Category

Represents product classification.

Examples:

- Laptops & PCs
- Network Equipment
- Servers
- Monitors

Relationship:

Category
↓
Products

---

## Product

Represents a commercial inventory item.

Examples:

- ThinkPad L14 G4
- Cisco Catalyst 24-Port
- HP EliteDisplay

Product is not a company asset.

Product is a sellable inventory item.

Attributes:

- SKU
- Name
- Manufacturer
- Description
- Price
- Stock
- Category

Lifecycle:

Catalog
↓
Warehouse
↓
Sold

or

Catalog
↓
Warehouse
↓
Device Creation

---

# Inventory Domain

## Warehouse Stock

Represents inventory quantities.

Responsibilities:

- Stock tracking
- Inventory control
- Product availability

Operations:

- Receive Stock
- Adjust Stock
- Transfer Stock
- Reduce Stock

---

# Asset Domain

## Department

Organizational structure.

Relationship:

Department
↓
Employees

---

## Employee

Represents a worker inside the company.

Relationship:

Employee
↓
Employment Contract

Employee
↓
Device Assignment

Employee
↓
License Assignment

---

## Employment Contract

Employment information.

Contains:

- Contract Type
- Salary
- Working Hours
- Contract Period

---

## Device

Represents a physical company asset.

Examples:

- Physical notebook
- Monitor
- Desktop PC
- Network Device

A Device originates from a Product.

Device ≠ Product

After Device creation:

Product stock decreases.

Device becomes an independent asset.

Attributes:

- Inventory Number
- Serial Number
- Purchase Price
- Warranty
- Status
- Location

Lifecycle:

IN_STOCK
↓
ASSIGNED
↓
RETURNED
↓
REPAIR

Alternative Paths:

ASSIGNED
↓
LOST

ASSIGNED
↓
DAMAGED

Returned Device
↓
REASSIGNMENT

Returned Device
↓
RETIRED

RETIRED
↓
DISPOSED

Rule:

A device is never converted back into a Product.

---

## Device Assignment

Represents device ownership.

Relationship:

Employee
↓
Device Assignment
↓
Device

Rules:

One active assignment per device.

Device must be returned before reassignment.

---

## Software License

Represents software assets.

Examples:

- Microsoft 365
- Windows Server
- JetBrains

Attributes:

- License Number
- Vendor
- Type
- Quantity
- Used Quantity

Rule:

used_quantity ≤ quantity

---

## License Assignment

Assigns software licenses to employees.

Lifecycle:

ACTIVE
↓
REVOKED

ACTIVE
↓
EXPIRED

ACTIVE
↓
TRANSFERRED

---

# Financial Domain

## Product Financial Data

Fields:

- purchase_price
- sale_price
- supplier

Purpose:

Inventory valuation

Profit analysis

Sales reporting

---

## Device Financial Data

Fields:

- purchase_price
- current_value
- retirement_date

Purpose:

Asset valuation

Depreciation

Cost tracking

Department reporting

---

# Enterprise Separation Principle

Products and Devices are different business concepts.

Product:

Commercial Item

Warehouse Inventory

Sellable

Catalog Object

---

Device:

Company Asset

Trackable

Assignable

Auditable

Depreciable

Internal Resource

---

# Approved Enterprise Resource Lifecycle

Category
↓
Product
↓
Warehouse Stock
↓
Device
↓
Device Assignment
↓
Employee

Software License
↓
License Assignment
↓
Employee
