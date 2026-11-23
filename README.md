# Robotron

## Enterprise IT Asset & Business Management Platform

Robotron ist eine moderne Full-Stack-Unternehmensanwendung zur Verwaltung von IT-Assets, Mitarbeitern, Produkten, Lagerbeständen, Kunden, Bestellungen, Verträgen und Geschäftsprozessen.

Das Projekt dient als Portfolio-, Lern- und Demonstrationsprojekt mit Fokus auf moderne Enterprise-Softwareentwicklung, Cloud-Technologien, DevOps-Praktiken und skalierbare Softwarearchitekturen.

Die Anwendung wird kontinuierlich erweitert und orientiert sich an realen Anforderungen moderner Unternehmensumgebungen.

---

# Projektstatus

## Aktueller Entwicklungsstand

### Bereits umgesetzt

- Angular 22 SSR Frontend
- Spring Boot 3 Backend
- PostgreSQL Datenbank
- Flyway Migrationen
- JWT Authentication
- Rollenbasierte Zugriffskontrolle (RBAC)
- Permission-System
- Docker Containerisierung
- Docker Compose Entwicklungsumgebung
- Swagger / OpenAPI Dokumentation
- GitHub Actions CI/CD
- Terraform Infrastructure as Code
- Azure Container Registry (ACR)
- Azure Container Apps Deployment
- Public Cloud Deployment

### Aktuell in Entwicklung

- Azure PostgreSQL Flexible Server
- Monitoring & Observability
- Production Cloud Architektur
- Erweiterte Automatisierung

---

# Architektur

## Gesamtsystem

```text
Angular SSR
        ↓
Spring Boot REST API
        ↓
PostgreSQL
```

## Cloud Architektur

```text
GitHub
    ↓
GitHub Actions
    ↓
Docker Build
    ↓
Azure Container Registry
    ↓
Azure Container Apps
    ↓
Frontend + Backend
```

## Lokale Entwicklungsumgebung

```text
Frontend
    ↓
Backend
    ↓
PostgreSQL
    ↓
Mailpit
```

---

# Technologie Stack

## Backend

- Java 21
- Spring Boot 3.5
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Flyway
- PostgreSQL
- Maven
- Swagger / OpenAPI

## Frontend

- Angular 22
- Angular SSR
- TypeScript
- RxJS
- Angular Signals
- Standalone Components

## Datenbank

- PostgreSQL

## DevOps

- Docker
- Docker Compose
- GitHub Actions
- Terraform
- Azure Container Registry
- Azure Container Apps

## Cloud

- Microsoft Azure
- Azure Container Apps
- Azure Container Registry
- Terraform Remote State
- OIDC Authentication

---

# Security

## Implementiert

- JWT Authentication
- Login Workflow
- Registrierung
- Passwort Reset
- Passwortänderung
- Passwortänderung beim ersten Login
- Rollenbasierte Zugriffskontrolle
- Permission-basiertes Berechtigungssystem
- Endpoint Security

---

# Rollenmodell

## Verfügbare Rollen

- ROLE_CUSTOMER
- ROLE_MANAGER
- ROLE_ADMIN
- ROLE_DIRECTOR

### Customer

- Produktkatalog
- Warenkorb
- Checkout
- Kundenportal
- Profilverwaltung
- Bestellungen

### Manager

- Dashboard
- Produkte
- Kategorien
- Lagerverwaltung
- Business Management

### Administrator

- Benutzerverwaltung
- Rollenverwaltung
- Administration

### Director

- Unternehmenssteuerung
- Reporting
- Administration
- Analytics

---

# Benutzerverwaltung

## Funktionen

- Benutzerverwaltung
- Mitarbeiterverwaltung
- Rollenverwaltung
- Benutzeraktivierung
- Benutzersperrung
- Benutzerentsperrung
- Rollenänderung
- Enterprise Tabellenansicht
- Enterprise Toolbar

---

# DSGVO-Funktionen

## Implementiert

- DSGVO-konforme Anonymisierung
- Datenschutzkonforme Deaktivierung
- DSGVO-Benachrichtigungen
- Safe Delete Workflow
- Schutz historischer Geschäftsdaten

---

# Profilverwaltung

## Customer Profil

- Persönliche Daten
- Firmendaten
- Lieferadresse
- Kontostand
- Passwortverwaltung

## Mitarbeiterprofil

- Persönliche Daten
- Rolleninformationen
- Sicherheitsverwaltung
- Passwortverwaltung

---

# Produktkatalog

## Funktionen

- Produktübersicht
- Produktdetails
- Kategorienavigation
- Enterprise Produktkarten
- Suchfunktion
- Filterfunktion
- Query Parameter Routing

### Unterstützte Suche

