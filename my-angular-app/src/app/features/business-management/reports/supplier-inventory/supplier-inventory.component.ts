import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef,
  afterNextRender
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BusinessReportService }
from '../services/business-report.service';

import { SupplierInventoryResponse }
from '../models/supplier-inventory-response.model';

import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';

import jsPDF from 'jspdf';

import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-supplier-inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './supplier-inventory.component.html',
  styleUrls: ['./supplier-inventory.component.css']
})
export class SupplierInventoryComponent
implements OnInit {

  private readonly cdr =
    inject(ChangeDetectorRef);

  private readonly reportService =
    inject(BusinessReportService);

  constructor() {

    afterNextRender(() => {

      this.cdr.detectChanges();

    });

  }

  reportData:
    SupplierInventoryResponse[] = [];

  loading = true;

  searchTerm = '';

  exportMenuOpen = false;

  sortColumn:
    keyof SupplierInventoryResponse =
      'inventoryValue';

  sortDirection:
    'asc'
    | 'desc' =
      'desc';

  getSupplierShare(
    item: SupplierInventoryResponse
  ): number {

    if (
      this.totalInventoryValue === 0
    ) {

      return 0;

    }

    return Number(
      (
        item.inventoryValue /
        this.totalInventoryValue *
        100
      ).toFixed(1)
    );

  }

  get totalSuppliers(): number {

    return this.reportData.length;

  }

  get totalProducts(): number {

    return this.reportData.reduce(
      (sum, item) =>
        sum + item.productCount,
      0
    );

  }

  get totalUnits(): number {

    return this.reportData.reduce(
      (sum, item) =>
        sum + item.totalUnits,
      0
    );

  }

  get totalInventoryValue(): number {

    return this.reportData.reduce(
      (sum, item) =>
        sum + item.inventoryValue,
      0
    );

  }

  get filteredData():
    SupplierInventoryResponse[] {

    if (
      !this.searchTerm.trim()
    ) {

      return this.reportData;

    }

    const term =
      this.searchTerm.toLowerCase();

    return this.reportData.filter(
      item =>
        item.supplier
          .toLowerCase()
          .includes(term)
    );

  }

  get sortedData():
    SupplierInventoryResponse[] {

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

  getSortIcon(
    column: string
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

  sortBy(
    column:
      keyof SupplierInventoryResponse
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
      'Supplier,Products,Units,InventoryValue';

    const rows =
      this.sortedData.map(
        item =>
          `${item.supplier},${item.productCount},${item.totalUnits},${item.inventoryValue}`
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
      'supplier-inventory-report.csv'
    );

    this.exportMenuOpen = false;

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
      'Suppliers'
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
      'supplier-inventory-report.xlsx'
    );

    this.exportMenuOpen = false;

  }

  exportPdf(): void {

    const doc =
      new jsPDF();

    doc.text(
      'Supplier Inventory Report',
      14,
      15
    );

    autoTable(
      doc,
      {
        startY: 25,

        head: [[
          'Supplier',
          'Products',
          'Units',
          'Inventory Value'
        ]],

        body:
          this.sortedData.map(
            item => [
              item.supplier,
              item.productCount,
              item.totalUnits,
              item.inventoryValue
            ]
          )
      }
    );

    doc.save(
      'supplier-inventory-report.pdf'
    );

    this.exportMenuOpen = false;

  }

  ngOnInit(): void {

    this.reportService
      .getSupplierInventoryReport()
      .subscribe({

        next: (data) => {

          this.reportData = data;

          this.loading = false;

          this.cdr.detectChanges();

          setTimeout(() => {

            this.cdr.detectChanges();

          });

        },

        error: () => {

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }

}