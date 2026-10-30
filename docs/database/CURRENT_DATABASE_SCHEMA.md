\# CURRENT DATABASE SCHEMA



Project:

Robotron Enterprise IT Resource \& Asset Management Platform



Status:

Current Development Schema



Database:

PostgreSQL



Migrations:



V1 Initial Enterprise Schema

V2 Inventory Asset Separation

V3 Financial Reporting Foundation

V4 Default Roles and Permissions



\---



\# ARCHITECTURE PRINCIPLE



Business Domain

↓

Database

↓

Backend

↓

Frontend



DECISIONS.md remains the business source of truth.



CURRENT\_DATABASE\_SCHEMA.md reflects the actual PostgreSQL implementation.



\---



\# TABLES



\## categories



Purpose:



Product classification.



Columns:



id

name

is\_active



Relations:



Category 1 → N Product



Foreign Keys:



products.category\_id → categories.id



Delete Strategy:



ON DELETE SET NULL



\---



\## products



Purpose:



Commercial catalog items.



Columns:



id

sku

name

manufacturer

description



price



lagerbestand



is\_active



category\_id



created\_at

updated\_at



minimum\_stock



purchase\_price



supplier



sale\_price



Relations:



Category 1 → N Product



Product 1 → N Device



Business Rules:



Products may be sold.



Products may be transformed into Devices.



Products and Devices are separate lifecycle entities.



\---



\## orders



Purpose:



Customer orders.



Columns:



id



user\_id



customer\_type



vorname

nachname



company\_name



ust\_idnr



shipping\_address



total\_price



created\_at



Relations:



Order N → 1 User



Foreign Keys:



orders.user\_id → users.id



\---



\## department



Purpose:



Organizational structure.



Columns:



id



department\_code



name



description



active



created\_at

updated\_at



manager\_employee\_id



Relations:



Department 1 → N Employee



Employee 1 → 0..N Managed Departments



Foreign Keys:



manager\_employee\_id → employee.id



Delete Strategy:



ON DELETE SET NULL



\---



\## employee



Purpose:



Employee master data.



Columns:



id



department\_id



employee\_number



first\_name

last\_name



email

phone



position



hire\_date



termination\_date



active



created\_at

updated\_at



Relations:



Department 1 → N Employee



Employee 1 → 0..1 User



Employee 1 → N EmploymentContract



Employee 1 → N DeviceAssignment



Employee 1 → N LicenseAssignment



\---



\## employment\_contract



Purpose:



Employment information.



Columns:



id



employee\_id



contract\_number



contract\_type



start\_date

end\_date



weekly\_hours



salary



active



created\_at

updated\_at



Relations:



Employee 1 → N EmploymentContract



\---



\## device



Purpose:



Physical company assets.



Columns:



id



product\_id



inventory\_number



serial\_number



manufacturer\_asset\_tag



purchase\_date



purchase\_price



current\_value



retirement\_date



warranty\_until



status



location



notes



active



created\_at

updated\_at



Relations:



Product 1 → N Device



Device 1 → N DeviceAssignment



Business Rule:



Device never becomes Product again.



\---



\## software\_license



Purpose:



Software asset management.



Columns:



id



license\_number



software\_name



vendor



license\_key



license\_type



quantity



purchase\_date



expiration\_date



status



notes



active



created\_at

updated\_at



Relations:



SoftwareLicense 1 → N LicenseAssignment



\---



\## device\_assignment



Purpose:



Device allocation history.



Columns:



id



employee\_id



device\_id



assigned\_by\_user\_id



assigned\_date



expected\_return\_date



returned\_date



status



notes



created\_at

updated\_at



Relations:



Employee ↔ Device



Business Lifecycle:



ACTIVE

RETURNED

LOST

DAMAGED



\---



\## license\_assignment



Purpose:



Software allocation history.



Columns:



id



employee\_id



license\_id



assigned\_by\_user\_id



assigned\_date



expiration\_date



revoked\_date



status



notes



created\_at

updated\_at



Relations:



Employee ↔ SoftwareLicense



Business Lifecycle:



ACTIVE

