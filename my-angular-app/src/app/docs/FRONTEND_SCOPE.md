ADR-024
Frontend Architecture
Dashboard is a module launcher.

Dashboard must not contain
business entity management.

Business entities are grouped
into modules.

Business Management

Asset Management

Administration

Reports

Navigation

Public Area
 ├─ Catalog
 ├─ Login
 └─ Register

User Area
 ├─ Dashboard
 └─ Profile

Business Management
 └─ Lager Management

Administration
 └─ User Management

Asset Management
 ├─ Departments
 ├─ Employees
 ├─ Contracts
 ├─ Devices
 ├─ Software Licenses
 ├─ Device Assignments
 └─ License Assignments

Authentication ✅
Profile ✅

Dashboard ⚠️

Admin Dashboard ⚠️

Lager Management ⚠️


Ziel:
Security

Administration

Business Management

Asset Management

Reporting

 src/app

core
├─ guards
├─ interceptors
├─ services

shared
├─ layout
├─ navbar
├─ cards
├─ tables
├─ forms

modules

├─ auth
│   ├─ login
│   ├─ register
│   ├─ forgot-password
│   └─ reset-password

├─ profile
│   └─ profile

├─ administration
│   ├─ dashboard
│   ├─ users
│   ├─ roles
│   └─ permissions

├─ business-management
│   ├─ dashboard
│   ├─ categories
│   ├─ products
│   └─ warehouse

├─ asset-management
│   ├─ dashboard
│   ├─ departments
│   ├─ employees
│   ├─ contracts
│   ├─ devices
│   ├─ licenses
│   ├─ device-assignments
│   └─ license-assignments

└─ reporting
