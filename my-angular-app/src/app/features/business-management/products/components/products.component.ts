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
  ProductService
} from '../services/product.service';

import {
  CategoryService
} from '../../categories/services/category.service';

import {
  ExportService
} from '../../../../shared/services/export.service';

import {
  ProductResponse
} from '../models/product-response.model';

import {
  ProductCreateRequest
} from '../models/product-create-request.model';

import {
  ProductUpdateRequest
} from '../models/product-update-request.model';

import {
  CategoryResponse
} from '../../categories/models/category-response.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent
implements OnInit {

  products:
    ProductResponse[] = [];

  filteredProducts:
    ProductResponse[] = [];

  categories:
    CategoryResponse[] = [];

  searchTerm = '';

  selectedCategoryId:
    number | null = null;

  statusFilter:
    'active'
    | 'archived'
    | 'all'
    = 'active';

  successMessage = '';

  errorMessage = '';

  showDialog = false;

  isEditMode = false;

  editingProductId:
    number | null = null;

  exportMenuOpen = false;

  categoryMenuOpen = false;

  selectedImportFile:
    File | null = null;

  selectedExportFormat = '';

  openMenuId:
    number | null = null;

  sortColumn = 'sku';

  sortDirection:
    'asc'
    | 'desc'
    = 'asc';

  productForm:
    ProductCreateRequest = {

      sku: '',

      name: '',

      manufacturer: '',

      description: '',

      price: 0,

      purchasePrice: 0,

      salePrice: 0,

      supplier: '',

      imageUrl: '',

      lagerbestand: 0,

      minimumStock: 0,

      categoryId: 0

    };

  constructor(

    private productService:
      ProductService,

    private categoryService:
      CategoryService,

    private exportService:
      ExportService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadProducts();

    this.loadCategories();

  }

  loadProducts(): void {

    this.productService
      .getAllProductsForManagement()
      .subscribe({

        next: (
          data: ProductResponse[]
        ) => {

          this.products = data;

          this.applyFilters();

          this.cdr.detectChanges();

        },

        error: () => {

          this.errorMessage =
            'Fehler beim Laden der Produkte.';

          this.cdr.detectChanges();

        }

      });

  }

  loadCategories(): void {

    this.categoryService
      .getAllCategories()
      .subscribe({

        next: (
          data: CategoryResponse[]
        ) => {

          this.categories =
            data.filter(
              category =>
                category.active
            );

        }

      });

  }

  applyFilters(): void {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    this.filteredProducts =
      this.products.filter(product => {

        const matchesSearch =

          product.name
            .toLowerCase()
            .includes(search)

          ||

          product.sku
            .toLowerCase()
            .includes(search)

          ||

          product.manufacturer
            .toLowerCase()
            .includes(search)

          ||

          product.supplier
            .toLowerCase()
            .includes(search);

        const matchesCategory =

          this.selectedCategoryId === null

          ||

          product.categoryId ===
          this.selectedCategoryId;

        const matchesStatus =

          this.statusFilter === 'all'

          ||

          (
            this.statusFilter === 'active'
            &&
            product.active
          )

          ||

          (
            this.statusFilter === 'archived'
            &&
            !product.active
          );

        return (

          matchesSearch
          &&
          matchesCategory
          &&
          matchesStatus

        );

      });

  }

  setStatusFilter(
    filter:
      'active'
      | 'archived'
      | 'all'
  ): void {

    this.statusFilter =
      filter;

    this.applyFilters();

  }

  toggleCategoryMenu(): void {

    this.categoryMenuOpen =
      !this.categoryMenuOpen;

  }

  toggleExportMenu(): void {

    this.exportMenuOpen =
      !this.exportMenuOpen;

  }

  toggleMenu(
    productId: number
  ): void {

    this.openMenuId =
      this.openMenuId === productId
        ? null
        : productId;

  }

  closeMenu(): void {

    this.openMenuId = null;

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

  get sortedProducts():
    ProductResponse[] {

    const data =
      [...this.filteredProducts];

    data.sort((a, b) => {

      switch (
        this.sortColumn
      ) {

        case 'sku':

          return this.compare(
            a.sku,
            b.sku
          );

        case 'name':

          return this.compare(
            a.name,
            b.name
          );

        case 'supplier':

          return this.compare(
            a.supplier,
            b.supplier
          );

        case 'price':

          return this.compareNumber(
            a.price,
            b.price
          );

        case 'lagerbestand':

          return this.compareNumber(
            a.lagerbestand,
            b.lagerbestand
          );

        default:

          return 0;

      }

    });

    return data;

  }

  exportData(): void {

    const exportData =
      this.sortedProducts.map(
        product => ({

          SKU:
            product.sku,

          Name:
            product.name,

          Category:
            product.categoryName,

          Supplier:
            product.supplier,

          Price:
            product.price,

          PurchasePrice:
            product.purchasePrice,

          SalePrice:
            product.salePrice,

          Stock:
            product.lagerbestand,

          MinimumStock:
            product.minimumStock,

          Active:
            product.active
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
            'products'
          );

        break;

      case 'excel':

        this.exportService
          .exportToExcel(
            exportData,
            'products'
          );

        break;

      case 'pdf':

        this.exportService
          .exportToPdf(
            exportData,
            'products'
          );

        break;

    }

  }

  exportAs(
    format:
      'csv'
      | 'excel'
      | 'pdf'
  ): void {

    this.selectedExportFormat =
      format;

    this.exportData();

    this.exportMenuOpen = false;

  }

  importProducts(): void {

    document
      .getElementById(
        'product-import-file'
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

    this.productService
      .importProducts(file)
      .subscribe({

        next: response => {

          this.successMessage =
            response.message;

          this.errorMessage = '';

          this.loadProducts();

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

    this.editingProductId = null;

    this.showDialog = true;

  }

  closeDialog(): void {

    this.showDialog = false;

    this.cancelEdit();

  }

  saveProduct(): void {

    if (
      this.isEditMode
      &&
      this.editingProductId !== null
    ) {

      const updateRequest:
        ProductUpdateRequest = {

        name:
          this.productForm.name,

        manufacturer:
          this.productForm.manufacturer,

        description:
          this.productForm.description,

        price:
          this.productForm.price,

        purchasePrice:
          this.productForm.purchasePrice,

        salePrice:
          this.productForm.salePrice,

        supplier:
          this.productForm.supplier,

        imageUrl:
          this.productForm.imageUrl,

        lagerbestand:
          this.productForm.lagerbestand,

        minimumStock:
          this.productForm.minimumStock,

        categoryId:
          this.productForm.categoryId

      };

      this.productService
        .updateProduct(
          this.editingProductId,
          updateRequest
        )
        .subscribe({

          next: () => {

            this.successMessage =
              'Produkt aktualisiert.';

            this.errorMessage = '';

            this.closeDialog();

            this.loadProducts();

          },

          error: () => {

            this.errorMessage =
              'Fehler beim Aktualisieren.';

          }

        });

      return;

    }

    this.productService
      .createProduct(
        this.productForm
      )
      .subscribe({

        next: () => {

          this.successMessage =
            'Produkt erstellt.';

          this.errorMessage = '';

          this.closeDialog();

          this.loadProducts();

        },

        error: () => {

          this.errorMessage =
            'Fehler beim Erstellen.';

        }

      });

  }

  editProduct(
    product: ProductResponse
  ): void {

    this.isEditMode = true;

    this.editingProductId =
      product.id;

    this.productForm = {

      sku:
        product.sku,

      name:
        product.name,

      manufacturer:
        product.manufacturer,

      description:
        product.description,

      price:
        product.price,

      purchasePrice:
        product.purchasePrice,

      salePrice:
        product.salePrice,

      supplier:
        product.supplier,

      imageUrl:
        product.imageUrl,

      lagerbestand:
        product.lagerbestand,

      minimumStock:
        product.minimumStock,

      categoryId:
        product.categoryId

    };

    this.showDialog = true;

    this.closeMenu();

  }

  archiveProduct(
    product: ProductResponse
  ): void {

    this.productService
      .archiveProduct(product.id)
      .subscribe({

        next: response => {

          this.successMessage =
            response.message;

          this.errorMessage = '';

          this.loadProducts();

          this.closeMenu();

        }

      });

  }

  restoreProduct(
    product: ProductResponse
  ): void {

    this.productService
      .restoreProduct(product.id)
      .subscribe({

        next: response => {

          this.successMessage =
            response.message;

          this.errorMessage = '';

          this.loadProducts();

          this.closeMenu();

        }

      });

  }

  openCatalogView(
    product: ProductResponse
  ): void {

    window.open(
      `/catalog/products/${product.id}`,
      '_blank'
    );

  }

  cancelEdit(): void {

    this.isEditMode = false;

    this.editingProductId =
      null;

    this.resetForm();

  }

  private compare(
    a: string,
    b: string
  ): number {

    const result =
      (a ?? '')
        .localeCompare(
          b ?? ''
        );

    return this.sortDirection === 'asc'
      ? result
      : -result;

  }

  private compareNumber(
    a: number,
    b: number
  ): number {

    const result =
      (a ?? 0)
      - (b ?? 0);

    return this.sortDirection === 'asc'
      ? result
      : -result;

  }

  private resetForm(): void {

    this.productForm = {

      sku: '',

      name: '',

      manufacturer: '',

      description: '',

      price: 0,

      purchasePrice: 0,

      salePrice: 0,

      supplier: '',

      imageUrl: '',

      lagerbestand: 0,

      minimumStock: 0,

      categoryId: 0

    };

  }

}