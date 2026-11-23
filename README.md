# Robotron

## Enterprise IT Asset & Business Management Platform

Robotron ist eine moderne Full-Stack-Enterprise-Anwendung zur Verwaltung von IT-Assets, Mitarbeitern, Software-Lizenzen, Verträgen, Produkten, Lagerbeständen, Kunden, Bestellungen und Geschäftsprozessen.

Das Projekt wird mit Angular 20, Spring Boot 3, PostgreSQL und Docker entwickelt und verfolgt einen Domain-Driven-Design-Ansatz mit klarer Trennung fachlicher Domänen, Enterprise UI Patterns und rollenbasierter Sicherheit.

Ziel des Projekts ist die Entwicklung einer realitätsnahen Unternehmensplattform unter Anwendung moderner Methoden aus den Bereichen:

- Softwarearchitektur
- Security
- Datenmodellierung
- UI/UX Design
- Full-Stack Entwicklung
- Enterprise Application Design

---

# Projektstatus

## Aktuell umgesetzt ✅

### Infrastruktur

- Docker Compose Umgebung
- PostgreSQL Datenbank
- Flyway Migrationen
- Mailpit SMTP Testumgebung
- Swagger / OpenAPI Dokumentation

### Backend Architektur

- Spring Boot 3
- REST API
- DTO Layer
- Service Layer
- Repository Layer
- JPA / Hibernate
- PostgreSQL
- Flyway
- OpenAPI / Swagger

### Security

- Spring Security
- JWT Authentication
- Login
- Registrierung
- Passwort-Reset Workflow
- Passwortänderung
- Passwortänderung beim ersten Login
- Rollenbasierte Zugriffskontrolle (RBAC)
- Permission-basiertes Berechtigungssystem
- Endpoint Security

---

# Rollenmodell

## Implementierte Rollen

- ROLE_CUSTOMER
- ROLE_MANAGER
- ROLE_ADMIN
- ROLE_DIRECTOR

## Rollenlogik

### Customer

Verwendet:

- Produktkatalog
- Warenkorb
- Checkout
- Kundenportal
- Bestellungen
- Rechnungen
- Profilverwaltung

### Manager

Verwendet:

- Dashboard
- Business Management
- Produkte
- Kategorien
- Lagerverwaltung

### Administrator

Verwendet:

- Administration
- Benutzerverwaltung
- Rollenverwaltung

### Director

Verwendet:

- Unternehmenssteuerung
- Administration
- Business Management
- Reporting

---

# Frontend Enterprise Architektur

## Implementierte Enterprise Patterns

- Workspace Pattern
- Enterprise Dashboard Pattern
- Enterprise Toolbar Pattern
- Enterprise Table Pattern
- Enterprise KPI Pattern
- Enterprise Badge Pattern
- Enterprise Dropdown Pattern
- Enterprise Actions Pattern
- Enterprise Dialog Pattern
- Enterprise Search Pattern
- Enterprise Navigation Pattern
- Responsive Enterprise Layout System

### Globales Design System

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

# Benutzer & Administration

## Administration Workspace

Bereits umgesetzt:

- Benutzerverwaltung
- Mitarbeiterverwaltung
- Rollenverwaltung
- Benutzeraktivierung
- Benutzersperrung
- Benutzerentsperrung
- Rollenänderung
- Enterprise Tabellenansicht
- Enterprise Toolbar

## User Lifecycle Management

### Aktiver Benutzer

```text
Aktiv
```

### Gesperrter Benutzer

```text
Aktiv
↓
Gesperrt
```

### DSGVO Anonymisierung

```text
Aktiv
↓
Anonymisiert
```

### Safe Delete

Physische Löschung ist nur möglich wenn:

```text
Keine Bestellungen
Keine Rechnungen
Keine Geschäftsreferenzen
```

vorliegen.

---

# DSGVO Funktionen

## Implementiert

- DSGVO-konforme Anonymisierung
- DSGVO E-Mail Benachrichtigung
- Safe Delete Workflow
- Schutz historischer Bestelldaten
- Datenschutzkonforme Benutzerdeaktivierung

---

# Profilverwaltung

## Role-Aware Profile

### Customer Profil

- Persönliche Daten
- Kundentyp
- Firmendaten
- USt-ID
- Lieferadresse
- Kontostand
- Passwortverwaltung

### Mitarbeiterprofil

- Persönliche Daten
- Rolleninformationen
- Sicherheitsverwaltung
- Passwortverwaltung

---

# Katalog

## Funktionen

