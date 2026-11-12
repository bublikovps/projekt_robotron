# Robotron Enterprise UX Blueprint v1

Version: 1.0

Status: Approved

Owner: Robotron Enterprise Platform

Related Document:
Robotron-Enterprise-Design-Language-v1.md

Last Updated: 2026-11

---

# Purpose

This document defines how users interact with the Robotron Enterprise Platform.

The goal is not only visual consistency but also workflow consistency.

Users should immediately understand how to work with any module because all modules follow the same interaction rules.

The UX blueprint applies to:

- Dashboard
- Catalog
- Business Management
- Asset Management
- Administration
- Reporting
- Future modules

---

# UX Philosophy

The platform follows a hybrid model:

Customer-facing modules:

- Catalog

Employee-facing modules:

- Asset Management
- Business Management
- Administration
- Reporting

Both areas share the same brand identity but use different interaction patterns.

---

# UX Principle 1

## Information First

Useful information is always more important than decoration.

Good:

- Data visible immediately
- Important actions visible immediately
- Minimal navigation depth

Avoid:

- Large decorative banners
- Excessive empty space
- Hidden actions

---

# UX Principle 2

## Maximum Two Click Rule

The most common action should require no more than two clicks.

Examples:

Create Employee

Click:
+ Employee

Click:
Save

Total:
2 clicks

---

View Device

Click:
Device

Total:
1 click

---

Export Report

Click:
Export

Click:
Excel

Total:
2 clicks

---

# UX Principle 3

## Workspace Consistency

All management modules share the same structure.

Users should never learn a new navigation pattern when switching modules.

---

# Global Platform Structure

Layout:

┌──────────────────────────────────────────────┐
│ Top Navigation                              │
├──────────────────────────────────────────────┤
│ Workspace Header                            │
├──────────────────────────────────────────────┤
│ Toolbar                                     │
├──────────────────────────────────────────────┤
│ Content                                     │
└──────────────────────────────────────────────┘

---

# Top Navigation

Persistent across entire platform.

Structure:

Dashboard

Catalog

Business Management

Asset Management

Administration

News

Support

Profile

Rules:

- fixed position
- active module highlighted
- user menu always visible
- responsive on tablets
- collapsible on mobile

---

# Dashboard UX

Purpose:

System entry point.

Dashboard is not navigation only.

Dashboard is a command center.

---

Desktop Layout

┌─────────────────────────────────────┐
│ Welcome                             │
└─────────────────────────────────────┘

┌──────────┐
│ KPI      │
└──────────┘

┌──────────┐
│ KPI      │
└──────────┘

┌──────────┐
│ KPI      │
└──────────┘

┌──────────┐
│ KPI      │
└──────────┘

─────────────────────────────────────

Modules

┌──────────────┐
│ Asset Mgmt   │
└──────────────┘

┌──────────────┐
│ Business     │
└──────────────┘

┌──────────────┐
│ Admin        │
└──────────────┘

---

Dashboard KPIs

Planned Cards:

Employees

Devices

Assigned Devices

Available Devices

Licenses

Assigned Licenses

Products

Low Stock Products

Contracts

Expiring Licenses

Upcoming Returns

---

# Workspace UX Pattern

Applies to:

- Employees
- Devices
- Licenses
- Contracts
- Products
- Categories
- Assignments

Layout:

┌──────────────────────────────────────────────┐
│ Page Header                                  │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ Toolbar                                      │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ Content                                      │
└──────────────────────────────────────────────┘

---

# Page Header Standard

Desktop

┌──────────────────────────────────────────────┐
│ Employees                    + New Employee  │
│ Manage employees and roles                  │
└──────────────────────────────────────────────┘

Rules:

- compact height
- one-line description
- action button aligned right

---

# Enterprise Toolbar Standard

All workspace modules use one toolbar pattern.

Desktop Layout

┌──────────────────────────────────────────────┐
│ Search                                       │
│ Filters                                      │
│ Export                                       │
│ Quick Actions                                │
└──────────────────────────────────────────────┘

---

Employee Toolbar

Search Employees

Department Filter

Export

Refresh

---

Devices Toolbar

Search Devices

Status Filter

Location Filter

Export

Refresh

---

Software Licenses Toolbar

Search Licenses

Vendor Filter

License Type Filter

Export

Refresh

---

Products Toolbar

Search Products

Category Filter

Export

Refresh

---

Reports Toolbar

Period Filter

Department Filter

Export

Refresh

---

# Search UX

Search must always be visible.

Desktop

┌──────────────────────────────┐
│ Search employees...          │
└──────────────────────────────┘

Width:

