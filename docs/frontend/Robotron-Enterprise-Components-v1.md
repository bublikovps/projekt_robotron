# Robotron Enterprise Components v1

Version: 1.0

Status: Approved

Owner: Robotron Enterprise Platform

Related Documents:

- Robotron-Enterprise-Design-Language-v1.md
- Robotron-Enterprise-UX-Blueprint-v1.md

Last Updated: 2026-11

---

# Purpose

This document defines all reusable UI components used across the Robotron Enterprise Platform.

The objective is:

- one visual language
- one interaction model
- one implementation standard

Every future module must build upon these components.

No custom local component styles should be created if an enterprise component already exists.

---

# Component Hierarchy

Platform

↓

Navigation

↓

Workspace

↓

Enterprise Components

↓

Business Features

---

# Component Library Overview

Core Components:

- EnterprisePage
- EnterprisePageHeader
- EnterpriseToolbar
- EnterpriseSearch
- EnterpriseFilter
- EnterpriseExportMenu
- EnterpriseTable
- EnterpriseDialog
- EnterpriseBadge
- EnterpriseButton
- EnterpriseEmptyState
- EnterpriseLoadingState

Future Components:

- EnterpriseCommandBar
- EnterpriseNotifications
- EnterpriseTimeline
- EnterpriseSidePanel
- EnterpriseDataGrid

---

# EnterprisePage

Purpose:

Primary workspace container.

Used By:

- Employees
- Devices
- Contracts
- Licenses
- Assignments
- Products
- Categories
- Reports

Structure:

```text
EnterprisePage

├ Header

├ Toolbar

├ Content

└ Footer (optional)
```

HTML Template:

```html
<div class="enterprise-page">

</div>
```

---

# EnterprisePageHeader

Purpose:

Displays module title and primary action.

Layout:

```text
Title

Description

Primary Action
```

Desktop Layout:

```text
┌──────────────────────────────┐
│ Employees     + Employee     │
│ Manage...                    │
└──────────────────────────────┘
```

HTML:

```html
<div class="enterprise-page-header">

  <div>

    <h1>

      Employees

    </h1>

    <p>

      Manage employee records.

    </p>

  </div>

  <button>

    + Employee

  </button>

</div>
```

Rules:

- action always right aligned
- one-line description
- compact layout

---

# EnterpriseToolbar

Purpose:

Universal workspace toolbar.

Required Order:

```text
Search

Filters

Export

Actions
```

Desktop:

```text
┌──────────────────────────────┐
│ Search                       │
│ Filter                       │
│ Export                       │
│ Create                       │
└──────────────────────────────┘
```

HTML:

```html
<div class="enterprise-toolbar">

</div>
```

Rules:

- identical order everywhere
- always visible above content
- mandatory in management modules

---

# EnterpriseSearch

Purpose:

Fast content filtering.

Standard Width:

Desktop:

```text
400px
```

Minimal:

```text
320px
```

HTML:

```html
<input
  class="enterprise-search"
  type="text">
```

Placeholders:

```text
Search employees...

Search devices...

Search products...

Search reports...
```

Rules:

- always first toolbar control
- instant feedback preferred

---

# EnterpriseFilter

Purpose:

Data segmentation.

Examples:

Employee:

```text
Department

Position
```

Device:

```text
Status

Location
```

License:

```text
Vendor

Type
```

Rules:

- contextual
- positioned after search
- identical visual style

---

# EnterpriseExportMenu

Purpose:

Data export.

Supported Formats:

- Excel
- PDF
- CSV

Layout:

```text
Export ▼
```

Menu:

```text
Excel (.xlsx)

PDF (.pdf)

CSV (.csv)
```

Rules:

- same menu everywhere
- same icon everywhere
- same order everywhere

---

# EnterpriseButton

Purpose:

Unified action system.

Variants:

Primary

Secondary

Success

Warning

Danger

Ghost

---

# EnterpriseButtonPrimary

Purpose:

Main action.

Examples:

```text
Create

Save

Assign
```

Color:

```text
Primary Blue
```

---

# EnterpriseButtonSecondary

Purpose:

Alternative action.

Examples:

```text
Cancel

Close

Back
```

---

# EnterpriseButtonSuccess

Purpose:

Positive workflow.

Examples:

```text
Approve

Complete

Activate
```

---

# EnterpriseButtonWarning

Purpose:

Editable actions.

Examples:

```text
Edit

Modify

Renew
```

---

# EnterpriseButtonDanger

Purpose:

Destructive actions.

Examples:

```text
Archive

Delete

Revoke
```

---

# EnterpriseButtonGhost

Purpose:

Low priority actions.

Examples:

```text
Details

View

Open
```

