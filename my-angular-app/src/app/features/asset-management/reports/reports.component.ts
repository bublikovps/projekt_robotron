import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AssetValueComponent }
from './asset-value/asset-value.component';

import { DepartmentAssetsComponent }
from './department-assets/department-assets.component';

import { ActiveDevicesComponent }
from './active-devices/active-devices.component';

import { ExpiringLicensesComponent }
from './expiring-licenses/expiring-licenses.component';

@Component({
  selector: 'app-asset-reports',
  standalone: true,
  imports: [
    CommonModule,
  AssetValueComponent,
  DepartmentAssetsComponent, 
  ActiveDevicesComponent,
  ExpiringLicensesComponent
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  selectedReport:
    'asset-value'
    | 'department-assets'
    | 'active-devices'
    | 'expiring-licenses'
    =
    'asset-value';

  selectReport(
    report:
      'asset-value'
      | 'department-assets'
      | 'active-devices'
      | 'expiring-licenses'
  ): void {

    this.selectedReport =
      report;
  }

}