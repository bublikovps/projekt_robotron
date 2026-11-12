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

import { EmployeeResponse }
from '../../employees/models/employee-response.model';

import { ExportService }
from '../../../../shared/services/export.service';

import { EmploymentContractService }
from '../services/employment-contract.service';

import { EmploymentContractResponse }
from '../models/employment-contract-response.model';

import { EmploymentContractCreateRequest }
from '../models/employment-contract-create-request.model';

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent
implements OnInit {

  allContracts:
    EmploymentContractResponse[] = [];

  filteredContracts:
    EmploymentContractResponse[] = [];

  employees:
    EmployeeResponse[] = [];

  searchTerm = '';

  selectedExportFormat = '';

  exportMenuOpen = false;

  sortColumn = 'contractNumber';

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

  editingContractId:
    number | null = null;

  contractTypes = [

    'UNBEFRISTET',

    'BEFRISTET',

    'WERKSTUDENT',

    'PRAKTIKANT',

    'MINIJOB'

  ];

  contractForm:
    EmploymentContractCreateRequest = {

    employeeId: 0,

    contractNumber: '',

    contractType: 'UNBEFRISTET',

    startDate: '',

    endDate: null,

    weeklyHours: 40,

    salary: 0

  };

  constructor(

    private contractService:
      EmploymentContractService,

    private employeeService:
      EmployeeService,

    private exportService:
      ExportService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadContracts();

    this.loadEmployees();
  }

  loadContracts(): void {

    this.contractService
      .getAllContracts()
      .subscribe({

        next: (data) => {

          this.allContracts = data;

          this.filteredContracts = data;

          this.cdr.detectChanges();
        },

        error: () => {

          this.errorMessage =
            'Fehler beim Laden der Verträge.';
        }

      });
  }

  loadEmployees(): void {

    this.employeeService
      .getAllEmployees()
      .subscribe({

        next: (data) => {

          this.employees = data;

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

      this.filteredContracts =
        [...this.allContracts];

      return;
    }

    this.filteredContracts =
      this.allContracts.filter(
        contract =>

          contract.contractNumber
            .toLowerCase()
            .includes(search)

          ||

          contract.employeeName
            .toLowerCase()
            .includes(search)

          ||

          contract.contractType
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

  get sortedContracts():
    EmploymentContractResponse[] {

    const data =
      [...this.filteredContracts];

    data.sort((a, b) => {

      let valueA = '';

      let valueB = '';

      switch (
        this.sortColumn
      ) {

        case 'contractNumber':

          valueA =
            a.contractNumber;

          valueB =
            b.contractNumber;

          break;

        case 'employeeName':

          valueA =
            a.employeeName;

          valueB =
            b.employeeName;

          break;

        case 'contractType':

          valueA =
            a.contractType;

          valueB =
            b.contractType;

          break;

        case 'weeklyHours':

          valueA =
            String(a.weeklyHours);

          valueB =
            String(b.weeklyHours);

          break;

        case 'salary':

          valueA =
            String(a.salary);

          valueB =
            String(b.salary);

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
      this.sortedContracts.map(
        contract => ({

          ContractNumber:
            contract.contractNumber,

          Employee:
            contract.employeeName,

          ContractType:
            contract.contractType,

          WeeklyHours:
            contract.weeklyHours,

          Salary:
            contract.salary,

          StartDate:
            contract.startDate,

          EndDate:
            contract.endDate ?? '',

          Active:
            contract.active
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
            'contracts'
          );

        break;

      case 'excel':

        this.exportService
          .exportToExcel(
            exportData,
            'contracts'
          );

        break;

      case 'pdf':

        this.exportService
          .exportToPdf(
            exportData,
            'contracts'
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
    contractId: number
  ): void {

    this.openMenuId =
      this.openMenuId === contractId
        ? null
        : contractId;
  }

  closeMenu(): void {

    this.openMenuId = null;
  }

  openCreateDialog(): void {

    this.isEditMode = false;

    this.editingContractId = null;

    this.resetForm();

    this.showDialog = true;
  }

  closeDialog(): void {

  this.showDialog = false;

  this.exportMenuOpen = false;

  this.cancelEdit();
}

  saveContract(): void {

    this.successMessage = '';

    this.errorMessage = '';

    if (
      this.isEditMode &&
      this.editingContractId !== null
    ) {

      this.contractService
        .updateContract(
          this.editingContractId,
          this.contractForm
        )
        .subscribe({

          next: () => {

            this.successMessage =
              'Vertrag aktualisiert.';

            this.showDialog = false;

            this.cancelEdit();

            this.loadContracts();
          },

          error: () => {

            this.errorMessage =
              'Fehler beim Bearbeiten.';
          }

        });

      return;
    }

    this.contractService
      .createContract(
        this.contractForm
      )
      .subscribe({

        next: () => {

          this.successMessage =
            'Vertrag erstellt.';

          this.showDialog = false;

          this.resetForm();

          this.loadContracts();
        },

        error: () => {

          this.errorMessage =
            'Fehler beim Erstellen.';
        }

      });
  }

  editContract(
    contract:
      EmploymentContractResponse
  ): void {

    this.isEditMode = true;

    this.editingContractId =
      contract.id;

    this.contractForm = {

      employeeId:
        contract.employeeId,

      contractNumber:
        contract.contractNumber,

      contractType:
        contract.contractType,

      startDate:
        contract.startDate,

      endDate:
        contract.endDate,

      weeklyHours:
        contract.weeklyHours,

      salary:
        contract.salary

    };

    this.showDialog = true;

    this.closeMenu();
  }

  archiveContract(
    contract:
      EmploymentContractResponse
  ): void {

    this.closeMenu();

    if (
      !confirm(
        `Vertrag "${contract.contractNumber}" archivieren?`
      )
    ) {

      return;
    }

    this.contractService
      .archiveContract(
        contract.id
      )
      .subscribe({

        next: (res) => {

          this.successMessage =
            res.message;

          this.loadContracts();
        }

      });
  }

  cancelEdit(): void {

    this.isEditMode = false;

    this.editingContractId = null;

    this.resetForm();
  }

  private resetForm(): void {

    this.contractForm = {

      employeeId: 0,

      contractNumber: '',

      contractType: 'UNBEFRISTET',

      startDate: '',

      endDate: null,

      weeklyHours: 40,

      salary: 0

    };
  }

}