Preferred:
400px

Minimum:
320px

---

# Export UX

Every module supports export.

Layout:

┌────────────┐
│ Export ▼   │
└────────────┘

Menu:

Excel (.xlsx)

PDF (.pdf)

CSV (.csv)

Rules:

- identical behavior everywhere
- same icons
- same order

---

# Table UX

Tables are the primary workspace element.

Layout

┌──────────────────────────────────────────────┐
│ Toolbar                                      │
├──────────────────────────────────────────────┤
│ Table                                        │
└──────────────────────────────────────────────┘

Rules:

- compact density
- sortable columns
- hover state
- sticky header (future phase)
- responsive horizontal scrolling

---

# Action UX

Current Version:

Button Based

Edit

Archive

Assign

Return

Revoke

---

Future Version:

Context Menu

⋮

Edit

View

Archive

Delete

Export

---

# Status Badge UX

Success

ACTIVE

AVAILABLE

COMPLETED

---

Info

ASSIGNED

IN USE

---

Warning

EXPIRING

REPAIR

DUE SOON

---

Danger

ARCHIVED

REVOKED

RETIRED

---

# Dialog UX

Dialogs handle Create and Edit workflows.

Maximum width:

720px

Preferred width:

640px

Preferred layout:

Two-column grid

---

Example

Department       Employee Number

First Name       Last Name

Email            Phone

Position         Hire Date

---

Buttons

Save

Cancel

---

Rules

- avoid scrolling
- most forms fit one screen
- field labels clear and short

---

# Asset Management Blueprint

Structure

Asset Management

Master Data

Departments

Employees

Contracts

---

Operations

Devices

Software Licenses

Device Assignments

License Assignments

---

Analytics

Asset Reports

---

Target Layout

┌──────────────────────────────────────────────┐
│ Asset Management                             │
├──────────────────────────────────────────────┤
│ Search / Filters / Export / Action          │
├──────────────────────────────────────────────┤
│ Table or Report                             │
└──────────────────────────────────────────────┘

---

# Business Management Blueprint

Structure

Categories

Products

Reports

Inventory

Margins

Suppliers

---

Layout

Same workspace model as Asset Management.

---

# Reporting Blueprint

Reports follow a unified design.

Layout

┌──────────────────────────────────────────────┐
│ Report Header                               │
├──────────────────────────────────────────────┤
│ Filters                                     │
├──────────────────────────────────────────────┤
│ Export                                      │
├──────────────────────────────────────────────┤
│ Table / Chart                               │
└──────────────────────────────────────────────┘

---

Future Report Features

Date Range

Department Filter

Search

Excel Export

PDF Export

CSV Export

Print

---

# Catalog Blueprint

Catalog follows a separate UX model.

Reason:

Catalog is customer-oriented.

Layout

Hero Area

Categories

Search

Products

Pagination

---

Desktop Layout

┌──────────────────────────────────────────────┐
│ Categories                                  │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ Search                                      │
└──────────────────────────────────────────────┘

┌────────┐
│ Card   │
└────────┘

┌────────┐
│ Card   │
└────────┘

┌────────┐
│ Card   │
└────────┘

---

Future Catalog Features

Shopping Cart

Favorites

Product Comparison

Availability Indicators

Personal Recommendations

Order History

---

# Mobile UX

All modules must support:

Phones

Tablets

Laptops

Desktop Monitors

---

Breakpoints

Mobile:
0-768px

Tablet:
769-1024px

Desktop:
1025px+

---

Mobile Workspace

Header

↓

Toolbar Stack

↓

Content

↓

Actions

---

Mobile Toolbar

Search

↓

Filters

↓

Export

↓

Action Button

---

Mobile Tables

Use horizontal scroll.

Never hide data.

---

# Accessibility

Required

Keyboard Navigation

Visible Focus States

AA Color Contrast

Screen Reader Friendly Labels

Consistent Form Inputs

Consistent Validation Messages

---

# Roadmap

UX Blueprint v2

Universal Search

Advanced Filters

Saved Views

Dashboard Personalization

Command Bar

Notification Center

Dark Theme

Activity Timeline

Context Menus

Advanced Exports

---

# Approval

Robotron Enterprise UX Blueprint v1

Status:

Approved for implementation

Implementation Strategy:

Phase 1
Enterprise Toolbar

Phase 2
Enterprise Table

Phase 3
Enterprise Dialog

Phase 4
Export System

Phase 5
Workspace Refactoring

Phase 6
Dashboard Modernization

Phase 7
Catalog Commerce Features

Target Result:

One consistent enterprise platform experience across all Robotron modules.