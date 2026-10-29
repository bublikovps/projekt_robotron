\# Permission Matrix



\## Permission Architecture



Authorization Model:



```text

Business Capability

↓

Permission

↓

Role

↓

Backend Security

↓

Frontend Visibility

```



Permissions are defined before:



```text

Role Mapping



Security Configuration



Frontend Navigation

```



\---



\# ROLE\_CUSTOMER



Permissions:



```text

PRODUCT\_READ



CATEGORY\_READ



PROFILE\_READ



PROFILE\_EDIT



PASSWORD\_CHANGE

```



Modules:



```text

Catalog



Profile



Own Orders

```



\---



\# ROLE\_MANAGER



Permissions:



```text

PRODUCT\_\*



CATEGORY\_\*



WAREHOUSE\_\*



ORDER\_\*



PRODUCT\_IMPORT



PRODUCT\_EXPORT



REPORT\_VIEW

```



Modules:



```text

Products



Categories



Warehouse



Orders



Reports

```



\---



\# ROLE\_ADMIN



Permissions:



```text

USER\_\*



ROLE\_\*



DEPARTMENT\_\*



EMPLOYEE\_\*



CONTRACT\_\*



DEVICE\_\*



LICENSE\_\*



ASSIGNMENT\_\*



LICENSE\_ASSIGNMENT\_\*

```



Modules:



```text

User Management



Role Management



Department Management



Employee Management



Contract Management



Device Management



License Management



Assignment Management

```



\---



\# ROLE\_DIRECTOR



Permissions:



```text

ALL PERMISSIONS

```



Modules:



```text

System Settings



Financial Reports



Audit



Analytics



Asset Management



Administration



Business Management



Inventory Management

```



\---



\# Product Permissions



```text

PRODUCT\_READ



PRODUCT\_CREATE



PRODUCT\_EDIT



PRODUCT\_ARCHIVE



PRODUCT\_RESTORE



PRODUCT\_DELETE

```



\---



\# Category Permissions



```text

CATEGORY\_READ



CATEGORY\_CREATE



CATEGORY\_EDIT



CATEGORY\_ARCHIVE



CATEGORY\_RESTORE



CATEGORY\_DELETE

```



\---



\# Warehouse Permissions



```text

WAREHOUSE\_READ



WAREHOUSE\_CREATE



WAREHOUSE\_EDIT



WAREHOUSE\_ARCHIVE



WAREHOUSE\_RESTORE



WAREHOUSE\_DELETE

```



\---



\# Order Permissions



```text

ORDER\_READ



ORDER\_CREATE



ORDER\_EDIT



ORDER\_ARCHIVE



ORDER\_RESTORE



ORDER\_DELETE

```



\---



\# Department Permissions



```text

DEPARTMENT\_READ



DEPARTMENT\_CREATE



DEPARTMENT\_EDIT



DEPARTMENT\_ARCHIVE



DEPARTMENT\_RESTORE



DEPARTMENT\_DELETE

```



\---



\# Employee Permissions



```text

EMPLOYEE\_READ



EMPLOYEE\_CREATE



EMPLOYEE\_EDIT



EMPLOYEE\_ARCHIVE



EMPLOYEE\_RESTORE



EMPLOYEE\_DELETE

```



\---



\# Contract Permissions



```text

CONTRACT\_READ



CONTRACT\_CREATE



CONTRACT\_EDIT



CONTRACT\_ARCHIVE



CONTRACT\_RESTORE



CONTRACT\_DELETE

```



\---



\# Device Permissions



```text

DEVICE\_READ



DEVICE\_CREATE



DEVICE\_EDIT



DEVICE\_ARCHIVE



DEVICE\_RESTORE



DEVICE\_DELETE

```



\---



\# Software License Permissions



```text

LICENSE\_READ



LICENSE\_CREATE



LICENSE\_EDIT



LICENSE\_ARCHIVE



LICENSE\_RESTORE



LICENSE\_DELETE

```



\---



\# Device Assignment Permissions



```text

ASSIGNMENT\_READ



ASSIGNMENT\_CREATE



ASSIGNMENT\_RETURN



ASSIGNMENT\_CANCEL

```



Lifecycle:



```text

ACTIVE

↓

RETURNED



ACTIVE

↓

LOST



ACTIVE

↓

DAMAGED

```



\---



\# License Assignment Permissions



```text

LICENSE\_ASSIGNMENT\_READ



LICENSE\_ASSIGNMENT\_CREATE



LICENSE\_ASSIGNMENT\_REVOKE



LICENSE\_ASSIGNMENT\_TRANSFER

```



Lifecycle:



```text

ACTIVE

↓

REVOKED



ACTIVE

↓

TRANSFERRED



ACTIVE

↓

EXPIRED

```



\---



\# Financial Domain Permissions



```text

FINANCE\_READ



FINANCE\_REPORT\_VIEW



ASSET\_VALUATION\_VIEW



INVENTORY\_VALUATION\_VIEW



DEPRECIATION\_VIEW



BUDGET\_VIEW

```



Current Assignment:



```text

ROLE\_DIRECTOR

```



Future Assignment:



```text

ROLE\_FINANCE

```



\---



\# Audit Permissions



```text

AUDIT\_READ



AUDIT\_EXPORT

```



Current Assignment:



```text

ROLE\_DIRECTOR

```



Future Assignment:



```text

ROLE\_AUDITOR

```



\---



\# Permission Naming Standard



Format:



```text

<ENTITY>\_<ACTION>

```



Examples:



```text

DEVICE\_CREATE



DEVICE\_EDIT



DEVICE\_ARCHIVE



LICENSE\_ASSIGNMENT\_REVOKE



DEPARTMENT\_DELETE

```



\---



\# Wildcard Convention



Examples:



```text

PRODUCT\_\*



CATEGORY\_\*



DEVICE\_\*



USER\_\*

```



Meaning:



```text

All permissions belonging

to the specified entity.

```

