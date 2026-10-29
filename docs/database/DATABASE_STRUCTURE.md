\# Database Structure



\## Database Technology



```text

PostgreSQL

Flyway

Hibernate Validation

```



\---



\## Database Architecture Principle



```text

Business Domain

↓

Database

↓

Backend

↓

Frontend

```



Database follows the business domain model.



\---



\# Core Domains



\## Public Domain



```text

Catalog

About

News

Support

```



\---



\## Sales Domain



```text

Categories

Products

Orders

```



\---



\## Inventory Domain



```text

Warehouse

Stock Operations

Inventory Control

```



\---



\## Asset Domain



```text

Departments

Employees

Employment Contracts



Devices

Software Licenses



Device Assignments

License Assignments

```



\---



\## Financial Domain



```text

Inventory Valuation

Asset Valuation

Depreciation

Financial Reporting

```



\---



\## Administration Domain



```text

Users

Roles

Permissions

System Settings

Password Reset Tokens

```



\---



\# Tables



\## Categories



```text

categories

```



Purpose:



```text

Product classification.

```



\---



\## Products



```text

products

```



Purpose:



```text

Commercial catalog items.



Products can be sold

or used to create company assets.

```



Financial Data:



```text

price

```



Planned:



```text

purchase\_price

sale\_price

supplier

```



\---



\## Orders



```text

orders

```



Purpose:



```text

Customer purchases.

```



\---



\## Departments



```text

department

```



Purpose:



```text

Organizational structure.

```



\---



\## Employees



```text

employee

```



Purpose:



```text

Company personnel records.

```



\---



\## Employment Contracts



```text

employment\_contract

```



Purpose:



```text

Employment information.

```



\---



\## Devices



```text

device

```



Purpose:



```text

Physical company assets.

```



Important:



```text

A Device is not a Product.



Products represent catalog items.



Devices represent tracked physical assets.

```



Device Status Lifecycle:



```text

IN\_STOCK



ASSIGNED



RETURNED



REPAIR



RETIRED



DISPOSED

```



\---



\## Software Licenses



```text

software\_license

```



Purpose:



```text

Software asset management.

```



\---



\## Device Assignments



```text

device\_assignment

```



Purpose:



```text

Device allocation history.

```



Business Rules:



```text

One active assignment per device.

```



\---



\## License Assignments



```text

license\_assignment

```



Purpose:



```text

Software allocation history.

```



\---



\## Users



```text

users

```



Purpose:



```text

Authentication

Authorization

```



\---



\## Roles



```text

roles

```



Purpose:



```text

Access control.

```



\---



\## Permissions



```text

permissions

```



Purpose:



```text

Fine-grained authorization.

```



\---



\## User Roles



```text

user\_roles

```



Purpose:



```text

User ↔ Role mapping

```



\---



\## Role Permissions



```text

role\_permissions

```



Purpose:



```text

Role ↔ Permission mapping

```



\---



\## System Settings



```text

system\_settings

```



Purpose:



```text

Application configuration.

```



\---



\## Password Reset Tokens



```text

password\_reset\_tokens

```



Purpose:



```text

Password recovery.

```



\---



\# Product and Device Separation



Products and Devices are separate lifecycle entities.



Product:



```text

Commercial catalog item.

```



Examples:



```text

ThinkPad L14 G4



Cisco Catalyst 24-Port



HP Monitor

```



Device:



```text

Physical asset instance.

```



Examples:



```text

INV-000001



INV-000002



INV-000003

```



Rules:



```text

Product stock may create Devices.



Creating a Device reduces stock quantity.



Devices never become Products again.



Returned Devices remain Assets.



Disposed Devices remain archived.

```



\---



\# Audit Requirements



Core Entities:



```text

Department



Employee



EmploymentContract



Device



SoftwareLicense

```



must contain:



```text

created\_at



updated\_at



active

```



\---



\# Flyway



Database schema management:



```text

V1\_\_initial\_enterprise\_schema.sql

```



Rule:



```text

Database changes are allowed only through migrations.

```

