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

import { SoftwareLicenseService }
from '../services/software-license.service';

import { ExportService }
from '../../../../shared/services/export.service';

import { SoftwareLicenseResponse }
from '../models/software-license-response.model';

import { SoftwareLicenseCreateRequest }
from '../models/software-license-create-request.model';

@Component({
  selector: 'app-software-licenses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './software-licenses.component.html',
  styleUrls: ['./software-licenses.component.css']
})
export class SoftwareLicensesComponent
implements OnInit {

  private readonly licenseService =
    inject(SoftwareLicenseService);

  private readonly exportService =
    inject(ExportService);

  private readonly cdr =
    inject(ChangeDetectorRef);

  allLicenses:
    SoftwareLicenseResponse[] = [];

  filteredLicenses:
    SoftwareLicenseResponse[] = [];

  searchTerm = '';

  selectedVendor = '';

  selectedLicenseType = '';

  selectedExportFormat = '';

  vendorMenuOpen = false;

  typeMenuOpen = false;

  exportMenuOpen = false;

  sortColumn = 'softwareName';

  sortDirection:
    'asc'
    | 'desc'
    = 'asc';

  openMenuId:
    number | null = null;

  loading = true;

  successMessage = '';

  errorMessage = '';

  showDialog = false;

  isEditMode = false;

  editingLicenseId:
    number | null = null;

  licenseForm:
    SoftwareLicenseCreateRequest = {

    licenseNumber: '',

    softwareName: '',

    vendor: '',

    licenseKey: '',

    licenseType: '',

    quantity: 1,

    purchaseDate: null,

    expirationDate: null,

    status: 'ACTIVE',

    notes: ''

  };

  constructor() {}

  ngOnInit(): void {

    this.loadLicenses();
  }

  loadLicenses(): void {

    this.loading = true;

    this.licenseService
      .getAllLicenses()
      .subscribe({

        next: (data) => {

          this.allLicenses = data;

          this.filteredLicenses = data;

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: () => {

          this.loading = false;

          this.errorMessage =
            'Fehler beim Laden der Lizenzen.';
        }

      });
  }

  get vendors(): string[] {

    return [
      ...new Set(
        this.allLicenses.map(
          item => item.vendor
        )
      )
    ].sort();
  }

  get licenseTypes(): string[] {

    return [
      ...new Set(
        this.allLicenses.map(
          item => item.licenseType
        )
      )
    ].sort();
  }

  applyFilters(): void {

    let data =
      [...this.allLicenses];

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    if (search) {

      data = data.filter(
        item =>

          item.licenseNumber
            .toLowerCase()
            .includes(search)

          ||

          item.softwareName
            .toLowerCase()
            .includes(search)

          ||

          item.vendor
            .toLowerCase()
            .includes(search)

          ||

          item.licenseType
            .toLowerCase()
            .includes(search)
      );
    }

    if (this.selectedVendor) {

      data = data.filter(
        item =>
          item.vendor ===
          this.selectedVendor
      );
    }

    if (this.selectedLicenseType) {

      data = data.filter(
        item =>
          item.licenseType ===
          this.selectedLicenseType
      );
    }

    this.filteredLicenses = data;
  }

  toggleVendorMenu(): void {

    this.vendorMenuOpen =
      !this.vendorMenuOpen;

    if (this.vendorMenuOpen) {

      this.typeMenuOpen = false;

      this.exportMenuOpen = false;
    }
  }

  toggleTypeMenu(): void {

    this.typeMenuOpen =
      !this.typeMenuOpen;

    if (this.typeMenuOpen) {

      this.vendorMenuOpen = false;

      this.exportMenuOpen = false;
    }
  }

  toggleExportMenu(): void {

    this.exportMenuOpen =
      !this.exportMenuOpen;

    if (this.exportMenuOpen) {

      this.vendorMenuOpen = false;

      this.typeMenuOpen = false;
    }
  }

  selectVendor(
    vendor: string
  ): void {

    this.selectedVendor =
      vendor;

    this.vendorMenuOpen = false;

    this.applyFilters();
  }

  selectLicenseType(
    type: string
  ): void {

    this.selectedLicenseType =
      type;

    this.typeMenuOpen = false;

    this.applyFilters();
  }

  clearVendorFilter(): void {

    this.selectedVendor = '';

    this.vendorMenuOpen = false;

    this.applyFilters();
  }

  clearTypeFilter(): void {

    this.selectedLicenseType = '';

    this.typeMenuOpen = false;

    this.applyFilters();
  }

  exportAs(
    format: string
  ): void {

    this.selectedExportFormat =
      format;

    this.exportData();

    this.exportMenuOpen = false;
  }

  sortBy(
    column: string
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

  get sortedData():
    SoftwareLicenseResponse[] {

    const data =
      [...this.filteredLicenses];

    data.sort((a, b) => {

      let valueA = '';

      let valueB = '';

      switch (
        this.sortColumn
      ) {

        case 'licenseNumber':

          valueA =
            a.licenseNumber;

          valueB =
            b.licenseNumber;

          break;

        case 'softwareName':

          valueA =
            a.softwareName;

          valueB =
            b.softwareName;

          break;

        case 'vendor':

          valueA =
            a.vendor;

          valueB =
            b.vendor;

          break;

        case 'licenseType':

          valueA =
            a.licenseType;

          valueB =
            b.licenseType;

          break;

        case 'expirationDate':

          valueA =
            a.expirationDate ?? '';

          valueB =
            b.expirationDate ?? '';

          break;

        case 'status':

          valueA =
            a.status;

          valueB =
            b.status;

          break;
      }

      const result =
        valueA.localeCompare(
          valueB
        );

      return this.sortDirection === 'asc'
        ? result
        : -result;
    });

    return data;
  }

  exportData(): void {

    const exportData =
      this.sortedData.map(
        item => ({

          LicenseNumber:
            item.licenseNumber,

          Software:
            item.softwareName,

          Vendor:
            item.vendor,

          LicenseType:
            item.licenseType,

          Quantity:
            item.quantity,

          UsedQuantity:
            item.usedQuantity,

          AvailableQuantity:
            item.availableQuantity,

          ExpirationDate:
            item.expirationDate ?? '',

          Status:
            item.status

        })
      );

    switch (
      this.selectedExportFormat
    ) {

      case 'csv':

        this.exportService
          .exportToCsv(
            exportData,
            'software-licenses'
          );

        break;

      case 'excel':

        this.exportService
          .exportToExcel(
            exportData,
            'software-licenses'
          );

        break;

      case 'pdf':

        this.exportService
          .exportToPdf(
            exportData,
            'software-licenses'
          );

        break;
    }

    this.selectedExportFormat = '';
  }

  toggleMenu(
    id: number
  ): void {

    this.openMenuId =
      this.openMenuId === id
        ? null
        : id;
  }

  closeMenu(): void {

    this.openMenuId = null;
  }

  getUsagePercent(
    item: SoftwareLicenseResponse
  ): number {

    if (
      item.quantity === 0
    ) {

      return 0;
    }

    return Math.round(
      item.usedQuantity /
      item.quantity *
      100
    );
  }

  openCreateDialog(): void {

    this.isEditMode = false;

    this.editingLicenseId = null;

    this.resetForm();

    this.showDialog = true;
  }

  editLicense(
    item: SoftwareLicenseResponse
  ): void {

    this.isEditMode = true;

    this.editingLicenseId =
      item.id;

    this.licenseForm = {

      licenseNumber:
        item.licenseNumber,

      softwareName:
        item.softwareName,

      vendor:
        item.vendor,

      licenseKey:
        item.licenseKey ?? '',

      licenseType:
        item.licenseType,

      quantity:
        item.quantity,

      purchaseDate:
        item.purchaseDate,

      expirationDate:
        item.expirationDate,

      status:
        item.status,

      notes:
        item.notes ?? ''

    };

    this.showDialog = true;

    this.closeMenu();
  }

  closeDialog(): void {

    this.showDialog = false;

    this.closeMenu();

    this.vendorMenuOpen = false;

    this.typeMenuOpen = false;

    this.exportMenuOpen = false;
  }

  saveLicense(): void {

    this.successMessage = '';

    this.errorMessage = '';

    this.showDialog = false;

    this.loadLicenses();
  }

  private resetForm(): void {

    this.licenseForm = {

      licenseNumber: '',

      softwareName: '',

      vendor: '',

      licenseKey: '',

      licenseType: '',

      quantity: 1,

      purchaseDate: null,

      expirationDate: null,

      status: 'ACTIVE',

      notes: ''

    };
  }

}