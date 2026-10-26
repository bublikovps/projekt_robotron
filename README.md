# Robotron

## IT Resource & Asset Management Platform

Robotron ist eine Full-Stack-Webanwendung zur Verwaltung von IT-Ressourcen, Mitarbeitern, Benutzerkonten, Verträgen, Geräten, Software-Lizenzen und Berechtigungen innerhalb eines Unternehmens.

Das Projekt verfolgt einen Domain-Driven-Ansatz und kombiniert Asset Management, Benutzerverwaltung, Sicherheitskonzepte und Business Management in einer zentralen Plattform.

---

# Projektstatus

## Aktuell umgesetzt ✅

### Infrastruktur

- Docker Compose Umgebung
- PostgreSQL Datenbank
- Flyway Migrationen
- Mailpit SMTP Testumgebung

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

### Rollenmodell

- ROLE_CUSTOMER
- ROLE_MANAGER
- ROLE_ADMIN
- ROLE_DIRECTOR

### Berechtigungssystem

- Über 80 individuelle Berechtigungen
- Role-Permission-Mapping
- Benutzer-Rollen-Zuordnung
- Permission-basierte Backend-Sicherheit

### Business Management

- Produktverwaltung
- Kategorienverwaltung
- Lagerverwaltung
- Bestellverwaltung

### Asset Management

- Abteilungsverwaltung
- Mitarbeiterverwaltung
- Arbeitsverträge
- Geräteverwaltung
- Software-Lizenzverwaltung
- Gerätezuweisungen
- Lizenzzuweisungen

### Backend

- REST API
- Swagger/OpenAPI
- DTO-basierte Datenübertragung
- Service Layer Architektur
- JPA/Hibernate Mapping

### Frontend

- Angular Architektur
- Feature-basierte Struktur
- Route Guards
- JWT Session Handling
- Authentifizierung
- Profilverwaltung
- Administrationsbereich
- Asset Management Bereich

---

## Aktuell in Arbeit 🚧

### Frontend

- Dashboard Erweiterungen
- Geräteoberflächen
- Lizenzoberflächen
- Erweiterte Formulare
- Berechtigungsabhängige UI-Sichtbarkeit

### Datenbank

- Weitere Flyway Migrationen
- Migration bestehender Datenbankänderungen auf Flyway

### Entwicklerdokumentation

- Architekturdiagramme
- Datenbankdiagramm
- API Dokumentation vervollständigen

---

## Geplante Erweiterungen 📌

### Reporting

- Statistische Auswertungen
- Exportfunktionen
- Management Reports

### Audit Modul

- Änderungsverfolgung
- Ereignisprotokolle
- Benutzeraktivitäten

### Dashboard

- KPIs
- Übersichtsdaten
- Asset Kennzahlen

### Assignment Workflows

- Erweiterte Asset-Prozesse
- Historisierung
- Nachvollziehbarkeit von Änderungen

### Benachrichtigungen

- Lizenzabläufe
- Vertragsabläufe
- Erinnerungen

---

# Technologie-Stack

## Backend

- Java 21
- Spring Boot 3
- Spring Security
- Spring Data JPA
- JWT
- Flyway
- PostgreSQL
- Swagger/OpenAPI
- Maven

## Frontend

- Angular
- TypeScript
- RxJS

## Infrastruktur

- Docker
- Docker Compose
- PostgreSQL
- Mailpit

---

# Architekturprinzip

Das Projekt folgt konsequent dem Domain-First-Ansatz.

```text
Business Domain
↓
Database
↓
Backend
↓
Frontend
```

Neue Funktionen werden immer in dieser Reihenfolge entwickelt.

---

# Frontend Architektur

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
utils
```

## Features

```text
auth
dashboard
profile
administration
business-management
asset-management
```

---

# Asset Management Domain

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

---

# Datenbank

## PostgreSQL

Wesentliche Bereiche:

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

Flyway verwaltet zukünftige Änderungen der Datenbankstruktur.

Aktueller Stand:

```text
V1__baseline.sql
V2__create_system_settings.sql
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
- Docker Desktop
- Node.js
- Angular CLI
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

Im Frontend-Verzeichnis:

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

Alternativ können Umgebungsvariablen verwendet werden:

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

# Projektziel

Robotron dient als Demonstration moderner Enterprise-Softwareentwicklung mit Fokus auf:

- Domain-Driven Design Prinzipien
- Backend Entwicklung mit Java und Spring Boot
- Angular Frontend Entwicklung
- Rollen- und Berechtigungssysteme
- REST API Entwicklung
- Datenbankmodellierung mit PostgreSQL
- Datenbankmigrationen mit Flyway
- Containerisierung mit Docker
- Enterprise Application Architecture

Das Projekt wird kontinuierlich erweitert und dient als praktisches Portfolio-Projekt zur Demonstration von Full-Stack- und Backend-Entwicklung im Enterprise-Umfeld.
