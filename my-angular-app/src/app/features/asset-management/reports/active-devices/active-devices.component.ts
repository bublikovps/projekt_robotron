import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { AssetReportService }
from '../services/asset-report.service';

import { ExportService }
from '../../../../shared/services/export.service';

import { ActiveDeviceResponse }
from '../models/active-device-response.model';

@Component({
  selector: 'app-active-devices',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl:
    './active-devices.component.html',
  styleUrls: [
    './active-devices.component.css'
  ]
})
export class ActiveDevicesComponent
implements OnInit {

  private readonly cdr =
    inject(ChangeDetectorRef);

  private readonly reportService =
    inject(AssetReportService);

  private readonly exportService =
    inject(ExportService);

  reportData:
    ActiveDeviceResponse[] = [];

  loading = true;

  searchTerm = '';

  exportMenuOpen = false;

  selectedExportFormat = '';

  sortColumn:
    keyof ActiveDeviceResponse =
      'location';

  sortDirection:
    'asc'
    | 'desc'
    = 'asc';

  ngOnInit(): void {

    this.loadReport();
  }

  private loadReport(): void {

    this.loading = true;

    this.reportService
      .getActiveDevicesReport()
      .subscribe({

        next: data => {

          this.reportData = data;

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: () => {

          this.loading = false;

          this.cdr.detectChanges();
        }

      });
  }

  get totalDevices(): number {

    return this.reportData.length;
  }

  get totalLocations(): number {

    return new Set(
      this.reportData.map(
        item => item.location
      )
    ).size;
  }

  get activeDevices(): number {

    return this.reportData.filter(
      item =>

        item.status === 'ACTIVE'

        ||

        item.status === 'IN_USE'

        ||

        item.status === 'ASSIGNED'

    ).length;
  }

  get filteredData():
    ActiveDeviceResponse[] {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    if (!search) {

      return this.reportData;
    }

    return this.reportData.filter(
      item =>

        item.inventoryNumber
          .toLowerCase()
          .includes(search)

        ||

        item.serialNumber
          .toLowerCase()
          .includes(search)

        ||

        item.location
          .toLowerCase()
          .includes(search)
    );
  }

  get sortedData():
    ActiveDeviceResponse[] {

    const data =
      [...this.filteredData];

    data.sort((a, b) => {

      const valueA =
        a[this.sortColumn];

      const valueB =
        b[this.sortColumn];

      if (valueA < valueB) {

        return this.sortDirection === 'asc'
          ? -1
          : 1;
      }

      if (valueA > valueB) {

        return this.sortDirection === 'asc'
          ? 1
          : -1;
      }

      return 0;
    });

    return data;
  }

  sortBy(
    column:
      keyof ActiveDeviceResponse
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
    column:
      keyof ActiveDeviceResponse
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

  exportData(): void {

    const exportData =
      this.sortedData.map(
        item => ({

          InventoryNumber:
            item.inventoryNumber,

          SerialNumber:
            item.serialNumber,

          Status:
            item.status,

          Location:
            item.location

        })
      );

    switch (
      this.selectedExportFormat
    ) {

      case 'csv':

        this.exportService
          .exportToCsv(
            exportData,
            'active-devices-report'
          );

        break;

      case 'excel':

        this.exportService
          .exportToExcel(
            exportData,
            'active-devices-report'
          );

        break;

      case 'pdf':

        this.exportService
          .exportToPdf(
            exportData,
            'active-devices-report'
          );

        break;
    }

    this.selectedExportFormat = '';
  }

}