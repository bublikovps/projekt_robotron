# Frontend Architecture Decisions

---

## ADR-001

### Feature-Based Structure

Status:

```text
Accepted
```

Decision:

```text
Frontend is organized by business features.
```

Reason:

```text
Better scalability.

Better maintainability.

Enterprise-ready structure.
```

---

## ADR-002

### Standalone Components

Status:

```text
Accepted
```

Decision:

```text
Angular Standalone Components
are used instead of NgModules.
```

Reason:

```text
Reduced complexity.

Modern Angular standard.
```

---

## ADR-003

### Shared Components

Status:

```text
Accepted
```

Decision:

```text
Reusable UI components
belong to Shared Layer.
```

Examples:

```text
Navbar
```

Future:

```text
Buttons
Cards
Dialogs
```

---

## ADR-004

### Domain Separation

Status:

```text
Accepted
```

Decision:

```text
Business domains are isolated.
```

Domains:

```text
Public

Business Management

Asset Management

Administration
```

---

## ADR-005

### Product and Device Separation

Status:

```text
Accepted
```

Decision:

```text
Products and Devices
are different frontend domains.
```

Product:

```text
Sales
Catalog
Warehouse
```

Device:

```text
Asset Management
Assignments
Lifecycle Tracking
```

---

## ADR-006

### API Driven Frontend

Status:

```text
Accepted
```

Decision:

```text
Frontend follows Backend API.
```

Forbidden:

```text
Frontend-driven business logic.

Frontend-generated data model.
```

---

## ADR-007

### Navigation Strategy

Status:

```text
Accepted
```

Public Navigation:

```text
Catalog
About
News
Support
```

Authenticated Navigation:

```text
Dashboard
Profile
```

Business modules remain inside:

```text
Dashboard
```

---

## ADR-008

### Security Visibility Rule

Status:

```text
Accepted
```

Principle:

```text
Backend controls access.

Frontend controls visibility.
```

Flow:

```text
Permission
↓
Role
↓
Backend Access
↓
Frontend Visibility
```