---

# EnterpriseTable

Purpose:

Primary enterprise data visualization.

Structure:

```text
Toolbar

↓

Table

↓

Pagination
```

Required Features:

- hover state
- actions column
- status badges
- sortable columns

Recommended:

- sticky header
- pagination
- column filtering

Desktop Layout:

```text
┌──────────────────────────────┐
│ Toolbar                      │
├──────────────────────────────┤
│ Table                        │
├──────────────────────────────┤
│ Pagination                   │
└──────────────────────────────┘
```

---

# EnterprisePagination

Purpose:

Large dataset navigation.

Future Component.

Layout:

```text
< Previous

1

2

3

4

Next >
```

---

# EnterpriseBadge

Purpose:

Status identification.

Variants:

Success

Info

Warning

Danger

---

# EnterpriseBadgeSuccess

Examples:

```text
ACTIVE

AVAILABLE

COMPLETED
```

Color:

```text
Green
```

---

# EnterpriseBadgeInfo

Examples:

```text
ASSIGNED

IN USE
```

Color:

```text
Blue
```

---

# EnterpriseBadgeWarning

Examples:

```text
EXPIRING

REPAIR

PENDING
```

Color:

```text
Orange
```

---

# EnterpriseBadgeDanger

Examples:

```text
ARCHIVED

REVOKED

RETIRED
```

Color:

```text
Red
```

---

# EnterpriseDialog

Purpose:

Create and Edit workflows.

Width:

Preferred:

```text
640px
```

Maximum:

```text
720px
```

Structure:

```text
Header

Body

Footer
```

Desktop Layout:

```text
┌──────────────────────────────┐
│ Dialog Title                 │
├──────────────────────────────┤
│ Form                         │
├──────────────────────────────┤
│ Actions                      │
└──────────────────────────────┘
```

---

# EnterpriseFormLayout

Purpose:

Consistent enterprise forms.

Preferred:

Two-column grid.

Example:

```text
Department      Number

First Name      Last Name

Email           Phone

Position        Hire Date
```

Avoid:

```text
1 field

1 field

1 field

1 field

1 field

1 field
```

long vertical forms.

---

# EnterpriseEmptyState

Purpose:

No data available.

Layout:

```text
Icon

Message

Action
```

Example:

```text
No employees available.

Create your first employee.
```

---

# EnterpriseLoadingState

Purpose:

Data loading indication.

Layout:

```text
Skeleton Rows

or

Loading Spinner
```

Rules:

- avoid content jumps
- maintain page structure

---

# EnterpriseCard

Purpose:

Dashboard and Catalog content.

Used By:

- Dashboard
- Catalog
- KPI Widgets

Layout:

```text
Title

Value

Description

Action
```

---

# EnterpriseKpiCard

Purpose:

Dashboard metrics.

Examples:

```text
Employees

148
```

```text
Devices

420
```

```text
Assigned Devices

93
```

```text
Expiring Licenses

7
```

---

# EnterpriseReportHeader

Purpose:

Report overview.

Layout:

```text
Title

Description

Actions
```

Example:

```text
Asset Value Report

Export

Refresh
```

---

# EnterpriseReportToolbar

Contains:

- Search
- Date Range
- Filters
- Export

Layout:

```text
Search

Date Filter

Department

Export
```

---

# Mobile Adaptation

All components support:

- Phone
- Tablet
- Desktop

---

# Mobile Rules

EnterprisePageHeader

Stack vertically.

---

EnterpriseToolbar

Stack controls vertically.

---

EnterpriseTable

Horizontal scrolling.

Never hide columns automatically.

---

EnterpriseDialog

Width:

95%

of viewport.

---

# Accessibility Rules

All components must support:

- keyboard navigation
- focus indicators
- screen readers
- AA contrast levels
- responsive layouts

---

# Implementation Priority

Phase 1

EnterpriseToolbar

EnterpriseSearch

EnterpriseExportMenu

---

Phase 2

EnterpriseTable

EnterpriseBadge

EnterprisePagination

---

Phase 3

EnterpriseDialog

EnterpriseFormLayout

---

Phase 4

Dashboard Components

KPI Cards

Analytics Components

---

# Component Certification Checklist

Each new module must pass:

✅ Page Header

✅ Toolbar

✅ Search

✅ Filters

✅ Export

✅ Table

✅ Status Badges

✅ Dialog

✅ Responsive Layout

✅ Accessibility

before considered production ready.

---

# Approval

Robotron Enterprise Components v1

Status:

Approved for implementation

Applies To:

- Dashboard
- Asset Management
- Business Management
- Administration
- Reporting
- Future modules

Goal:

One platform.

One language.

One experience.