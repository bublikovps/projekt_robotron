# Robotron

## Enterprise IT Asset & Business Management Platform

Robotron ist eine Full-Stack-Enterprise-Anwendung zur Verwaltung von IT-Assets, Mitarbeitern, Software-Lizenzen, Verträgen, Produkten, Lagerbeständen und Geschäftsprozessen innerhalb eines Unternehmens.

Das Projekt wird mit Angular 20, Spring Boot 3, PostgreSQL und Docker entwickelt und verfolgt einen Domain-Driven-Design-Ansatz mit klarer Trennung fachlicher Domänen.

Ziel des Projekts ist die Entwicklung einer modernen Enterprise-Plattform unter Anwendung von Best Practices aus den Bereichen Softwarearchitektur, Security, Datenmodellierung, UI/UX und Full-Stack-Entwicklung.

---

# Projektstatus

## Aktuell umgesetzt ✅

### Infrastruktur

- Docker Compose Umgebung
- PostgreSQL Datenbank
- Flyway Migrationen
- Mailpit SMTP Testumgebung
- Swagger/OpenAPI Dokumentation

### Security

- Spring Security
- JWT Authentication
- Login
- Benutzerregistrierung
- Passwortänderung
- Passwort-Reset Workflow
- Passwortänderung beim ersten Login
- Rollenbasierte Zugriffskontrolle (RBAC)
- Rollen- und Berechtigungssystem
- Permission-basierte Endpoint-Sicherheit

### Rollenmodell

- ROLE_CUSTOMER
- ROLE_MANAGER
- ROLE_ADMIN
- ROLE_DIRECTOR

### Berechtigungssystem

- Über 80 individuelle Berechtigungen
- Rollen-Permission-Mapping
- Benutzer-Rollen-Zuordnungen
- Granulare Zugriffskontrolle auf Backend-Ebene

---

# Frontend Enterprise Architektur

## Implementierte Enterprise Patterns

- Workspace Pattern
- Breadcrumb Navigation Pattern
- Enterprise Toolbar Pattern
- Enterprise Table Pattern
- Enterprise KPI Pattern
- Enterprise Dropdown Pattern
- Enterprise Dialog Pattern
- Enterprise Actions Pattern
- Enterprise Badge Pattern
- Query Parameter Navigation Pattern
- Responsive Enterprise Layout System

### Globales Design System

Gemeinsame UI-Komponenten und Styles:

```text
enterprise-tokens.css
enterprise-layout.css
enterprise-buttons.css
enterprise-dropdown.css
enterprise-table.css
enterprise-kpi.css
enterprise-dialog.css
enterprise-actions.css
enterprise-badges.css
enterprise-breadcrumb.css
report-enterprise.css
```

---

# Catalog Module

Der Produktkatalog wurde als eigenständiges Frontend-Modul umgesetzt.

### Funktionen

- Produktübersicht
- Kategorienavigation
- Query-Parameter Routing
- Produktdetails
- Category Statistics
- Category Counts
- Enterprise Product Cards
- Enterprise Search

### Suchfunktionen

Suche über:

- Name
- SKU
- Hersteller
- Beschreibung
- Kategorie

### Routing

Verwendet Query Parameters:

```text
/catalog?category=1
```

anstelle von:

```text
/catalog/category/1
```

um unnötige Component-Recreation und UI-Flackern zu vermeiden.

---

# Business Management

## Workspace Struktur

```text
Business Management

Master Data
├── Categories
└── Products

Analytics
├── Inventory Value
├── Low Stock
├── Product Margin
└── Supplier Inventory
```

### Master Data

#### Categories

- Kategorienverwaltung
- CRUD Operationen
- Enterprise Toolbar
- Enterprise Tabellen

#### Products

- Produktverwaltung
- CRUD Operationen
- Suchfunktion
- Exportfunktionen
- Backend Integration
- Enterprise Workspace Design

### Analytics

#### Inventory Value Report

Analyse des Lagerwertes auf Produktebene.

#### Low Stock Report

Analyse kritischer Lagerbestände.

#### Product Margin Report

Analyse von Produktmargen und Profitabilität.

#### Supplier Inventory Report

Analyse der Lagerbestände nach Lieferanten.

### Reporting Funktionen

- Suche
- Sortierung
- KPI Dashboards
- CSV Export
- Excel Export
- PDF Export

---

# Asset Management

## Workspace Struktur

```text
Asset Management

Master Data
├── Departments
├── Employees
├── Contracts
├── Devices
└── Software Licenses

Operations
├── Device Assignments
└── License Assignments

Analytics
├── Asset Value
├── Active Devices
├── Department Assets
└── Expiring Licenses
```

### Departments

- Abteilungsverwaltung
- CRUD Funktionen

### Employees

- Mitarbeiterverwaltung
- Benutzerverknüpfung

### Contracts

- Vertragsverwaltung

### Devices

- Geräteverwaltung
- Asset Lifecycle

### Software Licenses

- Lizenzverwaltung
- Lizenzstatus
- Nutzungsübersicht

### Device Assignments

Verknüpfung von:

```text
Mitarbeiter
↓
Gerät
```

### License Assignments

Verknüpfung von:

```text
Mitarbeiter
↓
Software-Lizenz
```

### Asset Analytics

