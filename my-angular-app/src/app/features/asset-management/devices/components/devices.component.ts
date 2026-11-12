import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { DeviceService }
from '../services/device.service';

import { ProductService }
from '../../../business-management/products/services/product.service';

import { ExportService }
from '../../../../shared/services/export.service';

import { DeviceResponse }
from '../models/device-response.model';

import { DeviceCreateRequest }
from '../models/device-create-request.model';

import { ProductResponse }
from '../../../business-management/products/models/product-response.model';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent
implements OnInit {

  allDevices:
    DeviceResponse[] = [];

  filteredDevices:
    DeviceResponse[] = [];

  products:
    ProductResponse[] = [];

  searchTerm = '';

  selectedExportFormat = '';

  exportMenuOpen = false;

  sortColumn = 'inventoryNumber';

  sortDirection:
    'asc'
    | 'desc'
    = 'asc';

  openMenuId:
    number | null = null;

  successMessage = '';

  errorMessage = '';

  isEditMode = false;

  showDialog = false;

  editingDeviceId:
    number | null = null;

  statuses = [

    'AVAILABLE',

    'ASSIGNED',

    'REPAIR',

    'RETIRED'

  ];

  deviceForm:
    DeviceCreateRequest = {

    productId: 0,

    inventoryNumber: '',

    serialNumber: '',

    manufacturerAssetTag: '',

    purchaseDate: null,

    purchasePrice: null,

    warrantyUntil: null,

    status: 'AVAILABLE',

    location: '',

    notes: ''

  };

  constructor(

    private deviceService:
      DeviceService,

    private productService:
      ProductService,

    private exportService:
      ExportService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadDevices();

    this.loadProducts();
  }

  loadDevices(): void {

    this.deviceService
      .getAllDevices()
      .subscribe({

        next: (data) => {

          this.allDevices = data;

          this.filteredDevices = data;

          this.cdr.detectChanges();
        },

        error: () => {

          this.errorMessage =
            'Fehler beim Laden der Geräte.';
        }

      });
  }

  loadProducts(): void {

    this.productService
      .getAllProducts('', null)
      .subscribe({

        next: (data) => {

          this.products = data;

          this.cdr.detectChanges();
        }

      });
  }

  applyFilters(): void {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    if (!search) {

      this.filteredDevices =
        [...this.allDevices];

      return;
    }

    this.filteredDevices =
      this.allDevices.filter(
        device =>

          device.inventoryNumber
            .toLowerCase()
            .includes(search)

          ||

          device.productName
            .toLowerCase()
            .includes(search)

          ||

          device.serialNumber
            .toLowerCase()
            .includes(search)

          ||

          device.manufacturerAssetTag
            .toLowerCase()
            .includes(search)

          ||

          device.status
            .toLowerCase()
            .includes(search)

          ||

          device.location
            .toLowerCase()
            .includes(search)
      );
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

  get sortedDevices():
    DeviceResponse[] {

    const data =
      [...this.filteredDevices];

    data.sort((a, b) => {

      let valueA = '';

      let valueB = '';

      switch (
        this.sortColumn
      ) {

        case 'inventoryNumber':

          valueA =
            a.inventoryNumber;

          valueB =
            b.inventoryNumber;

          break;

        case 'productName':

          valueA =
            a.productName;

          valueB =
            b.productName;

          break;

        case 'serialNumber':

          valueA =
            a.serialNumber;

          valueB =
            b.serialNumber;

          break;

        case 'status':

          valueA =
            a.status;

          valueB =
            b.status;

          break;

        case 'location':

          valueA =
            a.location;

          valueB =
            b.location;

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
      this.sortedDevices.map(
        device => ({

          InventoryNumber:
            device.inventoryNumber,

          Product:
            device.productName,

          SerialNumber:
            device.serialNumber,

          AssetTag:
            device.manufacturerAssetTag,

          Status:
            device.status,

          Location:
            device.location,

          PurchaseDate:
            device.purchaseDate ?? '',

          PurchasePrice:
            device.purchasePrice ?? '',

          WarrantyUntil:
            device.warrantyUntil ?? '',

          Active:
            device.active
              ? 'Yes'
              : 'No'

        })
      );

    switch (
      this.selectedExportFormat
    ) {

      case 'csv':

        this.exportService
          .exportToCsv(
            exportData,
            'devices'
          );

        break;

      case 'excel':

        this.exportService
          .exportToExcel(
            exportData,
            'devices'
          );

        break;

      case 'pdf':

        this.exportService
          .exportToPdf(
            exportData,
            'devices'
          );

        break;
    }

    this.selectedExportFormat = '';
  }

 toggleExportMenu(): void {

    this.exportMenuOpen =
      !this.exportMenuOpen;
  }

  exportAs(
    format: string
  ): void {

    this.selectedExportFormat =
      format;

    this.exportData();

    this.exportMenuOpen = false;
  }

  toggleMenu(
    deviceId: number
  ): void {

    this.openMenuId =
      this.openMenuId === deviceId
        ? null
        : deviceId;
  }

  closeMenu(): void {

    this.openMenuId = null;
  }

  getStatusClass(
    status: string
  ): string {

    return status.toLowerCase();
  }

  openCreateDialog(): void {

    this.isEditMode = false;

    this.editingDeviceId = null;

    this.resetForm();

    this.showDialog = true;
  }

  closeDialog(): void {

    this.showDialog = false;

    this.cancelEdit();
  }

  saveDevice(): void {

    this.successMessage = '';

    this.errorMessage = '';

    if (
      this.isEditMode &&
      this.editingDeviceId !== null
    ) {

      this.deviceService
        .updateDevice(
          this.editingDeviceId,
          this.deviceForm
        )
        .subscribe({

          next: () => {

            this.successMessage =
              'Gerät aktualisiert.';

            this.showDialog = false;

            this.cancelEdit();

            this.loadDevices();
          }

        });

      return;
    }

    this.deviceService
      .createDevice(
        this.deviceForm
      )
      .subscribe({

        next: () => {

          this.successMessage =
            'Gerät erstellt.';

          this.showDialog = false;

          this.resetForm();

          this.loadDevices();
        }

      });
  }

  editDevice(
    device: DeviceResponse
  ): void {

    this.isEditMode = true;

    this.editingDeviceId =
      device.id;

    this.deviceForm = {

      productId:
        device.productId,

      inventoryNumber:
        device.inventoryNumber,

      serialNumber:
        device.serialNumber,

      manufacturerAssetTag:
        device.manufacturerAssetTag,

      purchaseDate:
        device.purchaseDate,

      purchasePrice:
        device.purchasePrice,

      warrantyUntil:
        device.warrantyUntil,

      status:
        device.status,

      location:
        device.location,

      notes:
        device.notes

    };

    this.showDialog = true;

    this.closeMenu();
  }

  archiveDevice(
    device: DeviceResponse
  ): void {

    this.closeMenu();

    if (
      !confirm(
        `Gerät "${device.inventoryNumber}" archivieren?`
      )
    ) {

      return;
    }

    this.deviceService
      .archiveDevice(device.id)
      .subscribe({

        next: (res) => {

          this.successMessage =
            res.message;

          this.loadDevices();
        }

      });
  }

  cancelEdit(): void {

    this.isEditMode = false;

    this.editingDeviceId = null;

    this.resetForm();
  }

  private resetForm(): void {

    this.deviceForm = {

      productId: 0,

      inventoryNumber: '',

      serialNumber: '',

      manufacturerAssetTag: '',

      purchaseDate: null,

      purchasePrice: null,

      warrantyUntil: null,

      status: 'AVAILABLE',

      location: '',

      notes: ''

    };
  }

}