- Produktübersicht
- Produktdetails
- Kategorienavigation
- Enterprise Produktkarten
- Suchfunktion
- Kategorie-Filter
- Query Parameter Routing

## Produktsuche

Unterstützt:

- Produktname
- SKU
- Hersteller
- Beschreibung
- Kategorie

### Routing

```text
/catalog?category=1
```

anstelle von:

```text
/catalog/category/1
```

---

# Warenkorb & Checkout

## Customer Shopping Workflow

```text
Produkt
↓
Warenkorb
↓
Checkout
↓
Bestellung
↓
Kundenportal
```

### Funktionen

- Warenkorb
- Mengenverwaltung
- Preisberechnung
- Checkout
- Bestellerstellung

### Rollenlogik

Warenkorb und Checkout stehen ausschließlich externen Benutzern zur Verfügung:

```text
Gast
Customer
```

Nicht verfügbar für:

```text
Manager
Admin
Director
```

---

# Customer Portal

## Funktionen

- Meine Bestellungen
- Zahlungsübersicht
- Profilverwaltung
- Rechnungsansicht
- Bestellinformationen

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

### Categories

- CRUD Funktionen
- Enterprise Toolbar
- Enterprise Tabellen
- Suchfunktionen

### Products

- CRUD Funktionen
- Enterprise Dialoge
- Import
- Export
- Suche
- Filterung
- Kategorien

### Reporting

- Inventory Value
- Low Stock
- Product Margins
- Supplier Inventory

### Exportformate

- CSV
- Excel
- PDF

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

### Implementiert

- Departments
- Employees
- Contracts
- Devices
- Software Licenses
- Asset Analytics

---

# Rechtliche Bereiche

Implementierte Seiten:

- Impressum
- Datenschutz
- Nutzungsbedingungen

---

# Datenbank

## PostgreSQL

Wichtige Tabellen:

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

Versionierte Datenbankänderungen über Flyway.

Beispiel:

```text
V1__baseline.sql
V2__create_system_settings.sql
...
V11__user_anonymize_permission.sql
```

Migrationen werden automatisch beim Start ausgeführt.

---

# Technologie Stack

## Backend

- Java 21
- Spring Boot 3
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Flyway
- PostgreSQL
- Maven
- Swagger / OpenAPI

## Frontend

- Angular 20
- TypeScript
- RxJS
- Standalone Components
- Angular Signals

## Infrastruktur

- Docker
- Docker Compose
- PostgreSQL
- Mailpit

---

# Projektarchitektur

```text
Business Domain
↓
Database
↓
Backend
↓
Frontend
```

Neue Funktionen werden grundsätzlich nach diesem Prinzip entwickelt.

---

# Lokale Entwicklung

## Voraussetzungen

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

## Infrastruktur starten

```bash
docker compose up -d
```

---

## Backend starten

```bash
cd server
./mvnw spring-boot:run
```

Backend:

```text
http://localhost:8080
```

---

## Frontend starten

```bash
cd my-angular-app
npm install
ng serve
```

Frontend:

```text
http://localhost:4200
```

---

# Entwicklungsdatenbank

```text
Host: localhost
Port: 5432
Database: robotron_db
User: postgres
Password: mysecretpassword
```

Alternativ über:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
```

---

# Mail Testing

Mailpit:

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

# Roadmap

## Audit Modul

Geplant:

- Audit Logs
- Benutzeraktivitäten
- Änderungsverfolgung
- Historisierung

## Request Workflow

Geplant:

- Anfragekorb
- Freigabeprozess
- Genehmigungsworkflow
- Beschaffungsprozess

## User Preferences

Geplant:

- Dashboard Einstellungen
- Tabellenpräferenzen
- UI Einstellungen
- Personalisierung

## Cloud Deployment

Geplant:

- Azure App Service
- Azure PostgreSQL Flexible Server
- GitHub Actions
- Terraform
- Infrastructure as Code

---

# Projektziel

Robotron dient als Portfolio-, Lern- und Demonstrationsprojekt für moderne Enterprise-Softwareentwicklung.

Schwerpunkte:

- Domain-Driven Design
- Spring Boot Architektur
- Angular Enterprise Frontends
- REST APIs
- RBAC Sicherheitskonzepte
- PostgreSQL Datenmodellierung
- Flyway Migrationen
- Enterprise UI/UX
- Full-Stack Entwicklung
- DevOps Grundlagen
- Cloud Deployment

Das Projekt wird kontinuierlich weiterentwickelt und orientiert sich an realen Anforderungen moderner Unternehmensanwendungen.
