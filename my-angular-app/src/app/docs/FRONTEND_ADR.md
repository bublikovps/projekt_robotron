# Enterprise IT Resource & Asset Management Platform

# Frontend Architecture Constitution v1.0

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
1. Business Domain defines data structure.
2. Database follows Business Domain.
3. Backend follows Database.
4. Frontend follows Backend API.
```

Forbidden:

```text
Frontend-driven backend design.
Frontend inventing entities.
Frontend inventing DTOs.
Frontend inventing business rules.
```

---

# ADR-002

## Frontend Structure

```text
src/app

core
shared
features
```

---

# ADR-003

## Core Layer

```text
core

guards
interceptors
models
services
```

Rule:

```text
Core never depends on Features.
```

---

# ADR-004

## Shared Layer

```text
shared

components
directives
pipes
utils
```

Rule:

```text
Shared contains no business logic.
```

---

# ADR-005

## Features Layer

```text
features

auth
administration
business-management
asset-management
dashboard
profile
```

Rule:

```text
Feature modules must not directly depend on each other.
```

---

# ADR-006

## Routing Architecture

```text
auth.routes.ts

administration.routes.ts

business-management.routes.ts

asset-management.routes.ts
```

Main routing file:

```text
app.routes.ts
```

Rule:

```text
Business routes are defined in feature route files.

app.routes.ts acts only as route aggregator.
```

---

# ADR-007

## Models

Location:

```text
core/models
```

Current models:

```text
AuthResponse

LoginRequest

RegisterRequest

ChangePasswordRequest

ResetPasswordRequest

UserProfileResponse

ApiMessageResponse
```

Rule:

```text
DTOs are never declared inside services.

DTOs are never declared inside components.
```

---

# ADR-008

## Authentication

Uses:

```text
JWT

AuthService

Session Storage
```

Stored values:

```text
jwtToken

currentUser

userRole

passwordChangeRequired
```

---

# ADR-009

## Password Policy

Flow:

```text
Temporary Password
↓
Login
↓
Profile
↓
Password Change
↓
Activated Account
```

Guard:

```text
passwordChangeGuard
```

---

# ADR-010

## Security

Roles:

```text
ROLE_CUSTOMER

ROLE_MANAGER

ROLE_ADMIN

ROLE_DIRECTOR
```

Current Guards:

```text
roleGuard

passwordChangeGuard
```

Target Security Model:

```text
Capability
↓
Permission
↓
Role
↓
Backend Security
↓
Frontend Visibility
```
Current Implementation:

```text
AuthResponse returns:

token
login
role
---

# ADR-011

## Permission Matrix

ROLE_CUSTOMER

```text
PRODUCT_READ
CATEGORY_READ

PROFILE_READ
PROFILE_EDIT

PASSWORD_CHANGE
```

ROLE_MANAGER

```text
PRODUCT_*
CATEGORY_*

WAREHOUSE_*

ORDER_*

PRODUCT_IMPORT
PRODUCT_EXPORT

REPORT_VIEW
```

ROLE_ADMIN

```text
USER_*

ROLE_*

DEPARTMENT_*
EMPLOYEE_*
CONTRACT_*

DEVICE_*
LICENSE_*

ASSIGNMENT_*
LICENSE_ASSIGNMENT_*
```

ROLE_DIRECTOR

```text
ALL PERMISSIONS
```

Includes:

```text
System Settings
Audit
Reports
Asset Management
User Management
Business Management
```

---

# ADR-012

## Asset Management Permissions

Departments

```text
DEPARTMENT_READ
DEPARTMENT_CREATE
DEPARTMENT_EDIT
DEPARTMENT_ARCHIVE
DEPARTMENT_RESTORE
DEPARTMENT_DELETE
```

Employees

```text
EMPLOYEE_READ
EMPLOYEE_CREATE
EMPLOYEE_EDIT
EMPLOYEE_ARCHIVE
EMPLOYEE_RESTORE
EMPLOYEE_DELETE
```

Contracts

```text
CONTRACT_READ
CONTRACT_CREATE
CONTRACT_EDIT
CONTRACT_ARCHIVE
CONTRACT_RESTORE
CONTRACT_DELETE
```

Devices

```text
DEVICE_READ
DEVICE_CREATE
DEVICE_EDIT
DEVICE_ARCHIVE
DEVICE_RESTORE
DEVICE_DELETE
```

Licenses

```text
LICENSE_READ
LICENSE_CREATE
LICENSE_EDIT
LICENSE_ARCHIVE
LICENSE_RESTORE
LICENSE_DELETE
```

Assignments

```text
ASSIGNMENT_READ
ASSIGNMENT_CREATE
ASSIGNMENT_RETURN
ASSIGNMENT_CANCEL
```

License Assignments

```text
LICENSE_ASSIGNMENT_READ
LICENSE_ASSIGNMENT_CREATE
LICENSE_ASSIGNMENT_REVOKE
LICENSE_ASSIGNMENT_TRANSFER
```

---

# ADR-013

## Asset Management Domain

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

# ADR-014

## Asset Management Structure

```text
asset-management

contracts

departments

employees

devices

licenses

device-assignments

license-assignments
```

---

# ADR-015

## Departments Module

Structure:

```text
departments

components

models

services
```

Models:

```text
DepartmentResponse

DepartmentCreateRequest

DepartmentUpdateRequest
```

Service:

```text
DepartmentService
```

Endpoints:

```text
GET     /api/departments

POST    /api/departments

PUT     /api/departments/{id}

DELETE  /api/departments/{id}

PUT     /api/departments/{id}/restore

DELETE  /api/departments/{id}/permanent
```

Current Backend Behaviour:

```text
GET /api/departments

returns only active departments

(active = true)
```

Implemented:

```text
List

Create

Archive API Integration
```

Planned:

```text
Edit UI

Restore UI

Permanent Delete UI

Permission Visibility
```

---

# ADR-016

## Naming Convention

Components:

```text
AdministrationComponent

AssetManagementComponent

DashboardComponent

DepartmentsComponent

ProductsComponent

WarehouseComponent

ProfileComponent
```

Services:

```text
AuthService

AdminService

CategoryService

DepartmentService

ProductService

TaskService
```

---

# ADR-017

## Forbidden

```text
Service → Component dependency

Feature → Feature direct dependency

Business logic inside components

DTO declarations inside services

DTO declarations inside components

Frontend business rules
```

Required:

```text
Backend Contract
↓
Frontend Model
↓
Frontend Service
↓
Frontend Component
```

---

# ADR-018

## Current Project Status

Completed:

```text
Security ✅

Products ✅

Categories ✅

Architecture ✅

Core Layer ✅

Feature Layer ✅

Shared Layer ✅

Route Split ✅

Authentication ✅

Profile ✅

Administration ✅

Warehouse ✅

Asset Management Structure ✅

Department Backend Integration ✅
```

Frontend Status:

```text
Architecture ✅

Routing ✅

Authentication ✅

Departments Integration ✅
```

Backend Status:

```text
Asset Management Backend ✅
```

---

# Architecture Principle

Never develop:

```text
Frontend
↓
Backend
↓
Database
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