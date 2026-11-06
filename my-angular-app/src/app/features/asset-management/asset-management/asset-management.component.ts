import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { DepartmentsComponent }
from '../departments/components/departments.component';

import { EmployeesComponent }
from '../employees/components/employees.component';

import { ContractsComponent }
from '../contracts/components/contracts.component';

import { DevicesComponent }
from '../devices/components/devices.component';

import { ReportsComponent }
from '../reports/reports.component';

import { SoftwareLicensesComponent }
from '../software-licenses/components/software-licenses.component';

@Component({
  selector: 'app-asset-management',
  standalone: true,
  imports: [
    CommonModule,

    DepartmentsComponent,
    EmployeesComponent,
    ContractsComponent,
    DevicesComponent,
    ReportsComponent,
    SoftwareLicensesComponent 
  ],
  templateUrl: './asset-management.component.html',
  styleUrls: ['./asset-management.component.css']
})
export class AssetManagementComponent {

  selectedArea:
    'master-data'
    | 'operations'
    | 'analytics'
    =
    'master-data';

  selectedModule:
    'departments'
    | 'employees'
    | 'contracts'
    | 'devices'
    | 'reports'
    | 'software-licenses'
    =
    'departments';

  selectArea(
    area:
      'master-data'
      | 'operations'
      | 'analytics'
  ): void {

    this.selectedArea = area;

    switch (area) {

      case 'master-data':
        this.selectedModule =
          'departments';
        break;

      case 'operations':
        this.selectedModule =
          'devices';
        break;

      case 'analytics':
        this.selectedModule =
          'reports';
        break;
    }
  }

  selectModule(
    module:
      'departments'
      | 'employees'
      | 'contracts'
      | 'devices'
      | 'reports'
      | 'software-licenses'
  ): void {

    this.selectedModule =
      module;
  }

}
