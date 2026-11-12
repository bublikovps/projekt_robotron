import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { EmployeeService }
from '../../employees/services/employee.service';

import { SoftwareLicenseService }
from '../../software-licenses/services/software-license.service';

import { LicenseAssignmentService }
from '../services/license-assignment.service';

import { ExportService }
from '../../../../shared/services/export.service';

import { EmployeeResponse }
from '../../employees/models/employee-response.model';

import { SoftwareLicenseResponse }
from '../../software-licenses/models/software-license-response.model';

import { LicenseAssignmentResponse }
from '../models/license-assignment-response.model';

import { LicenseAssignmentCreateRequest }
from '../models/license-assignment-create-request.model';

@Component({
  selector: 'app-license-assignments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl:
    './license-assignments.component.html',
  styleUrls: [
    './license-assignments.component.css'
  ]
})
export class LicenseAssignmentsComponent
implements OnInit {

  assignments:
    LicenseAssignmentResponse[] = [];

  filteredAssignments:
    LicenseAssignmentResponse[] = [];

  employees:
    EmployeeResponse[] = [];

  licenses:
    SoftwareLicenseResponse[] = [];

  searchTerm = '';

  selectedStatus = '';

  selectedExportFormat = '';

  statusMenuOpen = false;

  exportMenuOpen = false;

  openMenuId:
    number | null = null;

  sortColumn = 'softwareName';

  sortDirection:
    'asc'
    | 'desc'
    = 'asc';

  successMessage = '';

  errorMessage = '';

  showDialog = false;

  form:
    LicenseAssignmentCreateRequest = {

    employeeId: 0,

    licenseId: 0,

    assignedByUserId: 1,

    expirationDate: null,

    notes: ''

  };

  constructor(

    private assignmentService:
      LicenseAssignmentService,

    private employeeService:
      EmployeeService,

    private licenseService:
      SoftwareLicenseService,

    private exportService:
      ExportService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadAssignments();

    this.loadEmployees();

    this.loadLicenses();
  }

  loadAssignments(): void {

    this.assignmentService
      .getAllAssignments()
      .subscribe({

        next: data => {

          this.assignments = data;

          this.filteredAssignments =
            data;

          this.cdr.detectChanges();
        }

      });
  }

  loadEmployees(): void {

    this.employeeService
      .getAllEmployees()
      .subscribe({

        next: data => {

          this.employees = data;

          this.cdr.detectChanges();
        }

      });
  }

  loadLicenses(): void {

    this.licenseService
      .getAllLicenses()
      .subscribe({

        next: data => {

          this.licenses = data;

          this.cdr.detectChanges();
        }

      });
  }

  get statuses(): string[] {

    return [
      ...new Set(
        this.assignments.map(
          item => item.status
        )
      )
    ].sort();
  }

  applyFilters(): void {

    let data =
      [...this.assignments];

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    if (search) {

      data = data.filter(
        item =>

          item.softwareName
            .toLowerCase()
            .includes(search)

          ||

          item.employeeName
            .toLowerCase()
            .includes(search)

          ||

          item.status
            .toLowerCase()
            .includes(search)
      );
    }

    if (this.selectedStatus) {

      data = data.filter(
        item =>
          item.status ===
          this.selectedStatus
      );
    }

    this.filteredAssignments =
      data;
  }

  toggleStatusMenu(): void {

    this.statusMenuOpen =
      !this.statusMenuOpen;

    if (
      this.statusMenuOpen
    ) {

      this.exportMenuOpen =
        false;
    }
  }

  clearStatusFilter(): void {

    this.selectedStatus = '';

    this.statusMenuOpen = false;

    this.applyFilters();
  }

  selectStatus(
    status: string
  ): void {

    this.selectedStatus =
      status;

    this.statusMenuOpen = false;

    this.applyFilters();
  }

  toggleExportMenu(): void {

    this.exportMenuOpen =
      !this.exportMenuOpen;

    if (
      this.exportMenuOpen
    ) {

      this.statusMenuOpen =
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

  exportData(): void {

    const exportData =
      this.sortedAssignments.map(
        item => ({

          Software:
            item.softwareName,

          Employee:
            item.employeeName,

          AssignedDate:
            item.assignedDate,

          ExpirationDate:
            item.expirationDate ?? '',

          RevokedDate:
            item.revokedDate ?? '',

          Status:
            item.status

        })
      );

    switch (
      this.selectedExportFormat
    ) {

      case 'csv':

        this.exportService
          .exportToCsv(
            exportData,
            'license-assignments'
          );

        break;

      case 'excel':

        this.exportService
          .exportToExcel(
            exportData,
            'license-assignments'
          );

        break;

      case 'pdf':

        this.exportService
          .exportToPdf(
            exportData,
            'license-assignments'
          );

        break;
    }
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

  get sortedAssignments():
    LicenseAssignmentResponse[] {

    const data =
      [...this.filteredAssignments];

    data.sort((a, b) => {

      let valueA = '';

      let valueB = '';

      switch (
        this.sortColumn
      ) {

        case 'softwareName':

          valueA =
            a.softwareName;

          valueB =
            b.softwareName;

          break;

        case 'employeeName':

          valueA =
            a.employeeName;

          valueB =
            b.employeeName;

          break;

        case 'assignedDate':

          valueA =
            a.assignedDate;

          valueB =
            b.assignedDate;

          break;

        case 'expirationDate':

          valueA =
            a.expirationDate ?? '';

          valueB =
            b.expirationDate ?? '';

          break;

        case 'status':

          valueA =
            a.status;

          valueB =
            b.status;

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

  getStatusClass(
    status: string
  ): string {

    switch (
      status.toUpperCase()
    ) {

      case 'ACTIVE':

        return 'status-active';

      case 'REVOKED':

        return 'status-revoked';

      case 'EXPIRED':

        return 'status-expired';

      default:

        return 'status-revoked';
    }
  }

  toggleMenu(
    id: number
  ): void {

    this.openMenuId =
      this.openMenuId === id
        ? null
        : id;
  }

  closeMenu(): void {

    this.openMenuId = null;
  }

  openDialog(): void {

    this.showDialog = true;
  }

  closeDialog(): void {

    this.showDialog = false;

    this.statusMenuOpen = false;

    this.exportMenuOpen = false;
  }

  saveAssignment(): void {

    this.assignmentService
      .createAssignment(
        this.form
      )
      .subscribe({

        next: () => {

          this.successMessage =
            'License assigned successfully';

          this.showDialog = false;

          this.loadAssignments();
        },

        error: err => {

          this.errorMessage =
            err.error?.message ??
            'Assignment failed';
        }

      });
  }

  revokeAssignment(
    assignment:
      LicenseAssignmentResponse
  ): void {

    this.closeMenu();

    this.assignmentService
      .revokeAssignment(
        assignment.id
      )
      .subscribe({

        next: () => {

          this.successMessage =
            'License revoked';

          this.loadAssignments();
        }

      });
  }

}