REVOKED

EXPIRED

TRANSFERRED



\---



\## users



Purpose:



Authentication and Authorization.



Columns:



id



login



email



password\_hash



created\_at



password\_change\_required



active



employee\_id



Relations:



Employee 1 → 0..1 User



User N ↔ N Role



Foreign Keys:



employee\_id → employee.id



Delete Strategy:



ON DELETE RESTRICT



Unique:



login



email



employee\_id



\---



\## roles



Purpose:



Role Based Access Control.



Columns:



id



name



description



Relations:



Role N ↔ N User



Role N ↔ N Permission



\---



\## permissions



Purpose:



Permission Based Authorization.



Columns:



id



name



description



Relations:



Permission N ↔ N Role



\---



\## user\_roles



Purpose:



User ↔ Role mapping.



Columns:



user\_id



role\_id



Relations:



User N ↔ N Role



Composite Primary Key:



user\_id

role\_id



\---



\## role\_permissions



Purpose:



Role ↔ Permission mapping.



Columns:



role\_id



permission\_id



Relations:



Role N ↔ N Permission



Composite Primary Key:



role\_id

permission\_id



\---



\## password\_reset\_tokens



Purpose:



Password recovery.



Columns:



id



token



user\_id



expiry\_date



Relations:



User 1 → N Reset Tokens



Delete Strategy:



ON DELETE CASCADE



\---



\## system\_settings



Purpose:



Application configuration.



Columns:



id



setting\_key



setting\_value



\---



\# REPORTING VIEWS



\## inventory\_value\_report



Purpose:



Inventory valuation.



\---



\## asset\_value\_report



Purpose:



Asset valuation.



\---



\## department\_asset\_value\_report



Purpose:



Department asset valuation.



\---



\# DATABASE FUNCTIONS



update\_device\_status()



Purpose:



Device status synchronization.



\---



update\_updated\_at\_column()



Purpose:



Automatic updated\_at maintenance.



\---



\# ROLES



ROLE\_CUSTOMER



ROLE\_MANAGER



ROLE\_ADMIN



ROLE\_DIRECTOR



\---



\# CORE PERMISSIONS



PRODUCT\_VIEW

PRODUCT\_CREATE

PRODUCT\_EDIT

PRODUCT\_ARCHIVE



CATEGORY\_VIEW

CATEGORY\_CREATE

CATEGORY\_EDIT

CATEGORY\_ARCHIVE



DEPARTMENT\_VIEW

DEPARTMENT\_CREATE

DEPARTMENT\_EDIT

DEPARTMENT\_ARCHIVE



EMPLOYEE\_VIEW

EMPLOYEE\_CREATE

EMPLOYEE\_EDIT

EMPLOYEE\_ARCHIVE



CONTRACT\_VIEW

CONTRACT\_CREATE

CONTRACT\_EDIT

CONTRACT\_ARCHIVE



DEVICE\_VIEW

DEVICE\_CREATE

DEVICE\_EDIT

DEVICE\_ARCHIVE



LICENSE\_VIEW

LICENSE\_CREATE

LICENSE\_EDIT

LICENSE\_ARCHIVE



ASSIGNMENT\_VIEW

ASSIGNMENT\_CREATE

ASSIGNMENT\_RETURN



LICENSE\_ASSIGNMENT\_VIEW

LICENSE\_ASSIGNMENT\_CREATE

LICENSE\_ASSIGNMENT\_REVOKE



REPORT\_VIEW



USER\_CREATE

USER\_EDIT



ROLE\_MANAGE

PERMISSION\_MANAGE



\---



\# PRODUCT LIFECYCLE



Category

↓

Product

↓

Warehouse



Product

↓

Sale



or



Product

↓

Device Creation



\---



\# DEVICE LIFECYCLE



IN\_STOCK

↓

ASSIGNED

↓

RETURNED

↓

REPAIR

↓

RETIRED

↓

DISPOSED



\---



\# IMPORTANT RULE



Product ≠ Device



Product:



Commercial catalog item.



Device:



Physical company asset.



A Device never becomes a Product again.

