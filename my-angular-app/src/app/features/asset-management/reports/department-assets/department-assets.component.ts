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
  styleUrls:
    ['./department-assets.component.css']
})
export class DepartmentAssetsComponent
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
    DepartmentAssetValueResponse[] = [];

  loading = true;

  searchTerm = '';

  readonly generatedAt =
    new Date();

  sortColumn:
    keyof DepartmentAssetValueResponse =
      'totalAssetValue';

  sortDirection:
    'asc'
    | 'desc' =
      'desc';

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

    if (!this.reportData.length) {

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

    if (!this.searchTerm.trim()) {

      return this.reportData;
    }

    const term =
      this.searchTerm.toLowerCase();

    return this.reportData.filter(
      item =>
        item.departmentName
          .toLowerCase()
          .includes(term)
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

    this.sortColumn =
      column;

    this.sortDirection =
      'asc';
  }

  ngOnInit(): void {

    this.reportService
      .getDepartmentAssetValueReport()
      .subscribe({

        next: (data) => {

          this.reportData =
            data;

          this.loading =
            false;

          this.cdr.detectChanges();

        },

        error: () => {

          this.loading =
            false;

        }

      });
  }
}