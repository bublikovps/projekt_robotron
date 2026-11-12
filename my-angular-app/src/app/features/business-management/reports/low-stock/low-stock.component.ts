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

import { LowStockResponse }
from '../models/low-stock-response.model';

import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';

import jsPDF from 'jspdf';

import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-low-stock',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './low-stock.component.html',
  styleUrls: ['./low-stock.component.css']
})
export class LowStockComponent
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

  reportData: LowStockResponse[] = [];

  loading = true;

  searchTerm = '';

  threshold = 5;

  exportMenuOpen = false;

  sortColumn:
    | 'sku'
    | 'name'
    | 'lagerbestand'
    | 'minimumStock'
    = 'lagerbestand';

  sortDirection:
    | 'asc'
    | 'desc'
    = 'asc';

  get activeThreshold(): number {

    return this.threshold;

  }

  get totalProducts(): number {

    return this.reportData.length;

  }

  get productsUnderMinimum(): number {

    return this.reportData.filter(
      item =>
        item.lagerbestand <
        item.minimumStock
    ).length;

  }

  get totalDeficit(): number {

    return this.reportData.reduce(
      (sum, item) =>
        sum +
        Math.max(
          0,
          item.minimumStock -
          item.lagerbestand
        ),
      0
    );

  }

  get filteredData():
    LowStockResponse[] {

    if (!this.searchTerm.trim()) {

      return this.reportData;

    }

    const term =
      this.searchTerm.toLowerCase();

    return this.reportData.filter(
      item =>
        item.sku
          .toLowerCase()
          .includes(term)
        ||
        item.name
          .toLowerCase()
          .includes(term)
    );

  }

  get sortedData():
    LowStockResponse[] {

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
      | 'sku'
      | 'name'
      | 'lagerbestand'
      | 'minimumStock'
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

  getDeficit(
    item: LowStockResponse
  ): number {

    return Math.max(
      0,
      item.minimumStock -
      item.lagerbestand
    );

  }

  setThreshold(
    value: number
  ): void {

    this.threshold = value;

    this.loadReport();

  }

  applyThreshold(): void {

    this.loadReport();

  }

  private loadReport(): void {

    this.loading = true;

    this.reportService
      .getLowStockReport(
        this.threshold
      )
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

  exportCsv(): void {

    const header =
      'SKU,Name,Stock,MinimumStock,Deficit';

    const rows =
      this.sortedData.map(
        item =>
          `${item.sku},${item.name},${item.lagerbestand},${item.minimumStock},${this.getDeficit(item)}`
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
      'low-stock-report.csv'
    );

    this.exportMenuOpen = false;

  }

  exportExcel(): void {

    const worksheet =
      XLSX.utils.json_to_sheet(
        this.sortedData.map(
          item => ({
            SKU: item.sku,
            Name: item.name,
            Stock: item.lagerbestand,
            MinimumStock:
              item.minimumStock,
            Deficit:
              this.getDeficit(item)
          })
        )
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Low Stock'
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
      'low-stock-report.xlsx'
    );

    this.exportMenuOpen = false;

  }

  exportPdf(): void {

    const doc = new jsPDF();

    doc.text(
      'Low Stock Report',
      14,
      15
    );

    autoTable(doc, {

      startY: 25,

      head: [[
        'SKU',
        'Name',
        'Stock',
        'Minimum',
        'Deficit'
      ]],

      body:
        this.sortedData.map(
          item => [
            item.sku,
            item.name,
            item.lagerbestand,
            item.minimumStock,
            this.getDeficit(item)
          ]
        )

    });

    doc.save(
      'low-stock-report.pdf'
    );

    this.exportMenuOpen = false;

  }

  ngOnInit(): void {

    this.loadReport();

  }

}