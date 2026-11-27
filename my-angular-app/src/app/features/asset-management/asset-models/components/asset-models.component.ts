import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  AssetModelService
} from '../services/asset-model.service';

import {
  AssetModelResponse
} from '../models/asset-model-response.model';

import {
  AssetModelCreateRequest
} from '../models/asset-model-create-request.model';

import {
  AssetModelUpdateRequest
} from '../models/asset-model-update-request.model';

import {
  ExportService
} from '../../../../shared/services/export.service';

@Component({
  selector: 'app-asset-models',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './asset-models.component.html',
  styleUrls: ['./asset-models.component.css']
})
export class AssetModelsComponent
implements OnInit {

  allAssetModels:
    AssetModelResponse[] = [];

  filteredAssetModels:
    AssetModelResponse[] = [];

  searchTerm = '';

  successMessage = '';

  errorMessage = '';

  exportMenuOpen = false;

  selectedExportFormat = '';

  selectedImportFile:
    File | null = null;

  openMenuId:
    number | null = null;

  showDialog = false;

  isEditMode = false;

  editingAssetModelId:
    number | null = null;

  statusFilter:
    'active'
    | 'archived'
    | 'all'
    = 'active';

  sortColumn = 'assetCode';

  sortDirection:
    'asc'
    | 'desc'
    = 'asc';

  assetModelForm:
    AssetModelCreateRequest = {

      assetCode: '',

      name: '',

      manufacturer: '',

      assetCategory: '',

      description: '',

      defaultPurchasePrice: 0,

      expectedLifetimeMonths: 48,

      defaultWarrantyMonths: 36

    };

  constructor(

    private assetModelService:
      AssetModelService,

    private exportService:
      ExportService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadAssetModels();

  }

  loadAssetModels(): void {

    switch (
      this.statusFilter
    ) {

      case 'active':

        this.assetModelService
          .getActive()
          .subscribe({

            next: (
              data:
              AssetModelResponse[]
            ) => {

              this.allAssetModels =
                data;

              this.applyFilters();

              this.cdr.detectChanges();

            },

            error: () => {

              this.errorMessage =
                'Fehler beim Laden der Asset Models.';

            }

          });

        break;

      case 'archived':

        this.assetModelService
          .getArchived()
          .subscribe({

            next: (
              data:
              AssetModelResponse[]
            ) => {

              this.allAssetModels =
                data;

              this.applyFilters();

              this.cdr.detectChanges();

            }

          });

        break;

      default:

        this.assetModelService
          .getAll()
          .subscribe({

            next: (
              data:
              AssetModelResponse[]
            ) => {

              this.allAssetModels =
                data;

              this.applyFilters();

              this.cdr.detectChanges();

            }

          });

    }

  }

  applyFilters(): void {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    if (!search) {

      this.filteredAssetModels =
        [...this.allAssetModels];

      return;

    }

    this.filteredAssetModels =
      this.allAssetModels.filter(

        assetModel =>

          (assetModel.assetCode ?? '')
            .toLowerCase()
            .includes(search)

          ||

          (assetModel.name ?? '')
            .toLowerCase()
            .includes(search)

          ||

          (assetModel.manufacturer ?? '')
            .toLowerCase()
            .includes(search)

          ||

          (assetModel.assetCategory ?? '')
            .toLowerCase()
            .includes(search)

      );

  }

  setStatusFilter(
    filter:
      'active'
      | 'archived'
      | 'all'
  ): void {

    this.statusFilter =
      filter;

    this.loadAssetModels();

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

  get sortedAssetModels():
    AssetModelResponse[] {

    const data =
      [...this.filteredAssetModels];

    data.sort((a, b) => {

      let valueA = '';

      let valueB = '';

      switch (
        this.sortColumn
      ) {

        case 'assetCode':

          valueA =
            a.assetCode;

          valueB =
            b.assetCode;

          break;

        case 'name':

          valueA =
            a.name;

          valueB =
            b.name;

          break;

        case 'manufacturer':

          valueA =
            a.manufacturer;

          valueB =
            b.manufacturer;

          break;

        case 'assetCategory':

          valueA =
            a.assetCategory;

          valueB =
            b.assetCategory;

          break;

        default:

          valueA =
            a.assetCode;

          valueB =
            b.assetCode;

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

  toggleExportMenu(): void {

    this.exportMenuOpen =
      !this.exportMenuOpen;

  }

  exportData(): void {

    const exportData =
      this.sortedAssetModels.map(
        assetModel => ({

          AssetCode:
            assetModel.assetCode,

          Name:
            assetModel.name,

          Manufacturer:
            assetModel.manufacturer,

          Category:
            assetModel.assetCategory,

          Price:
            assetModel.defaultPurchasePrice,

          LifetimeMonths:
            assetModel.expectedLifetimeMonths,

          WarrantyMonths:
            assetModel.defaultWarrantyMonths,

          Active:
            assetModel.active
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
            'asset-models'
          );

        break;

      case 'excel':

        this.exportService
          .exportToExcel(
            exportData,
            'asset-models'
          );

        break;

      case 'pdf':

        this.exportService
          .exportToPdf(
            exportData,
            'asset-models'
          );

        break;

    }

  }

  exportAs(
    format: string
  ): void {

    this.selectedExportFormat =
      format;

    this.exportData();

    this.exportMenuOpen = false;

  }

  importAssetModels(): void {

    document
      .getElementById(
        'asset-model-import-file'
      )
      ?.click();

  }

  onImportFileSelected(
    event: Event
  ): void {

    const target =
      event.target as HTMLInputElement;

    if (
      !target.files ||
      target.files.length === 0
    ) {
      return;
    }

    const file =
      target.files[0];

    this.assetModelService
      .importAssetModels(file)
      .subscribe({

        next: response => {

          this.successMessage =
            response.message;

          this.loadAssetModels();

          target.value = '';

        },

        error: error => {

          this.errorMessage =
            error.error?.message
            || 'Import fehlgeschlagen';

          target.value = '';

        }

      });

  }

  openCreateDialog(): void {

    this.resetForm();

    this.isEditMode = false;

    this.editingAssetModelId =
      null;

    this.showDialog = true;

  }

  editAssetModel(
    assetModel: AssetModelResponse
  ): void {

    this.isEditMode = true;

    this.editingAssetModelId =
      assetModel.id;

    this.assetModelForm = {

      assetCode:
        assetModel.assetCode,

      name:
        assetModel.name,

      manufacturer:
        assetModel.manufacturer,

      assetCategory:
        assetModel.assetCategory,

      description:
        assetModel.description,

      defaultPurchasePrice:
        assetModel.defaultPurchasePrice,

      expectedLifetimeMonths:
        assetModel.expectedLifetimeMonths,

      defaultWarrantyMonths:
        assetModel.defaultWarrantyMonths

    };

    this.showDialog = true;

    this.closeMenu();

  }

  saveAssetModel(): void {

    if (
      this.isEditMode &&
      this.editingAssetModelId !== null
    ) {

      const request:
        AssetModelUpdateRequest = {

        ...this.assetModelForm,

        active: true

      };

      this.assetModelService
        .update(
          this.editingAssetModelId,
          request
        )
        .subscribe({

          next: () => {

            this.successMessage =
              'Asset Model aktualisiert.';

            this.closeDialog();

            this.loadAssetModels();

          }

        });

      return;

    }

    this.assetModelService
      .create(
        this.assetModelForm
      )
      .subscribe({

        next: () => {

          this.successMessage =
            'Asset Model erstellt.';

          this.closeDialog();

          this.loadAssetModels();

        }

      });

  }

  archiveAssetModel(
    assetModel: AssetModelResponse
  ): void {

    this.assetModelService
      .archive(assetModel.id)
      .subscribe({

        next: res => {

          this.successMessage =
            res.message;

          this.loadAssetModels();

          this.closeMenu();

        }

      });

  }

  restoreAssetModel(
    assetModel: AssetModelResponse
  ): void {

    this.assetModelService
      .restore(assetModel.id)
      .subscribe({

        next: res => {

          this.successMessage =
            res.message;

          this.loadAssetModels();

          this.closeMenu();

        }

      });

  }

  closeDialog(): void {

    this.showDialog = false;

    this.cancelEdit();

  }

  cancelEdit(): void {

    this.isEditMode = false;

    this.editingAssetModelId =
      null;

    this.resetForm();

  }

  private resetForm(): void {

    this.assetModelForm = {

      assetCode: '',

      name: '',

      manufacturer: '',

      assetCategory: '',

      description: '',

      defaultPurchasePrice: 0,

      expectedLifetimeMonths: 48,

      defaultWarrantyMonths: 36

    };

  }

}