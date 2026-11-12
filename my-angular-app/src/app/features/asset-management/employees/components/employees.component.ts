import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { EmployeeService }
from '../services/employee.service';

import { DepartmentService }
from '../../departments/services/department.service';

import { ExportService }
from '../../../../shared/services/export.service';

import { EmployeeResponse }
from '../models/employee-response.model';

import { EmployeeCreateRequest }
from '../models/employee-create-request.model';

import { DepartmentResponse }
from '../../departments/models/department-response.model';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent
implements OnInit {

  allEmployees: EmployeeResponse[] = [];

  filteredEmployees: EmployeeResponse[] = [];

  departments: DepartmentResponse[] = [];

  searchTerm = '';

  selectedDepartment = '';

  selectedExportFormat = '';

  departmentMenuOpen = false;

  exportMenuOpen = false;

  sortColumn = 'employeeNumber';

  sortDirection:
    'asc'
    | 'desc'
    = 'asc';

  openMenuId:
    number | null = null;

  successMessage = '';

  errorMessage = '';

  isEditMode = false;

  showDialog = false;

  editingEmployeeId:
    number | null = null;

  employeeForm:
    EmployeeCreateRequest = {

    departmentId: 0,

    employeeNumber: '',

    firstName: '',

    lastName: '',

    email: '',

    phone: '',

    position: '',

    hireDate: ''

  };

  constructor(

    private employeeService:
      EmployeeService,

    private departmentService:
      DepartmentService,

    private exportService:
      ExportService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadDepartments();

    this.loadEmployees();
  }

  loadEmployees(): void {

    this.employeeService
      .getAllEmployees()
      .subscribe({

        next: (data) => {

          this.allEmployees = data;

          this.filteredEmployees = data;

          this.cdr.detectChanges();
        },

        error: () => {

          this.errorMessage =
            'Fehler beim Laden der Mitarbeiter.';
        }

      });
  }

  loadDepartments(): void {

    this.departmentService
      .getAllDepartments()
      .subscribe({

        next: (data) => {

          this.departments = data;

          this.cdr.detectChanges();
        }

      });
  }

  applyFilters(): void {

    let data = [...this.allEmployees];

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    if (search) {

      data = data.filter(employee =>

        employee.firstName
          .toLowerCase()
          .includes(search)

        ||

        employee.lastName
          .toLowerCase()
          .includes(search)

        ||

        employee.employeeNumber
          .toLowerCase()
          .includes(search)

        ||

        employee.email
          .toLowerCase()
          .includes(search)

        ||

        employee.position
          .toLowerCase()
          .includes(search)

      );
    }

    if (this.selectedDepartment) {

      data = data.filter(employee =>

        employee.departmentName ===
        this.selectedDepartment

      );
    }

    this.filteredEmployees = data;
  }

  toggleDepartmentMenu(): void {

  this.departmentMenuOpen =
    !this.departmentMenuOpen;

  if (
    this.departmentMenuOpen
  ) {

    this.exportMenuOpen =
      false;
  }
}

selectDepartment(
  department: string
): void {

  this.selectedDepartment =
    department;

  this.departmentMenuOpen =
    false;

  this.applyFilters();
}

clearDepartmentFilter(): void {

  this.selectedDepartment =
    '';

  this.departmentMenuOpen =
    false;

  this.applyFilters();
}

  sortBy(
    column: string
  ): void {

    if (
      this.sortColumn === column
    ) {

      this.sortDirection =
        this.sortDirection === 'asc'
          ? 'desc'
          : 'asc';

      return;
    }

    this.sortColumn = column;

    this.sortDirection = 'asc';
  }

  get sortedEmployees():
    EmployeeResponse[] {

    const data =
      [...this.filteredEmployees];

    data.sort((a, b) => {

      let valueA = '';

      let valueB = '';

      switch (
        this.sortColumn
      ) {

        case 'employeeNumber':

          valueA =
            a.employeeNumber;

          valueB =
            b.employeeNumber;

          break;

        case 'name':

          valueA =
            `${a.firstName} ${a.lastName}`;

          valueB =
            `${b.firstName} ${b.lastName}`;

          break;

        case 'department':

          valueA =
            a.departmentName;

          valueB =
            b.departmentName;

          break;

        case 'email':

          valueA =
            a.email;

          valueB =
            b.email;

          break;

        case 'position':

          valueA =
            a.position;

          valueB =
            b.position;

          break;
      }

      const result =
        valueA.localeCompare(
          valueB
        );

      return this.sortDirection === 'asc'
        ? result
        : -result;
    });

    return data;
  }

  getSortIcon(
    column: string
  ): string {

    if (
      this.sortColumn !== column
    ) {

      return '↕';
    }

    return this.sortDirection === 'asc'
      ? '↑'
      : '↓';
  }

  exportData(): void {

    const exportData =
      this.sortedEmployees.map(
        employee => ({

          EmployeeNumber:
            employee.employeeNumber,

          FirstName:
            employee.firstName,

          LastName:
            employee.lastName,

          Department:
            employee.departmentName,

          Email:
            employee.email,

          Phone:
            employee.phone,

          Position:
            employee.position,

          Active:
            employee.active
              ? 'Yes'
              : 'No'

        })
      );

    switch (
      this.selectedExportFormat
    ) {

      case 'csv':

        this.exportService
          .exportToCsv(
            exportData,
            'employees'
          );

        break;

      case 'excel':

        this.exportService
          .exportToExcel(
            exportData,
            'employees'
          );

        break;

      case 'pdf':

        this.exportService
          .exportToPdf(
            exportData,
            'employees'
          );

        break;
    }

    this.selectedExportFormat = '';
  }

  toggleExportMenu(): void {

  this.exportMenuOpen =
    !this.exportMenuOpen;

  if (
    this.exportMenuOpen
  ) {

    this.departmentMenuOpen =
      false;
  }
}

exportAs(
  format: string
): void {

  this.selectedExportFormat =
    format;

  this.exportData();

  this.exportMenuOpen = false;
}

  toggleMenu(
    employeeId: number
  ): void {

    this.openMenuId =
      this.openMenuId === employeeId
        ? null
        : employeeId;
  }

  closeMenu(): void {

    this.openMenuId = null;
  }

  openCreateDialog(): void {

    this.isEditMode = false;

    this.editingEmployeeId = null;

    this.resetForm();

    this.showDialog = true;
  }

  closeDialog(): void {

  this.showDialog = false;

  this.departmentMenuOpen = false;

  this.exportMenuOpen = false;

  this.cancelEdit();
}




  saveEmployee(): void {

    this.successMessage = '';

    this.errorMessage = '';

    if (
      this.isEditMode &&
      this.editingEmployeeId !== null
    ) {

      this.employeeService
        .updateEmployee(
          this.editingEmployeeId,
          this.employeeForm
        )
        .subscribe({

          next: () => {

            this.successMessage =
              'Mitarbeiter aktualisiert.';

            this.showDialog = false;

            this.cancelEdit();

            this.loadEmployees();
          },

          error: (err) => {

            this.errorMessage =
              err.error?.message ??
              'Fehler beim Bearbeiten.';
          }

        });

      return;
    }

    this.employeeService
      .createEmployee(
        this.employeeForm
      )
      .subscribe({

        next: () => {

          this.successMessage =
            'Mitarbeiter erstellt.';

          this.showDialog = false;

          this.resetForm();

          this.loadEmployees();
        },

        error: (err) => {

          this.errorMessage =
            err.error?.message ??
            'Fehler beim Erstellen.';
        }

      });
  }

  editEmployee(
    employee: EmployeeResponse
  ): void {

    this.isEditMode = true;

    this.editingEmployeeId =
      employee.id;

    this.employeeForm = {

      departmentId:
        employee.departmentId,

      employeeNumber:
        employee.employeeNumber,

      firstName:
        employee.firstName,

      lastName:
        employee.lastName,

      email:
        employee.email,

      phone:
        employee.phone,

      position:
        employee.position,

      hireDate: ''

    };

    this.showDialog = true;

    this.closeMenu();
  }

  archiveEmployee(
    employee: EmployeeResponse
  ): void {

    this.closeMenu();

    if (
      !confirm(
        `Mitarbeiter "${employee.firstName} ${employee.lastName}" archivieren?`
      )
    ) {

      return;
    }

    this.employeeService
      .archiveEmployee(
        employee.id
      )
      .subscribe({

        next: (res) => {

          this.successMessage =
            res.message;

          this.loadEmployees();
        }

      });
  }

  cancelEdit(): void {

    this.isEditMode = false;

    this.editingEmployeeId = null;

    this.resetForm();
  }

  private resetForm(): void {

    this.employeeForm = {

      departmentId: 0,

      employeeNumber: '',

      firstName: '',

      lastName: '',

      email: '',

      phone: '',

      position: '',

      hireDate: ''

    };
  }

}