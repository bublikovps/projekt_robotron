import { Component } from '@angular/core';

import { CommonModule }
from '@angular/common';

import { DepartmentsComponent }
from '../departments/components/departments.component';

import { EmployeesComponent }
from '../employees/components/employees.component';

import { ContractsComponent }
from '../contracts/components/contracts.component';

import { DevicesComponent }
from '../devices/components/devices.component';

import { SoftwareLicensesComponent }
from '../software-licenses/components/software-licenses.component';

import { DeviceAssignmentsComponent }
from '../device-assignments/components/device-assignments.component';

import { LicenseAssignmentsComponent }
from '../license-assignments/components/license-assignments.component';

import { AssetValueComponent }
from '../reports/asset-value/asset-value.component';

import { DepartmentAssetsComponent }
from '../reports/department-assets/department-assets.component';

import { ActiveDevicesComponent }
from '../reports/active-devices/active-devices.component';

import { ExpiringLicensesComponent }
from '../reports/expiring-licenses/expiring-licenses.component';

import {
  BreadcrumbComponent,
  BreadcrumbItem
} from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-asset-management',
  standalone: true,
  imports: [
    CommonModule,

    BreadcrumbComponent,

    DepartmentsComponent,
    EmployeesComponent,
    ContractsComponent,

    DevicesComponent,
    SoftwareLicensesComponent,
    DeviceAssignmentsComponent,
    LicenseAssignmentsComponent,

    AssetValueComponent,
    DepartmentAssetsComponent,
    ActiveDevicesComponent,
    ExpiringLicensesComponent
  ],
  templateUrl:
    './asset-management.component.html',
  styleUrls: [
    './asset-management.component.css'
  ]
})
export class AssetManagementComponent {

  selectedArea:
    | 'master-data'
    | 'operations'
    | 'analytics'
    =
    'master-data';

  selectedModule:
    | 'departments'
    | 'employees'
    | 'contracts'
    | 'devices'
    | 'software-licenses'
    | 'device-assignments'
    | 'license-assignments'
    | 'asset-value'
    | 'department-assets'
    | 'active-devices'
    | 'expiring-licenses'
    =
    'departments';

  selectArea(
    area:
      | 'master-data'
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
          'asset-value';

        break;
    }
  }

  selectModule(
    module:
      | 'departments'
      | 'employees'
      | 'contracts'
      | 'devices'
      | 'software-licenses'
      | 'device-assignments'
      | 'license-assignments'
      | 'asset-value'
      | 'department-assets'
      | 'active-devices'
      | 'expiring-licenses'
  ): void {

    this.selectedModule = module;
  }

  get breadcrumbItems():
    BreadcrumbItem[] {

    const items:
      BreadcrumbItem[] = [

      {
        label:
          'Arbeitsbereich',

        route:
          '/dashboard'
      },

      {
        label:
          'Asset Management',

        route:
          '/asset-management'
      }

    ];

    if (
      this.selectedArea ===
      'master-data'
    ) {

      items.push({

        label:
          'Master Data'

      });

    } else if (
      this.selectedArea ===
      'operations'
    ) {

      items.push({

        label:
          'Operations'

      });

    } else {

      items.push({

        label:
          'Analytics'

      });
    }

    switch (
      this.selectedModule
    ) {

      case 'departments':

        items.push({
          label:
            'Departments'
        });

        break;

      case 'employees':

        items.push({
          label:
            'Employees'
        });

        break;

      case 'contracts':

        items.push({
          label:
            'Contracts'
        });

        break;

      case 'devices':

        items.push({
          label:
            'Devices'
        });

        break;

      case 'software-licenses':

        items.push({
          label:
            'Software Licenses'
        });

        break;

      case 'device-assignments':

        items.push({
          label:
            'Device Assignments'
        });

        break;

      case 'license-assignments':

        items.push({
          label:
            'License Assignments'
        });

        break;

      case 'asset-value':

        items.push({
          label:
            'Asset Value'
        });

        break;

      case 'department-assets':

        items.push({
          label:
            'Department Assets'
        });

        break;

      case 'active-devices':

        items.push({
          label:
            'Active Devices'
        });

        break;

      case 'expiring-licenses':

        items.push({
          label:
            'Expiring Licenses'
        });

        break;
    }

    return items;
  }
}