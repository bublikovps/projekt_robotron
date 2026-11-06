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

import { ExpiringLicenseResponse }
from '../models/expiring-license-response.model';

@Component({
  selector: 'app-expiring-licenses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './expiring-licenses.component.html',
  styleUrls: ['./expiring-licenses.component.css']
})
export class ExpiringLicensesComponent
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
    ExpiringLicenseResponse[] = [];

  loading = true;

  searchTerm = '';

  readonly generatedAt =
    new Date();

  sortColumn:
    keyof ExpiringLicenseResponse =
      'expirationDate';

  sortDirection:
    'asc'
    | 'desc' =
      'asc';

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

    if (!this.searchTerm.trim()) {

      return this.reportData;
    }

    const term =
      this.searchTerm.toLowerCase();

    return this.reportData.filter(
      item =>
        item.softwareName
          .toLowerCase()
          .includes(term)
        ||
        item.vendor
          .toLowerCase()
          .includes(term)
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

  ngOnInit(): void {

    this.reportService
      .getExpiringLicensesReport()
      .subscribe({

        next: (data) => {

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

}