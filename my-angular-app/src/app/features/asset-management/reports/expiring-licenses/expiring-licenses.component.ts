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

import { ExpiringLicenseResponse }
from '../models/expiring-license-response.model';

@Component({
  selector: 'app-expiring-licenses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl:
    './expiring-licenses.component.html',
  styleUrls: [
    './expiring-licenses.component.css'
  ]
})
export class ExpiringLicensesComponent
implements OnInit {

  private readonly cdr =
    inject(ChangeDetectorRef);

  private readonly reportService =
    inject(AssetReportService);

  private readonly exportService =
    inject(ExportService);

  reportData:
    ExpiringLicenseResponse[] = [];

  loading = true;

  searchTerm = '';

  exportMenuOpen = false;

  selectedExportFormat = '';

  sortColumn:
    keyof ExpiringLicenseResponse =
      'expirationDate';

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
      .getExpiringLicensesReport()
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

  get totalLicenses(): number {

    return this.reportData.length;
  }

  get vendorCount(): number {

    return new Set(
      this.reportData.map(
        item => item.vendor
      )
    ).size;
  }

  get expiredLicenses(): number {

    return this.reportData.filter(
      item =>

        item.status
          .toUpperCase()
          .includes('EXPIRED')

    ).length;
  }

  get expiringSoon(): number {

    return this.reportData.filter(
      item =>

        item.status
          .toUpperCase()
          .includes('EXPIR')

    ).length;
  }

  get filteredData():
    ExpiringLicenseResponse[] {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    if (!search) {

      return this.reportData;
    }

    return this.reportData.filter(
      item =>

        item.softwareName
          .toLowerCase()
          .includes(search)

        ||

        item.vendor
          .toLowerCase()
          .includes(search)
    );
  }

  get sortedData():
    ExpiringLicenseResponse[] {

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
      keyof ExpiringLicenseResponse
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
      keyof ExpiringLicenseResponse
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

          Software:
            item.softwareName,

          Vendor:
            item.vendor,

          ExpirationDate:
            item.expirationDate,

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
            'expiring-licenses-report'
          );

        break;

      case 'excel':

        this.exportService
          .exportToExcel(
            exportData,
            'expiring-licenses-report'
          );

        break;

      case 'pdf':

        this.exportService
          .exportToPdf(
            exportData,
            'expiring-licenses-report'
          );

        break;
    }

    this.selectedExportFormat = '';
  }

}