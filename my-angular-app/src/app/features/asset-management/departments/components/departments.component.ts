import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { DepartmentService }
from '../services/department.service';

import { ExportService }
from '../../../../shared/services/export.service';

import { DepartmentResponse }
from '../models/department-response.model';

import { DepartmentCreateRequest }
from '../models/department-create-request.model';

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
export class DepartmentsComponent
implements OnInit {

  allDepartments:
    DepartmentResponse[] = [];

  filteredDepartments:
    DepartmentResponse[] = [];

  searchTerm = '';

  selectedExportFormat = '';

  exportMenuOpen = false;

  sortColumn = 'departmentCode';

  sortDirection:
    'asc'
    | 'desc'
    = 'asc';

  openMenuId:
    number | null = null;

  successMessage = '';

  errorMessage = '';

  isLoading = false;

  isEditMode = false;

  showDialog = false;

  editingDepartmentId:
    number | null = null;

  departmentForm:
    DepartmentCreateRequest = {

    departmentCode: '',

    name: '',

    description: ''

  };

  constructor(

    private departmentService:
      DepartmentService,

    private exportService:
      ExportService,

    private cdr:
      ChangeDetectorRef

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

          this.allDepartments = data;

          this.filteredDepartments = data;

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

  applyFilters(): void {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    if (!search) {

      this.filteredDepartments =
        [...this.allDepartments];

      return;
    }

    this.filteredDepartments =
      this.allDepartments.filter(
        department =>

          department.departmentCode
            .toLowerCase()
            .includes(search)

          ||

          department.name
            .toLowerCase()
            .includes(search)

          ||

          department.description
            .toLowerCase()
            .includes(search)
      );
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

  get sortedDepartments():
    DepartmentResponse[] {

    const data =
      [...this.filteredDepartments];

    data.sort((a, b) => {

      let valueA = '';

      let valueB = '';

      switch (
        this.sortColumn
      ) {

        case 'departmentCode':

          valueA =
            a.departmentCode;

          valueB =
            b.departmentCode;

          break;

        case 'name':

          valueA =
            a.name;

          valueB =
            b.name;

          break;

        case 'description':

          valueA =
            a.description;

          valueB =
            b.description;

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

  exportData(): void {

    const exportData =
      this.sortedDepartments.map(
        department => ({

          DepartmentCode:
            department.departmentCode,

          DepartmentName:
            department.name,

          Description:
            department.description,

          Active:
            department.active
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
            'departments'
          );

        break;

      case 'excel':

        this.exportService
          .exportToExcel(
            exportData,
            'departments'
          );

        break;

      case 'pdf':

        this.exportService
          .exportToPdf(
            exportData,
            'departments'
          );

        break;
    }

    this.selectedExportFormat = '';
  }

  toggleExportMenu(): void {

  this.exportMenuOpen =
    !this.exportMenuOpen;
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
    departmentId: number
  ): void {

    this.openMenuId =
      this.openMenuId === departmentId
        ? null
        : departmentId;
  }

  closeMenu(): void {

    this.openMenuId = null;
  }

  openCreateDialog(): void {

    this.isEditMode = false;

    this.editingDepartmentId = null;

    this.resetForm();

    this.showDialog = true;
  }

  closeDialog(): void {

    this.showDialog = false;

    this.cancelEdit();
  }

  saveDepartment(): void {

    this.successMessage = '';

    this.errorMessage = '';

    if (
      !this.departmentForm.departmentCode.trim()
      ||
      !this.departmentForm.name.trim()
    ) {

      this.errorMessage =
        'Abteilungscode und Name sind Pflichtfelder.';

      return;
    }

    if (
      this.isEditMode
      &&
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

            this.showDialog = false;

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
      .createDepartment(
        this.departmentForm
      )
      .subscribe({

        next: () => {

          this.successMessage =
            'Abteilung erfolgreich erstellt.';

          this.showDialog = false;

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
    department:
      DepartmentResponse
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

    this.showDialog = true;

    this.closeMenu();
  }

  archiveDepartment(
    department:
      DepartmentResponse
  ): void {

    this.closeMenu();

    const confirmed =
      confirm(
        `Abteilung "${department.name}" archivieren?`
      );

    if (!confirmed) {

      return;
    }

    this.departmentService
      .archiveDepartment(
        department.id
      )
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