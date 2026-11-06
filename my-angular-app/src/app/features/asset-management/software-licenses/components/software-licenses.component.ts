import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { SoftwareLicenseService }
from '../services/software-license.service';

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

  licenses:
    SoftwareLicenseResponse[] = [];

  loading = true;

  successMessage = '';

  errorMessage = '';

  searchTerm = '';

  showDialog = false;

  isEditMode = false;

  editingLicenseId:
    number | null = null;

  sortColumn:
    keyof SoftwareLicenseResponse =
      'softwareName';

  sortDirection:
    'asc'
    | 'desc'
    =
    'asc';

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

  get filteredData():
    SoftwareLicenseResponse[] {

    if (!this.searchTerm.trim()) {

      return this.licenses;
    }

    const term =
      this.searchTerm.toLowerCase();

    return this.licenses.filter(
      item =>

        item.softwareName
          .toLowerCase()
          .includes(term)

        ||

        item.vendor
          .toLowerCase()
          .includes(term)

        ||

        item.licenseNumber
          .toLowerCase()
          .includes(term)
    );
  }

  get sortedData():
    SoftwareLicenseResponse[] {

    const data =
      [...this.filteredData];

    data.sort((a, b) => {

      const valueA =
        a[this.sortColumn];

      const valueB =
        b[this.sortColumn];

      if (valueA == null) {

        return 1;
      }

      if (valueB == null) {

        return -1;
      }

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

  ngOnInit(): void {

    this.loadLicenses();
  }

  sortBy(
    column:
      keyof SoftwareLicenseResponse
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

  getUsagePercent(
    item: SoftwareLicenseResponse
  ): number {

    if (item.quantity === 0) {

      return 0;
    }

    return Math.round(
      item.usedQuantity /
      item.quantity * 100
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
  }

  closeDialog(): void {

    this.showDialog = false;
  }

  saveLicense(): void {

    this.successMessage = '';

    this.errorMessage = '';

    this.showDialog = false;

    this.loadLicenses();
  }

  loadLicenses(): void {

    this.loading = true;

    this.licenseService
      .getAllLicenses()
      .subscribe({

        next: (data) => {

          this.licenses = data;

          this.loading = false;
        },

        error: () => {

          this.loading = false;

          this.errorMessage =
            'Fehler beim Laden der Lizenzen.';
        }

      });
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