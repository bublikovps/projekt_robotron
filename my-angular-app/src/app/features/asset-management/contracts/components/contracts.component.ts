import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeService }
from '../../employees/services/employee.service';

import { EmployeeResponse }
from '../../employees/models/employee-response.model';

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
export class ContractsComponent implements OnInit {

  contracts: EmploymentContractResponse[] = [];

  employees: EmployeeResponse[] = [];

  successMessage = '';

  errorMessage = '';

  isEditMode = false;

  editingContractId: number | null = null;

  contractTypes = [
    'UNBEFRISTET',
    'BEFRISTET',
    'WERKSTUDENT',
    'PRAKTIKANT',
    'MINIJOB'
  ];

  contractForm: EmploymentContractCreateRequest = {

    employeeId: 0,

    contractNumber: '',

    contractType: 'UNBEFRISTET',

    startDate: '',

    endDate: null,

    weeklyHours: 40,

    salary: 0

  };

  constructor(
    private contractService: EmploymentContractService,
    private employeeService: EmployeeService
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

          this.contracts = data;
        }

      });
  }

  loadEmployees(): void {

    this.employeeService
      .getAllEmployees()
      .subscribe({

        next: (data) => {

          this.employees = data;
        }

      });
  }

  saveContract(): void {

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

            this.cancelEdit();

            this.loadContracts();
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

          this.resetForm();

          this.loadContracts();
        }

      });
  }

  editContract(
    contract: EmploymentContractResponse
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
  }

  archiveContract(
    contract: EmploymentContractResponse
  ): void {

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
