import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { EmployeeService }
from '../services/employee.service';

import { DepartmentService }
from '../../departments/services/department.service';

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
export class EmployeesComponent implements OnInit {

  employees: EmployeeResponse[] = [];

  departments: DepartmentResponse[] = [];

  successMessage = '';

  errorMessage = '';

  isEditMode = false;

  editingEmployeeId: number | null = null;

  employeeForm: EmployeeCreateRequest = {

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
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
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

          this.employees = data;
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
        }

      });
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
  }

  archiveEmployee(
    employee: EmployeeResponse
  ): void {

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