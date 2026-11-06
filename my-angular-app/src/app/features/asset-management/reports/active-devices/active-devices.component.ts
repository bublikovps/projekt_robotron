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

import { ActiveDeviceResponse }
from '../models/active-device-response.model';

@Component({
  selector: 'app-active-devices',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './active-devices.component.html',
  styleUrls: ['./active-devices.component.css']
})
export class ActiveDevicesComponent
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
    ActiveDeviceResponse[] = [];

  loading = true;

  searchTerm = '';

  readonly generatedAt =
    new Date();

  sortColumn:
    keyof ActiveDeviceResponse =
      'location';

  sortDirection:
    'asc'
    | 'desc' =
      'asc';

  get totalDevices(): number {

    return this.reportData.length;
  }

  get totalLocations(): number {

    return new Set(
      this.reportData.map(
        item => item.location
      )
    ).size;
  }

  get activeDevices(): number {

    return this.reportData.filter(
      item =>
        item.status === 'ACTIVE'
        ||
        item.status === 'IN_USE'
        ||
        item.status === 'ASSIGNED'
    ).length;
  }

  get filteredData():
    ActiveDeviceResponse[] {

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
        ||
        item.location
          .toLowerCase()
          .includes(term)
    );
  }

  get sortedData():
    ActiveDeviceResponse[] {

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
      keyof ActiveDeviceResponse
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
      .getActiveDevicesReport()
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