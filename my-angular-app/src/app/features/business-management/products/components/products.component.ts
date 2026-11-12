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

import { ProductService }
from '../services/product.service';

import { CategoryService }
from '../../categories/services/category.service';

import { ProductResponse }
from '../models/product-response.model';

import { ProductCreateRequest }
from '../models/product-create-request.model';

import { ProductUpdateRequest }
from '../models/product-update-request.model';

import { CategoryResponse }
from '../../categories/models/category-response.model';

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

  products: ProductResponse[] = [];

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

        next: data => {

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

        next: data => {

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
        .toLowerCase()
        .trim();

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

  openCreateDialog(): void {

    this.resetForm();

    this.isEditMode = false;

    this.editingProductId =
      null;

    this.showDialog = true;
  }

  closeDialog(): void {

    this.showDialog = false;

    this.cancelEdit();
  }

  saveProduct(): void {

    if (
      this.isEditMode &&
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

            this.closeDialog();

            this.loadProducts();
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

          this.closeDialog();

          this.loadProducts();
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
  }

  archiveProduct(
    product: ProductResponse
  ): void {

    this.productService
      .archiveProduct(
        product.id
      )
      .subscribe({

        next: () => {

          this.loadProducts();
        }

      });
  }

  restoreProduct(
    product: ProductResponse
  ): void {

    this.productService
      .restoreProduct(
        product.id
      )
      .subscribe({

        next: () => {

          this.loadProducts();
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

  toggleExportMenu(): void {

    this.exportMenuOpen =
      !this.exportMenuOpen;
  }

  exportAs(
    format:
      'csv'
      | 'excel'
      | 'pdf'
  ): void {

    this.exportMenuOpen = false;

    alert(
      `${format.toUpperCase()} export coming soon`
    );
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

  cancelEdit(): void {

    this.isEditMode = false;

    this.editingProductId =
      null;

    this.resetForm();
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