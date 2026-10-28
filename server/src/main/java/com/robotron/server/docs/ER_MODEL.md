# Robotron ER Model

## Business Management

Category
Product

### Relations

Category 1:N Product

---

## Asset Management

Department
Employee
EmploymentContract

### Relations

Department 1:N Employee
Employee 1:N EmploymentContract

---

## Devices

Device
DeviceAssignment

### Relations

Product 1:N Device
Employee 1:N DeviceAssignment
Device 1:N DeviceAssignment

---

## Security

User
Role
Permission

### Relations

User N:M Role
Role N:M Permission

---

## Licenses

SoftwareLicense
LicenseAssignment

### Relations

SoftwareLicense 1:N LicenseAssignment
Employee 1:N LicenseAssignment

---

## Orders

User 1:N Order