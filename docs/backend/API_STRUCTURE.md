\# API Structure



\## Base URL



```text

/api

```



\---



\# Authentication



\## Base Path



```text

/api/auth

```



\### Endpoints



```text

POST /login



POST /register



POST /forgot-password



POST /reset-password



POST /change-password

```



\---



\# Product Management



\## Base Path



```text

/api/products

```



\### Standard Operations



```text

GET



GET /{id}



POST



PUT /{id}



DELETE /{id}



PUT /{id}/restore



DELETE /{id}/permanent

```



\---



\# Category Management



\## Base Path



```text

/api/categories

```



\### Standard Operations



```text

GET



GET /{id}



POST



PUT /{id}



DELETE /{id}



PUT /{id}/restore



DELETE /{id}/permanent

```



\---



\# Department Management



\## Base Path



```text

/api/departments

```



\### Standard Operations



```text

GET



GET /{id}



POST



PUT /{id}



DELETE /{id}



PUT /{id}/restore



DELETE /{id}/permanent

```



\---



\# Employee Management



\## Base Path



```text

/api/employees

```



\### Standard Operations



```text

GET



GET /{id}



POST



PUT /{id}



DELETE /{id}



PUT /{id}/restore



DELETE /{id}/permanent

```



\---



\# Employment Contract Management



\## Base Path



```text

/api/contracts

```



\### Standard Operations



```text

GET



GET /{id}



POST



PUT /{id}



DELETE /{id}



PUT /{id}/restore



DELETE /{id}/permanent

```



\---



\# Device Management



\## Base Path



```text

/api/devices

```



\### Standard Operations



```text

GET



GET /{id}



POST



PUT /{id}



DELETE /{id}



PUT /{id}/restore



DELETE /{id}/permanent

```



\---



\# Software License Management



\## Base Path



```text

/api/licenses

```



\### Standard Operations



```text

GET



GET /{id}



POST



PUT /{id}



DELETE /{id}



PUT /{id}/restore



DELETE /{id}/permanent

```



\---



\# Device Assignment Management



\## Base Path



```text

/api/device-assignments

```



\### Business Actions



```text

Assign Device



Return Device



Mark Lost



Mark Damaged

```



\### Lifecycle



```text

ACTIVE

RETURNED

LOST

DAMAGED

```



\### Rules



```text

One active assignment per device.



A device cannot be assigned to multiple

employees simultaneously.

```



\---



\# License Assignment Management



\## Base Path



```text

/api/license-assignments

```



\### Business Actions



```text

Assign License



Revoke License



Transfer License



Expire License

```



\### Lifecycle



```text

ACTIVE

REVOKED

TRANSFERRED

EXPIRED

```



\### Rules



```text

used\_quantity <= quantity



License assignment increases used\_quantity.



License revocation decreases used\_quantity.

```



\---



\# User Management



\## Base Path



```text

/api/users

```



\### Operations



```text

GET



GET /{id}



POST



PUT



DELETE



RESTORE



PERMANENT DELETE

```



\---



\# Role Management



\## Base Path



```text

/api/roles

```



\### Operations



```text

GET



GET /{id}



POST



PUT



DELETE

```



\---



\# Permission Management



\## Base Path



```text

/api/permissions

```



\### Operations



```text

GET



GET /{id}



POST



PUT



DELETE

```



\---



\# System Settings



\## Base Path



```text

/api/system-settings

```



\### Operations



```text

GET



GET /{id}



POST



PUT



DELETE

```



\---



\# API Rules



\## Master Data



Every master data entity supports:



```text

Create

Read

Update



Archive

Restore

Permanent Delete

```



\### Entities



```text

Product

Category

Department

Employee

EmploymentContract

Device

SoftwareLicense

```



\---



\## Business Processes



Business processes expose actions instead of generic updates.



\### Examples



```text

Return Device



Revoke License



Transfer License



Expire License

```



\---



\# Swagger Standard



Every controller must define:



```java

@Tag

```



Every endpoint must define:



```java

@Operation

```



\---



\# Naming Convention



```text

Department Management



Employee Management



Contract Management



Device Management



Software License Management



Device Assignment Management



License Assignment Management



Product Management



Category Management

```

