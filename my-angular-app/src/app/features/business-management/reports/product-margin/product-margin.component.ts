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

import { ProductMarginResponse }
from '../models/product-margin-response.model';

import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';

import jsPDF from 'jspdf';

import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-product-margin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-margin.component.html',
  styleUrls: ['./product-margin.component.css']
})
export class ProductMarginComponent
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
    ProductMarginResponse[] = [];

  loading = true;

  searchTerm = '';

  exportMenuOpen = false;

  sortColumn:
    keyof ProductMarginResponse =
      'margin';

  sortDirection:
    'asc'
    | 'desc' =
      'desc';

  get averageMargin(): number {

    if (!this.reportData.length) {

      return 0;

    }

    return this.totalMargin
      / this.reportData.length;

  }

  get totalProducts(): number {

    return this.reportData.length;

  }

  get totalMargin(): number {

    return this.reportData.reduce(
      (sum, item) =>
        sum + item.margin,
      0
    );

  }

  get highestMargin(): number {

    if (!this.reportData.length) {

      return 0;

    }

    return Math.max(
      ...this.reportData.map(
        item => item.margin
      )
    );

  }

  get lowestMargin(): number {

    if (!this.reportData.length) {

      return 0;

    }

    return Math.min(
      ...this.reportData.map(
        item => item.margin
      )
    );

  }

  get filteredData():
    ProductMarginResponse[] {

    if (
      !this.searchTerm.trim()
    ) {

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
    ProductMarginResponse[] {

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
      keyof ProductMarginResponse
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

  exportCsv(): void {

    const header =
      'SKU,Name,PurchasePrice,SalePrice,Margin';

    const rows =
      this.sortedData.map(
        item =>
          `${item.sku},${item.name},${item.purchasePrice},${item.salePrice},${item.margin}`
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

      'product-margin-report.csv'

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
      'Margin'
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

      new Blob(
        [excelBuffer]
      ),

      'product-margin-report.xlsx'

    );

    this.exportMenuOpen = false;

  }

  exportPdf(): void {

    const doc =
      new jsPDF();

    doc.text(
      'Product Margin Report',
      14,
      15
    );

    autoTable(
      doc,
      {

        startY: 25,

        head: [[
          'SKU',
          'Name',
          'Purchase',
          'Sale',
          'Margin'
        ]],

        body:
          this.sortedData.map(
            item => [

              item.sku,

              item.name,

              item.purchasePrice,

              item.salePrice,

              item.margin

            ]
          )

      }
    );

    doc.save(
      'product-margin-report.pdf'
    );

    this.exportMenuOpen = false;

  }

  ngOnInit(): void {

    this.reportService
      .getProductMarginReport()
      .subscribe({

        next: (data) => {

          this.reportData =
            data;

          this.loading =
            false;

          this.cdr
            .detectChanges();

          setTimeout(() => {

            this.cdr
              .detectChanges();

          });

        },

        error: () => {

          this.loading =
            false;

          this.cdr
            .detectChanges();

        }

      });

  }

}