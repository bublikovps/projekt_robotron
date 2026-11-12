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

import { DeviceService }
from '../../devices/services/device.service';

import { DeviceAssignmentService }
from '../services/device-assignment.service';

import { ExportService }
from '../../../../shared/services/export.service';

import { EmployeeResponse }
from '../../employees/models/employee-response.model';

import { DeviceResponse }
from '../../devices/models/device-response.model';

import { DeviceAssignmentResponse }
from '../models/device-assignment-response.model';

import { DeviceAssignmentCreateRequest }
from '../models/device-assignment-create-request.model';

@Component({
  selector: 'app-device-assignments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl:
    './device-assignments.component.html',
  styleUrls: [
    './device-assignments.component.css'
  ]
})
export class DeviceAssignmentsComponent
implements OnInit {

  assignments:
    DeviceAssignmentResponse[] = [];

  filteredAssignments:
    DeviceAssignmentResponse[] = [];

  employees:
    EmployeeResponse[] = [];

  devices:
    DeviceResponse[] = [];

  searchTerm = '';

  selectedStatus = '';

  selectedExportFormat = '';

  exportMenuOpen = false;

  statusMenuOpen = false;

  openMenuId:
    number | null = null;

  sortColumn = 'inventoryNumber';

  sortDirection:
    'asc'
    | 'desc'
    = 'asc';

  successMessage = '';

  errorMessage = '';

  showDialog = false;

  form:
    DeviceAssignmentCreateRequest = {

    employeeId: 0,

    deviceId: 0,

    assignedByUserId: 1,

    expectedReturnDate: null,

    notes: ''

  };

  constructor(

    private assignmentService:
      DeviceAssignmentService,

    private employeeService:
      EmployeeService,

    private deviceService:
      DeviceService,

    private exportService:
      ExportService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadAssignments();

    this.loadEmployees();

    this.loadDevices();
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

  loadDevices(): void {

    this.deviceService
      .getAllDevices()
      .subscribe({

        next: data => {

          this.devices = data;

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

          item.inventoryNumber
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

          Device:
            item.inventoryNumber,

          Employee:
            item.employeeName,

          AssignedDate:
            item.assignedDate,

          ExpectedReturn:
            item.expectedReturnDate ?? '',

          ReturnedDate:
            item.returnedDate ?? '',

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
            'device-assignments'
          );

        break;

      case 'excel':

        this.exportService
          .exportToExcel(
            exportData,
            'device-assignments'
          );

        break;

      case 'pdf':

        this.exportService
          .exportToPdf(
            exportData,
            'device-assignments'
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
    DeviceAssignmentResponse[] {

    const data =
      [...this.filteredAssignments];

    data.sort((a, b) => {

      let valueA = '';

      let valueB = '';

      switch (
        this.sortColumn
      ) {

        case 'inventoryNumber':

          valueA =
            a.inventoryNumber;

          valueB =
            b.inventoryNumber;

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

        case 'expectedReturnDate':

          valueA =
            a.expectedReturnDate ?? '';

          valueB =
            b.expectedReturnDate ?? '';

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

      case 'RETURNED':

        return 'status-returned';

      case 'OVERDUE':

        return 'status-overdue';

      default:

        return 'status-returned';
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

    this.exportMenuOpen = false;

    this.statusMenuOpen = false;
  }

  saveAssignment(): void {

    this.assignmentService
      .createAssignment(
        this.form
      )
      .subscribe({

        next: () => {

          this.successMessage =
            'Device assigned successfully';

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

  returnDevice(
    assignment:
      DeviceAssignmentResponse
  ): void {

    this.closeMenu();

    this.assignmentService
      .returnDevice(
        assignment.id
      )
      .subscribe({

        next: () => {

          this.successMessage =
            'Device returned';

          this.loadAssignments();
        }

      });
  }

}