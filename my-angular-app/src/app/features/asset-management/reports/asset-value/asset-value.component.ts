import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef,
  afterNextRender
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { AssetReportService }
from '../services/asset-report.service';

import { AssetValueResponse }
from '../models/asset-value-response.model';

import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';

import jsPDF from 'jspdf';

import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-asset-value',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './asset-value.component.html',
  styleUrls: ['./asset-value.component.css']
})
export class AssetValueComponent
implements OnInit {

  private readonly cdr =
    inject(ChangeDetectorRef);

  private readonly reportService =
    inject(AssetReportService);

  constructor() {

    afterNextRender(() => {

      this.cdr.detectChanges();

    });
  }

  reportData:
    AssetValueResponse[] = [];

  loading = true;

  searchTerm = '';

  readonly generatedAt =
    new Date();

  sortColumn:
    keyof AssetValueResponse =
      'currentValue';

  sortDirection:
    'asc'
    | 'desc' =
      'desc';

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

    if (!this.searchTerm.trim()) {

      return this.reportData;
    }

    const term =
      this.searchTerm.toLowerCase();

    return this.reportData.filter(
      item =>
        item.inventoryNumber
          .toLowerCase()
          .includes(term)
        ||
        item.serialNumber
          .toLowerCase()
          .includes(term)
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

  exportCsv(): void {

    const header =
      'InventoryNumber,SerialNumber,Status,PurchaseValue,CurrentValue,Depreciation';

    const rows =
      this.sortedData.map(
        item =>
          `${item.inventoryNumber},${item.serialNumber},${item.status},${item.purchasePrice},${item.currentValue},${item.depreciationValue}`
      );

    const csv =
      [header, ...rows]
        .join('\n');

    saveAs(
      new Blob(
        [csv],
        {
          type:
            'text/csv;charset=utf-8;'
        }
      ),
      'asset-value-report.csv'
    );
  }

  exportExcel(): void {

    const worksheet =
      XLSX.utils.json_to_sheet(
        this.sortedData
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Asset Value'
    );

    const excelBuffer =
      XLSX.write(
        workbook,
        {
          bookType: 'xlsx',
          type: 'array'
        }
      );

    saveAs(
      new Blob([excelBuffer]),
      'asset-value-report.xlsx'
    );
  }

  exportPdf(): void {

    const doc =
      new jsPDF();

    doc.text(
      'Asset Value Report',
      14,
      15
    );

    autoTable(
      doc,
      {
        startY: 25,

        head: [[
          'Inventory',
          'Serial',
          'Status',
          'Purchase',
          'Current',
          'Depreciation'
        ]],

        body:
          this.sortedData.map(
            item => [
              item.inventoryNumber,
              item.serialNumber,
              item.status,
              item.purchasePrice,
              item.currentValue,
              item.depreciationValue
            ]
          )
      }
    );

    doc.save(
      'asset-value-report.pdf'
    );
  }

  ngOnInit(): void {

    this.reportService
      .getAssetValueReport()
      .subscribe({

        next: (data) => {

          this.reportData =
            data;

          this.loading =
            false;

          this.cdr.detectChanges();

          setTimeout(() => {

            this.cdr.detectChanges();

          });

        },

        error: () => {

          this.loading =
            false;

          this.cdr.detectChanges();

        }

      });
  }

}