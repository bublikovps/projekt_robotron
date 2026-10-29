\# Backend Architecture



\## Technology Stack



```text

Java 21

Spring Boot

Spring Security

JWT Authentication

Hibernate / JPA

Flyway

PostgreSQL

Swagger OpenAPI

```



\---



\## Architecture Principle



```text

Business Domain

↓

Database

↓

Backend

↓

Frontend

```



The Business Domain is the source of truth.



Database schema follows business rules.



Backend implementation follows the database schema.



Frontend implementation follows backend contracts.



\---



\## Backend Layers



```text

Controller

↓

Service

↓

Repository

↓

Database

```



Every business module follows:



```text

Entity

Repository

DTO

Mapper

Service

Controller

Swagger Documentation

```



\---



\## Security Architecture



\### Authentication



```text

JWT Token

```



\### Authorization



```text

Role-Based Access Control (RBAC)

```



\### Roles



```text

ROLE\_CUSTOMER

ROLE\_MANAGER

ROLE\_ADMIN

ROLE\_DIRECTOR

```



\---



\## Business Domains



\### Public Domain



```text

Catalog

About

News

Support

```



\### Sales Domain



```text

Products

Categories

Orders

Customers

```



\### Inventory Domain



```text

Warehouse

Stock Operations

Inventory Control

```



\### Asset Domain



```text

Departments



Employees



Employment Contracts



Devices



Software Licenses



Device Assignments



License Assignments

```



\### Financial Domain



```text

Inventory Valuation



Asset Valuation



Depreciation



Cost Centers



Budget Tracking



Financial Reports

```



\### Administration Domain



```text

Users



Roles



Permissions



System Settings

```



\---



\## Product and Device Separation



Products and Devices are different lifecycle entities.



\### Product



```text

Commercial catalog item

```



Examples:



```text

ThinkPad L14 G4

Cisco Catalyst Switch

HP Monitor

```



\### Device



```text

Physical company asset

```



Examples:



```text

INV-00001

INV-00002

INV-00003

```



\### Rules



```text

Products can create Devices.



Creating a Device reduces available stock.



Devices are never converted back into Products.



Returned Devices remain Assets.



Disposed Devices are archived.

```



\---



\## Inventory Lifecycle



```text

Product

↓

Warehouse

↓

Sale



or



Warehouse

↓

Device Creation

```



\---



\## Asset Lifecycle



```text

IN\_STOCK

↓

ASSIGNED

↓

RETURNED

↓

REPAIR



or



IN\_STOCK

↓

RETIRED

↓

DISPOSED

```



\---



\## Financial Readiness



\### Product Financial Data



```text

purchase\_price



sale\_price



supplier

```



\### Device Financial Data



```text

purchase\_price



current\_value



retirement\_date

```



\### Reporting Targets



```text

Inventory Value



Asset Value



Department Asset Value



Disposed Asset Value



Depreciation Reports

```



\---



\## Current Architecture Status



Completed:



```text

Authentication

Authorization



Products

Categories



Departments

Employees

Employment Contracts



Devices

Device Assignments



Software Licenses

License Assignments

```



Planned:



```text

Reporting



Audit Logging



Financial Reporting



Advanced Assignment Workflows



Analytics

```

