import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef,
  afterNextRender
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import { BusinessReportService }
from '../services/business-report.service';

import { InventoryValueResponse }
from '../models/inventory-value-response.model';

import * as XLSX from 'xlsx';

import { saveAs }
from 'file-saver';

import jsPDF from 'jspdf';

import autoTable
from 'jspdf-autotable';

@Component({
  selector: 'app-inventory-value',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './inventory-value.component.html',
  styleUrls: ['./inventory-value.component.css']
})
export class InventoryValueComponent
implements OnInit {

  private readonly cdr =
    inject(ChangeDetectorRef);

  private readonly reportService =
    inject(BusinessReportService);

  readonly generatedAt =
    new Date();

  inventoryData:
    InventoryValueResponse[] = [];

  loading = true;

  searchTerm = '';

  exportMenuOpen = false;

  sortColumn:
    keyof InventoryValueResponse =
    'sku';

  sortDirection:
    'asc' | 'desc' =
    'asc';

  constructor() {

    afterNextRender(() => {

      this.cdr.detectChanges();

    });
  }

  get totalProducts():
    number {

    return this.inventoryData.length;
  }

  get totalStock():
    number {

    return this.inventoryData.reduce(
      (sum, item) =>
        sum + item.lagerbestand,
      0
    );
  }

  get totalInventoryValue():
    number {

    return this.inventoryData.reduce(
      (sum, item) =>
        sum + item.inventoryValue,
      0
    );
  }

  get filteredInventoryData():
    InventoryValueResponse[] {

    if (
      !this.searchTerm.trim()
    ) {

      return this.inventoryData;
    }

    const term =
      this.searchTerm.toLowerCase();

    return this.inventoryData.filter(
      item =>

        item.sku
          .toLowerCase()
          .includes(term)

        ||

        item.name
          .toLowerCase()
          .includes(term)

        ||

        item.manufacturer
          .toLowerCase()
          .includes(term)
    );
  }

  get sortedInventoryData():
    InventoryValueResponse[] {

    const data = [
      ...this.filteredInventoryData
    ];

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
      keyof InventoryValueResponse
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
      'SKU,Name,Manufacturer,Stock,PurchasePrice,InventoryValue';

    const rows =
      this.sortedInventoryData.map(
        item =>
          `${item.sku},${item.name},${item.manufacturer},${item.lagerbestand},${item.purchasePrice},${item.inventoryValue}`
      );

    const csv =
      [header, ...rows]
        .join('\n');

    const blob =
      new Blob(
        [csv],
        {
          type:
            'text/csv;charset=utf-8;'
        }
      );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement('a');

    link.href = url;

    link.download =
      'inventory-value-report.csv';

    link.click();

    window.URL.revokeObjectURL(
      url
    );

    this.exportMenuOpen =
      false;
  }

  exportExcel(): void {

    const worksheet =
      XLSX.utils.json_to_sheet(
        this.sortedInventoryData
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Inventory Value'
    );

    const excelBuffer =
      XLSX.write(
        workbook,
        {
          bookType: 'xlsx',
          type: 'array'
        }
      );

    const blob =
      new Blob(
        [excelBuffer],
        {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      );

    saveAs(
      blob,
      'inventory-value-report.xlsx'
    );

    this.exportMenuOpen =
      false;
  }

  exportPdf(): void {

    const doc =
      new jsPDF();

    doc.setFontSize(18);

    doc.text(
      'Inventory Value Report',
      14,
      20
    );

    autoTable(
      doc,
      {
        startY: 30,

        head: [[
          'SKU',
          'Name',
          'Manufacturer',
          'Stock',
          'Purchase Price',
          'Inventory Value'
        ]],

        body:
          this.sortedInventoryData.map(
            item => [
              item.sku,
              item.name,
              item.manufacturer,
              item.lagerbestand,
              item.purchasePrice,
              item.inventoryValue
            ]
          )
      }
    );

    doc.save(
      'inventory-value-report.pdf'
    );

    this.exportMenuOpen =
      false;
  }

  getSortIcon(column: string): string {

  if (this.sortColumn !== column) {
    return '↕';
  }

  return this.sortDirection === 'asc'
    ? '↑'
    : '↓';

}

  ngOnInit(): void {

    this.reportService
      .getInventoryValueReport()
      .subscribe({

        next: (data) => {

          this.inventoryData =
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

          setTimeout(() => {

            this.cdr.detectChanges();

          });
        }
      });
  }
}