\# Role Model



\## Security Model



The platform uses Role-Based Access Control (RBAC).



Authorization hierarchy:



```text

ROLE\_DIRECTOR

&#x20;   ↓

ROLE\_ADMIN

&#x20;   ↓

ROLE\_MANAGER

&#x20;   ↓

ROLE\_CUSTOMER

```



Higher roles inherit business capabilities from lower roles where applicable.



\---



\## ROLE\_CUSTOMER



Purpose:



```text

Customer

Employee Self Service

Portal User

```



Capabilities:



```text

View Product Catalog



View Categories



Manage Own Profile



Change Password



View Own Orders



Access Public Pages

```



Permissions:



```text

PRODUCT\_READ



CATEGORY\_READ



PROFILE\_READ



PROFILE\_EDIT



PASSWORD\_CHANGE

```



\---



\## ROLE\_MANAGER



Purpose:



```text

Business Operations



Warehouse Operations



Catalog Management

```



Capabilities:



```text

Manage Products



Manage Categories



Manage Warehouse



Manage Orders



Import Products



Export Products



View Reports

```



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



\---



\## ROLE\_ADMIN



Purpose:



```text

Internal Administration



Asset Management



Personnel Management

```



Capabilities:



```text

Manage Users



Manage Roles



Manage Employees



Manage Departments



Manage Contracts



Manage Devices



Manage Software Licenses



Manage Assignments

```



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



\---



\## ROLE\_DIRECTOR



Purpose:



```text

Executive Management



Full Platform Access

```



Capabilities:



```text

All Business Functions



All Administration Functions



All Asset Functions



All Financial Functions



All Reporting Functions



System Configuration

```



Permissions:



```text

ALL PERMISSIONS

```



Includes:



```text

System Settings



Audit



Reporting



Analytics



Financial Reporting



Asset Management



User Management



Business Management

```



\---



\## Future Role Extensions



Planned roles:



```text

ROLE\_AUDITOR



ROLE\_FINANCE



ROLE\_HR



ROLE\_SUPPORT

```



Status:



```text

Planned

```

