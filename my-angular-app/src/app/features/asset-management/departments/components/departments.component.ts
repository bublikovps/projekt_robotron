import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DepartmentService } from '../services/department.service';

import { DepartmentResponse } from '../models/department-response.model';
import { DepartmentCreateRequest } from '../models/department-create-request.model';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departments: DepartmentResponse[] = [];

  successMessage = '';

  errorMessage = '';

  isLoading = false;

  isEditMode = false;

  editingDepartmentId: number | null = null;

  departmentForm: DepartmentCreateRequest = {
    departmentCode: '',
    name: '',
    description: ''
  };

  constructor(
    private departmentService: DepartmentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {

    this.isLoading = true;

    this.departmentService
      .getAllDepartments()
      .subscribe({

        next: (data) => {

          this.departments = data;

          this.isLoading = false;

          this.cdr.detectChanges();
        },

        error: (err) => {

          this.errorMessage =
            err.error?.message ??
            'Fehler beim Laden der Abteilungen.';

          this.isLoading = false;

          this.cdr.detectChanges();
        }

      });
  }

  saveDepartment(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (
      !this.departmentForm.departmentCode.trim() ||
      !this.departmentForm.name.trim()
    ) {

      this.errorMessage =
        'Abteilungscode und Name sind Pflichtfelder.';

      return;
    }

    if (
      this.isEditMode &&
      this.editingDepartmentId !== null
    ) {

      this.departmentService
        .updateDepartment(
          this.editingDepartmentId,
          this.departmentForm
        )
        .subscribe({

          next: () => {

            this.successMessage =
              'Abteilung erfolgreich aktualisiert.';

            this.cancelEdit();

            this.loadDepartments();
          },

          error: (err) => {

            this.errorMessage =
              err.error?.message ??
              'Fehler beim Bearbeiten.';
          }

        });

      return;
    }

    this.departmentService
      .createDepartment(this.departmentForm)
      .subscribe({

        next: () => {

          this.successMessage =
            'Abteilung erfolgreich erstellt.';

          this.resetForm();

          this.loadDepartments();
        },

        error: (err) => {

          this.errorMessage =
            err.error?.message ??
            'Fehler beim Erstellen.';
        }

      });
  }

  editDepartment(
    department: DepartmentResponse
  ): void {

    this.isEditMode = true;

    this.editingDepartmentId =
      department.id;

    this.departmentForm = {
      departmentCode:
        department.departmentCode,

      name:
        department.name,

      description:
        department.description
    };
  }

  archiveDepartment(
    department: DepartmentResponse
  ): void {

    const confirmed = confirm(
      `Abteilung "${department.name}" archivieren?`
    );

    if (!confirmed) {
      return;
    }

    this.departmentService
      .archiveDepartment(department.id)
      .subscribe({

        next: (res) => {

          this.successMessage =
            res.message;

          this.loadDepartments();
        },

        error: (err) => {

          this.errorMessage =
            err.error?.message ??
            'Fehler beim Archivieren.';
        }

      });
  }

  cancelEdit(): void {

    this.isEditMode = false;

    this.editingDepartmentId = null;

    this.resetForm();
  }

  private resetForm(): void {

    this.departmentForm = {
      departmentCode: '',
      name: '',
      description: ''
    };
  }

}