# Robotron Enterprise Design Language v1

Version: 1.0

Status: Active

Owner: Robotron Enterprise Platform

Last Updated: 2026-11

---

# 1. Vision

Robotron Enterprise Platform is a centralized business platform for managing:

- Products
- Categories
- Inventory
- Assets
- Employees
- Contracts
- Device Assignments
- License Assignments
- Reporting
- Administration

The platform must provide one consistent user experience across all modules.

The user must always feel that every screen belongs to the same system.

---

# 2. Design Principles

## 2.1 Information First

The platform prioritizes information and productivity over decoration.

Rules:

- Maximum useful data.
- Minimum visual noise.
- Fast access to actions.
- Fast scanning of tables.

## 2.2 Consistency First

The same actions must look identical everywhere.

Examples:

Create Employee

Create Device

Create License

Create Product

must use:

Primary Button

and not separate custom styles.

## 2.3 Enterprise Productivity

The platform is designed for employees working 8+ hours daily.

Preferred:

- compact layouts
- quick actions
- keyboard-friendly workflows
- predictable navigation

Avoid:

- excessive whitespace
- oversized cards
- unnecessary animations

## 2.4 Workspace Mental Model

Every business module follows:

Navigation

↓

Workspace

↓

Toolbar

↓

Content

---

# 3. Global Navigation

Top navigation is shared across the entire platform.

Structure:

Dashboard

Catalog

Business Management

Asset Management

Administration

News

Support

Profile

Rules:

- Current module is visually highlighted.
- Navigation location never changes.
- User menu always remains top-right.

---

# 4. Workspace Structure

Every workspace page follows the same structure.

Layout:

Page Header

↓

Toolbar

↓

Content

↓

Optional Footer

---

# 5. Page Header Standard

Structure:

Title

Description

Primary Action

Example:

Employees

Manage employee records and company roles.

+ New Employee

Rules:

- Header height should be compact.
- Description maximum 1 line.
- Primary action aligned right.

---

# 6. Toolbar Standard

Every management module must contain a toolbar.

Layout:

Search

Filters

Export

Primary Action

Example:

Search Employees

Department Filter

Export

+ Employee

Order must stay consistent.

---

# 7. Search Standard

Search is always positioned first in the toolbar.

Placeholder examples:

Search employees...

Search devices...

Search licenses...

Search products...

Search field minimum width:

320px

Preferred width:

400px

---

# 8. Filter Standard

Filters are contextual.

Examples:

Employees:

- Department
- Position

Devices:

- Status
- Location

Licenses:

- Vendor
- License Type
- Status

---

# 9. Export Standard

All modules support export.

Supported formats:

- Excel (.xlsx)
- PDF (.pdf)
- CSV (.csv)

User Interface:

Export ▼

Never use separate export buttons.

---

# 10. Table Standard

Tables are the primary enterprise data component.

Required:

- Header
- Sorting
- Hover State
- Status Badges
- Actions Column

Recommended:

- Pagination
- Column Filters
- Sticky Header

---

# 11. Table Density

Standard:

Compact Enterprise

Row height:

48px - 56px

Avoid oversized rows.

---

# 12. Actions Column

Actions are always the last column.

Preferred:

- Edit
- Archive
- View

Future V2:

⋮ Context Menu

---

# 13. Status System

Statuses are standardized across the platform.

## Success

Color:

Green

Examples:

- ACTIVE
- AVAILABLE
- COMPLETED

## Information

Color:

Blue

Examples:

- ASSIGNED
- IN USE

## Warning

Color:

Orange

Examples:

- EXPIRING
- REPAIR
- PENDING

## Danger

Color:

Red

Examples:

- REVOKED
- RETIRED
- ARCHIVED

---

# 14. Dialog Standard

Dialogs are used for:

- Create
- Edit

operations.

Maximum dialog width:

720px

Preferred form layout:

2 columns

Example:

Department      Number

First Name      Last Name

Email           Phone

Position        Hire Date

Avoid long single-column forms whenever possible.

---

# 15. Reporting Standard

All reports follow the same structure.

Layout:

Report Header

↓

Toolbar

↓

Report Content

Toolbar must include:

- Search
- Filters
- Export

---

# 16. Catalog Experience

Catalog uses a separate visual language.

Catalog is customer-oriented.

Preferred:

- Cards
- Images
- Pricing
- Categories

Avoid forcing catalog pages into table layouts.

---

# 17. Dashboard Experience

Dashboard focuses on KPIs.

Recommended widgets:

- Devices
- Assigned Devices
- Employees
- Products
- Licenses
- Expiring Licenses

Dashboard is not only navigation.

Dashboard is a working overview.

---

# 18. Design Tokens

Primary

#2563eb

Success

#16a34a

Warning

#d97706

Danger

#dc2626

Text

#0f172a

Muted Text

#64748b

Border

#e2e8f0

Background

#f5f7fa

Card

#ffffff

---

# 19. Future Version 2

Planned enhancements:

- Enterprise Command Bar
- Universal Search
- Saved Filters
- Dark Mode
- Advanced Data Tables
- Context Menus
- Notification Center
- Activity Timeline
- Accessibility Audit

---

# Approval

Robotron Enterprise Design Language v1

Status:

Approved for implementation

Scope:

- Dashboard
- Business Management
- Asset Management
- Administration
- Reporting
- Future modules

# 20. UX Principles V1

## Data First

Useful data must be visible without scrolling.

## One Toolbar Rule

Every workspace uses the same toolbar structure.

## Maximum Two Clicks Rule

Most common action should require no more than two clicks.

## No Dead Space

Large empty areas should be avoided.

## Consistent Workflows

Create, Edit, Archive, Export behave identically across all modules.
