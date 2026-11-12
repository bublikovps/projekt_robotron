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

import { DepartmentAssetValueResponse }
from '../models/department-asset-value-response.model';

@Component({
  selector: 'app-department-assets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl:
    './department-assets.component.html',
  styleUrls: [
    './department-assets.component.css'
  ]
})
export class DepartmentAssetsComponent
implements OnInit {

  private readonly cdr =
    inject(ChangeDetectorRef);

  private readonly reportService =
    inject(AssetReportService);

  private readonly exportService =
    inject(ExportService);

  reportData:
    DepartmentAssetValueResponse[] = [];

  loading = true;

  searchTerm = '';

  exportMenuOpen = false;

  selectedExportFormat = '';

  sortColumn:
    keyof DepartmentAssetValueResponse =
      'totalAssetValue';

  sortDirection:
    'asc'
    | 'desc'
    = 'desc';

  ngOnInit(): void {

    this.loadReport();
  }

  private loadReport(): void {

    this.loading = true;

    this.reportService
      .getDepartmentAssetValueReport()
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

  get totalDepartments(): number {

    return this.reportData.length;
  }

  get totalDevices(): number {

    return this.reportData.reduce(
      (sum, item) =>
        sum + item.deviceCount,
      0
    );
  }

  get totalAssetValue(): number {

    return this.reportData.reduce(
      (sum, item) =>
        sum + item.totalAssetValue,
      0
    );
  }

  get topDepartment():
    DepartmentAssetValueResponse | null {

    if (
      !this.reportData.length
    ) {

      return null;
    }

    return [...this.reportData]
      .sort(
        (a, b) =>
          b.totalAssetValue -
          a.totalAssetValue
      )[0];
  }

  get filteredData():
    DepartmentAssetValueResponse[] {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    if (!search) {

      return this.reportData;
    }

    return this.reportData.filter(
      item =>

        item.departmentName
          .toLowerCase()
          .includes(search)
    );
  }

  get sortedData():
    DepartmentAssetValueResponse[] {

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
      keyof DepartmentAssetValueResponse
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
      keyof DepartmentAssetValueResponse
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

          Department:
            item.departmentName,

          Devices:
            item.deviceCount,

          AssetValue:
            item.totalAssetValue

        })
      );

    switch (
      this.selectedExportFormat
    ) {

      case 'csv':

        this.exportService
          .exportToCsv(
            exportData,
            'department-assets-report'
          );

        break;

      case 'excel':

        this.exportService
          .exportToExcel(
            exportData,
            'department-assets-report'
          );

        break;

      case 'pdf':

        this.exportService
          .exportToPdf(
            exportData,
            'department-assets-report'
          );

        break;
    }

    this.selectedExportFormat = '';
  }

}