#### Asset Value

Übersicht über den Gesamtwert aller Assets.

#### Active Devices

Analyse aktiver Geräte.

#### Department Assets

Asset-Verteilung nach Abteilungen.

#### Expiring Licenses

Überwachung ablaufender Software-Lizenzen.

---

# Rechtliche Bereiche

Implementierte Seiten:

- Impressum
- Datenschutz
- Nutzungsbedingungen

---

# Backend Architektur

## Implementiert

- REST API
- DTO Layer
- Service Layer
- Repository Layer
- JPA/Hibernate
- PostgreSQL
- Flyway
- OpenAPI / Swagger

### Architektur

```text
Controller
↓
Service
↓
Repository
↓
Database
```

### Mapping

- DTO Mapping
- Entity Mapping
- Projection Support

---

# Produktimport

Implementiert:

- Product Import API
- ProductImportController
- ProductImportService

Grundlage für zukünftige Massenimporte von Produktdaten.

---

# Technologie-Stack

## Backend

- Java 21
- Spring Boot 3
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Flyway
- PostgreSQL
- Swagger/OpenAPI
- Maven

## Frontend

- Angular 20
- TypeScript
- RxJS
- Standalone Components
- Angular Signals (schrittweise Einführung)

## Infrastruktur

- Docker
- Docker Compose
- PostgreSQL
- Mailpit

---

# Projektarchitektur

Das Projekt folgt einem Domain-First-Ansatz.

```text
Business Domain
↓
Database
↓
Backend
↓
Frontend
```

Neue Funktionen werden grundsätzlich in dieser Reihenfolge entwickelt.

---

# Frontend Struktur

```text
src/app

core
shared
features
```

## Core

```text
guards
interceptors
models
services
```

## Shared

```text
components
services
utils
```

## Features

```text
auth
dashboard
profile
catalog
business-management
asset-management
administration
legal
```

---

# Fachliche Domänen

## Asset Domain

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

## Business Domain

```text
Category
↓
Product
↓
Inventory

Product
↓
Supplier Analytics

Product
↓
Margin Analytics
```

---

# Datenbank

## PostgreSQL

Wesentliche Tabellenbereiche:

```text
users
roles
permissions
role_permissions
user_roles

products
categories
orders

department
employee
employment_contract

device
software_license

device_assignment
license_assignment
```

---

# Flyway Migrationen

Flyway verwaltet die Datenbankstruktur vollständig versioniert.

Aktueller Stand:

```text
V1__baseline.sql
V2__create_system_settings.sql
...
V7__product_image_support.sql
```

Migrationen werden automatisch beim Start der Anwendung ausgeführt.

---

# Docker Infrastruktur

Starten:

```bash
docker compose up -d
```

Services:

- PostgreSQL
- Mailpit

Status prüfen:

```bash
docker ps
```

---

# Projekt lokal starten

## Voraussetzungen

Installierte Software:

- Java 21
- Maven
- Node.js
- Angular CLI
- Docker Desktop
- Git

---

## Repository klonen

```bash
git clone <repository-url>
cd projekt_robotron
```

---

## Docker starten

```bash
docker compose up -d
```

---

## Backend starten

Im Verzeichnis:

```bash
server
```

Start:

```bash
./mvnw spring-boot:run
```

oder direkt über IntelliJ IDEA.

Backend:

```text
http://localhost:8080
```

---

## Frontend starten

Im Verzeichnis:

```bash
my-angular-app
```

Start:

```bash
npm install
ng serve
```

Frontend:

```text
http://localhost:4200
```

---

# Entwicklungsdatenbank

Standardwerte für die lokale Entwicklungsumgebung:

```text
Host: localhost
Port: 5432
Database: robotron_db
User: postgres
Password: mysecretpassword
```

Alternativ:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
```

---

# Mail Testing

Mailpit Oberfläche:

```text
http://localhost:8025
```

SMTP:

```text
localhost:1025
```

---

# API Dokumentation

Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

---

# Aktuelle Roadmap

## Administration Refactoring

Geplant:

- Administration Workspace
- Enterprise Toolbar Pattern
- Enterprise Table Pattern
- Administration Dashboard
- Breadcrumb Integration
- Modernisierung bestehender Administration Views

## User Preferences

Geplant:

- UserPreferencesService
- Persistente Benutzereinstellungen
- Tabellenpräferenzen
- Dashboard Einstellungen
- Theme Einstellungen
- Catalog Preferences

## Audit Modul

Geplant:

- Änderungsverfolgung
- Benutzeraktivitäten
- Historisierung wichtiger Aktionen
- Audit Logs

---

# Projektziel

Robotron dient als Portfolio- und Lernprojekt zur Demonstration moderner Enterprise-Softwareentwicklung.

Schwerpunkte:

- Domain-Driven Design
- Java Backend Entwicklung
- Spring Boot Architektur
- Angular Enterprise Frontends
- RBAC Sicherheitskonzepte
- REST API Entwicklung
- PostgreSQL Datenmodellierung
- Flyway Migrationen
- Docker Infrastruktur
- Enterprise UI/UX Patterns
- Full-Stack Architektur

Das Projekt wird kontinuierlich weiterentwickelt und orientiert sich an realen Anforderungen moderner Unternehmensanwendungen.
