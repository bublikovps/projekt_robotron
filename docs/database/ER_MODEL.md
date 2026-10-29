# Entity Relationship Model

## High Level Overview

```text
Category
↓
Product
↓
Device
↓
DeviceAssignment
↓
Employee
```

and

```text
SoftwareLicense
↓
LicenseAssignment
↓
Employee
```

---

# Administration Domain

## Users and Security

```text
User
↓
Role
↓
Permission
```

Relations:

```text
User
↔
Role

many-to-many
```

```text
Role
↔
Permission

many-to-many
```

---

## Employee and User

```text
Employee
↓
User
```

Relationship:

```text
Employee 1
↓
0..1 User
```

Rule:

```text
A user account must belong
to exactly one employee.
```

---

# Organizational Domain

## Department

```text
Department
↓
Employee
```

Relationship:

```text
Department 1
↓
N Employees
```

---

## Department Manager

```text
Employee
↓
Department.manager_employee_id
```

Relationship:

```text
Employee 1
↓
0..N Departments
```

---

# HR Domain

## Employee

```text
Employee
↓
EmploymentContract
```

Relationship:

```text
Employee 1
↓
N Employment Contracts
```

---

# Product Domain

## Categories

```text
Category
↓
Product
```

Relationship:

```text
Category 1
↓
N Products
```

---

## Product

Represents:

```text
Commercial catalog item.
```

Examples:

```text
ThinkPad L14

Cisco Catalyst

HP Monitor
```

---

# Asset Domain

## Product to Device

```text
Product
↓
Device
```

Relationship:

```text
Product 1
↓
N Devices
```

Meaning:

```text
A Product defines a model.

A Device defines a physical instance.
```

Example:

```text
Product:
ThinkPad L14 G4

Device:
INV-000123
SN-PF123456
```

---

## Device Assignment

```text
Employee
↓
DeviceAssignment
↓
Device
```

Relationship:

```text
Employee 1
↓
N Device Assignments
```

```text
Device 1
↓
N Device Assignments
```

Rule:

```text
Only one ACTIVE assignment
per Device.
```

---

## Software License

```text
SoftwareLicense
↓
LicenseAssignment
↓
Employee
```

Relationship:

```text
SoftwareLicense 1
↓
N License Assignments
```

```text
Employee 1
↓
N License Assignments
```

Rule:

```text
used_quantity <= quantity
```

---

# Assignment Lifecycles

## Device Assignment

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

---

## License Assignment

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

---

# Inventory and Asset Lifecycle

## Product Lifecycle

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

---

## Device Lifecycle

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
RETURNED
↓
RETIRED
↓
DISPOSED
```

---

# Financial Tracking

## Product

Planned Financial Attributes:

```text
purchase_price

sale_price

supplier
```

---

## Device

Planned Financial Attributes:

```text
purchase_price

current_value

retirement_date
```

---

# Future Financial Relations

```text
Department
↓
Assets
↓
Asset Value
```

Reporting Targets:

```text
Inventory Value

Asset Value

Asset Value by Department

Disposed Asset Value

Depreciation Reports
```