\# Robotron Enterprise IT Resource \& Asset Management Platform



\## Vision



Robotron is a unified enterprise platform for:



\- Product Catalog Management

\- Warehouse Management

\- Asset Management

\- Employee Management

\- Software License Management

\- Contract Management

\- Administration

\- Reporting and Analytics



The platform combines commercial inventory processes and internal company asset management within one system.



\---



\# Architecture Principle



Development always follows:



Business Domain

↓

Database

↓

Backend

↓

Frontend



The business domain is the source of truth.



Forbidden:



Frontend-driven architecture



Backend-driven database design



Database-first design without business requirements



\---



\# Technology Stack



\## Backend



\- Java 21

\- Spring Boot

\- Spring Security

\- JWT Authentication

\- Flyway

\- PostgreSQL

\- OpenAPI / Swagger



\## Frontend



\- Angular

\- TypeScript

\- Standalone Components

\- Angular Router



\## Infrastructure



\- Git

\- GitHub

\- GitHub Actions

\- Flyway Migration Management



\---



\# Domain Architecture



\## PUBLIC DOMAIN



Public website and catalog.



Modules:



\- Homepage

\- Catalog

\- About

\- News

\- Support



\---



\## SALES DOMAIN



Commercial product management.



Modules:



\- Product Catalog

\- Categories

\- Orders

\- Customer Management



Core Entities:



\- Product

\- Category

\- Order



\---



\## INVENTORY DOMAIN



Physical inventory management.



Modules:



\- Warehouse

\- Inventory Operations

\- Goods Receipt

\- Stock Management



Core Entities:



\- Product

\- Warehouse Stock



\---



\## ASSET DOMAIN



Internal company assets.



Modules:



\- Departments

\- Employees

\- Employment Contracts

\- Devices

\- Software Licenses

\- Asset Assignments



Core Entities:



\- Department

\- Employee

\- EmploymentContract

\- Device

\- SoftwareLicense

\- DeviceAssignment

\- LicenseAssignment



\---



\## FINANCIAL DOMAIN



Asset and inventory valuation.



Modules:



\- Asset Valuation

\- Inventory Valuation

\- Depreciation

\- Cost Centers

\- Financial Reports



Purpose:



Track the financial value of:



\- Products

\- Inventory

\- Devices

\- Company Assets



\---



\## ADMIN DOMAIN



Platform administration.



Modules:



\- Users

\- Roles

\- Permissions

\- System Settings



\---



\## GOVERNANCE DOMAIN



Compliance and reporting.



Modules:



\- Audit Logging

\- Reporting

\- Analytics



\---



\# Security Model



Roles:



ROLE\_CUSTOMER



ROLE\_MANAGER



ROLE\_ADMIN



ROLE\_DIRECTOR



Authorization hierarchy:



Permission

↓

Role

↓

Backend Security

↓

Frontend Visibility



\---



\# Master Data Standard



Each master data entity must support:



Create



Read



Update



Archive



Restore



Permanent Delete



Entities:



\- Category

\- Product

\- Department

\- Employee

\- EmploymentContract

\- Device

\- SoftwareLicense



\---



\# Business Process Entities



Business entities expose actions instead of generic updates.



DeviceAssignment



\- Return

\- Lost

\- Damaged



LicenseAssignment



\- Revoke

\- Transfer

\- Expire



\---



\# User Architecture



Employee

↓

User

↓

Roles

↓

Permissions



Relationship:



Employee 1 → 0..1 User



A User must belong to exactly one Employee.



\---



\# Audit Standard



Every core entity contains:



\- created\_at

\- updated\_at

\- active



Purpose:



\- Reporting

\- Auditing

\- Compliance

\- History Tracking



\---



\# Reporting Targets



Inventory Value



Asset Value



Department Asset Value



Device Lifecycle Reports



License Utilization



Employee Asset Reports



Disposed Asset Reports



Financial Analysis

