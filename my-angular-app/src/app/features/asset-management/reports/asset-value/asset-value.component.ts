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

import { AssetValueResponse }
from '../models/asset-value-response.model';

@Component({
  selector: 'app-asset-value',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl:
    './asset-value.component.html',
  styleUrls: [
    './asset-value.component.css'
  ]
})
export class AssetValueComponent
implements OnInit {

  private readonly cdr =
    inject(ChangeDetectorRef);

  private readonly reportService =
    inject(AssetReportService);

  private readonly exportService =
    inject(ExportService);

  reportData:
    AssetValueResponse[] = [];

  loading = true;

  searchTerm = '';

  exportMenuOpen = false;

  selectedExportFormat = '';

  sortColumn:
    keyof AssetValueResponse =
      'currentValue';

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
      .getAssetValueReport()
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

  get totalPurchaseValue(): number {

    return this.reportData.reduce(
      (sum, item) =>
        sum + item.purchasePrice,
      0
    );
  }

  get totalCurrentValue(): number {

    return this.reportData.reduce(
      (sum, item) =>
        sum + item.currentValue,
      0
    );
  }

  get totalDepreciation(): number {

    return this.reportData.reduce(
      (sum, item) =>
        sum + item.depreciationValue,
      0
    );
  }

  get filteredData():
    AssetValueResponse[] {

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

        item.status
          .toLowerCase()
          .includes(search)
    );
  }

  get sortedData():
    AssetValueResponse[] {

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
      keyof AssetValueResponse
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

    this.sortColumn =
      column;

    this.sortDirection =
      'asc';
  }

  getSortIcon(
    column:
      keyof AssetValueResponse
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

          PurchaseValue:
            item.purchasePrice,

          CurrentValue:
            item.currentValue,

          Depreciation:
            item.depreciationValue

        })
      );

    switch (
      this.selectedExportFormat
    ) {

      case 'csv':

        this.exportService
          .exportToCsv(
            exportData,
            'asset-value-report'
          );

        break;

      case 'excel':

        this.exportService
          .exportToExcel(
            exportData,
            'asset-value-report'
          );

        break;

      case 'pdf':

        this.exportService
          .exportToPdf(
            exportData,
            'asset-value-report'
          );

        break;
    }

    this.selectedExportFormat = '';
  }

}
