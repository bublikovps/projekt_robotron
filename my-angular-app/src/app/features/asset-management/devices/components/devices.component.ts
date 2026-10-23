import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { DeviceService }
from '../services/device.service';

import { ProductService }
from '../../../business-management/products/services/product.service';

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

  devices: DeviceResponse[] = [];

  products: ProductResponse[] = [];

  successMessage = '';

  errorMessage = '';

  isEditMode = false;

  editingDeviceId: number | null = null;

  statuses = [
    'AVAILABLE',
    'ASSIGNED',
    'REPAIR',
    'RETIRED'
  ];

  deviceForm: DeviceCreateRequest = {

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
    private deviceService: DeviceService,
    private productService: ProductService
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

          this.devices = data;

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

        }

      });

  }

  saveDevice(): void {

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

  }

  archiveDevice(
    device: DeviceResponse
  ): void {

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