- Produktname
- SKU
- Hersteller
- Beschreibung
- Kategorie

---

# Warenkorb & Checkout

## Workflow

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

### Implementiert

- Warenkorb
- Mengenverwaltung
- Preisberechnung
- Checkout Prozess
- Bestellerstellung

---

# Customer Portal

## Funktionen

- Meine Bestellungen
- Rechnungsübersicht
- Zahlungsverlauf
- Profilverwaltung
- Bestellhistorie

---

# Business Management

## Bereiche

### Master Data

- Categories
- Products

### Sales

- Orders

### Analytics

- Inventory Value
- Low Stock
- Product Margin
- Supplier Inventory

---

## Produkte

### Funktionen

- CRUD Operationen
- Enterprise Dialoge
- Import
- Export
- Suche
- Filterung
- Kategorienverwaltung

---

## Orders

### Funktionen

- Bestellübersicht
- Statusverwaltung
- Revenue Analyse
- KPI Dashboard
- Exportfunktionen
- Such- und Filterfunktionen

### KPIs

- Total Orders
- Pending Payment
- Paid Orders
- Shipped Orders
- Revenue

---

## Reporting

### Verfügbare Reports

- Inventory Value
- Low Stock
- Product Margin
- Supplier Inventory

### Export

- CSV
- Excel
- PDF

---

# Asset Management

## Bereiche

### Master Data

- Departments
- Employees
- Contracts
- Devices
- Software Licenses

### Operations

- Device Assignments
- License Assignments

### Analytics

- Asset Value
- Active Devices
- Department Assets
- Expiring Licenses

---

# Rechtliche Bereiche

## Implementiert

- Impressum
- Datenschutz
- Nutzungsbedingungen

---

# Datenbank

## PostgreSQL

### Wichtige Tabellen

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

Versionierte Datenbankmigrationen.

Beispiel:

```text
V1__baseline.sql
V2__create_system_settings.sql
...
V11__user_anonymize_permission.sql
```

Migrationen werden automatisch beim Start ausgeführt.

---

# Enterprise UI Architektur

## Implementierte Patterns

- Workspace Pattern
- Enterprise Dashboard Pattern
- Enterprise Toolbar Pattern
- Enterprise Table Pattern
- Enterprise KPI Pattern
- Enterprise Badge Pattern
- Enterprise Search Pattern
- Enterprise Navigation Pattern
- Enterprise Dialog Pattern
- Responsive Layout System

## Design System

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

# DevOps & Cloud

## Containerisierung

Implementiert:

- Spring Boot Docker Image
- Angular SSR Docker Image
- Multi-Stage Docker Builds
- Docker Compose Umgebung

## CI/CD

Implementiert:

- GitHub Actions
- Docker Build Pipeline
- Docker Push Pipeline
- Terraform Deployment
- OIDC Authentication

## Infrastructure as Code

Implementiert:

- Terraform
- Azure Container Apps
- Azure Container Registry
- Remote Terraform State

---

# Lokale Entwicklung

## Voraussetzungen

- Java 21
- Node.js
- Docker Desktop
- Git
- Maven

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
npm start
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

Alternativ über Umgebungsvariablen:

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

# Lernziele

Im Rahmen des Projekts vertiefe ich Kenntnisse in:

- Enterprise Architektur
- Domain Driven Design
- Spring Boot Entwicklung
- Angular Frontend Entwicklung
- Security Konzepte
- PostgreSQL Datenmodellierung
- Cloud Computing
- Docker
- Terraform
- CI/CD Pipelines
- Azure Container Apps
- Infrastructure as Code

---

# Roadmap

## Geplant

### Cloud

- Azure PostgreSQL Flexible Server
- Monitoring & Logging
- Production Infrastruktur
- HTTPS Custom Domain

### Audit Modul

- Audit Logs
- Änderungsverfolgung
- Historisierung
- Benutzeraktivitäten

### Workflow Engine

- Anfrageprozesse
- Freigabeworkflows
- Genehmigungsprozesse
- Beschaffungsprozesse

### User Preferences

- Dashboard Einstellungen
- Tabellenpräferenzen
- UI Personalisierung

---

# Projektziel

Robotron dient als Lern-, Portfolio- und Demonstrationsprojekt für moderne Enterprise-Softwareentwicklung.

Schwerpunkte:

- Full-Stack Entwicklung
- Enterprise Architektur
- Domain Driven Design
- REST APIs
- Spring Boot
- Angular SSR
- PostgreSQL
- Security
- Docker
- Terraform
- GitHub Actions
- Cloud Deployment auf Microsoft Azure

Das Projekt wird kontinuierlich erweitert und dient dem Aufbau praktischer Erfahrung im Bereich moderner Unternehmenssoftware und Cloud-Native Entwicklung.
