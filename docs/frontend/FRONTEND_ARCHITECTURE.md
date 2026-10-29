\# Frontend Architecture



\## Technology Stack



```text

Angular

TypeScript

RxJS

Angular Router

Standalone Components

SSR Ready Architecture

```



\---



\## Frontend Principle



```text

Business Domain

↓

Backend API

↓

Frontend Features

↓

UI Components

```



Frontend is never the source of truth.



The backend API is the source of truth for frontend data.



\---



\## Architecture Style



```text

Feature-Based Architecture

```



Project Structure:



```text

app



core

shared

features

```



\---



\## Core Layer



Contains application-wide functionality.



```text

Authentication



Authorization



Guards



Interceptors



Global Models



Core Services

```



\---



\## Shared Layer



Contains reusable UI components.



```text

Navbar



Future:



Footer



Buttons



Cards



Shared UI Elements

```



\---



\## Feature Layer



Contains business functionality.



```text

Public



Catalog



Business Management



Asset Management



Administration



Auth

```



\---



\## Public Domain



```text

Homepage



Catalog



About



News



Support

```



Routes:



```text

/



/catalog



/about



/news



/support

```



\---



\## Business Management Domain



```text

Products



Categories



Warehouse

```



Purpose:



```text

Administration

of commercial inventory.

```



\---



\## Asset Management Domain



```text

Departments



Employees



Employment Contracts



Devices



Software Licenses



Assignments

```



Purpose:



```text

Administration

of company assets.

```



\---



\## Administration Domain



```text

Users



Roles



Permissions



System Settings

```



\---



\## Product and Device Separation



Product:



```text

Commercial Item

```



Example:



```text

ThinkPad L14 G4

```



Device:



```text

Physical Company Asset

```



Example:



```text

INV-00001

```



Frontend must never mix:



```text

Product Views



and



Device Views

```



These are different business concepts.



\---



\## Routing Strategy



Public:



```text

/



/catalog



/catalog/category/:id



/catalog/products/:id



/about



/news



/support

```



Authenticated:



```text

/dashboard



/profile

```



\---



\## Current Status



Implemented:



```text

Catalog



Product Details



Category Filter



Authentication



Profile



Administration Modules



Asset Management Modules

```



Planned:



```text

Search



Product Images



Related Products



Reports



Analytics

```

