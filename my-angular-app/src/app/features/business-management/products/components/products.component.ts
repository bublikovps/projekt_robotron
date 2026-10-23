import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

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

  categories: CategoryResponse[] = [];

  successMessage = '';

  errorMessage = '';

  isEditMode = false;

  editingProductId: number | null = null;

  productForm: ProductCreateRequest = {

    sku: '',

    name: '',

    manufacturer: '',

    description: '',

    price: 0,

    lagerbestand: 0,

    minimumStock: 0,

    categoryId: 0

  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    this.loadProducts();

    this.loadCategories();

  }

  loadProducts(): void {

    this.productService
      .getAllProducts()
      .subscribe({

        next: data => {

          this.products = data;

        },

        error: () => {

          this.errorMessage =
            'Fehler beim Laden der Produkte.';

        }

      });

  }

  loadCategories(): void {

    this.categoryService
      .getAllCategories()
      .subscribe({

        next: data => {

          this.categories = data;

        }

      });

  }

  saveProduct(): void {

    this.successMessage = '';
    this.errorMessage = '';

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

            this.cancelEdit();

            this.loadProducts();

          }

        });

      return;

    }

    this.productService
      .createProduct(this.productForm)
      .subscribe({

        next: () => {

          this.successMessage =
            'Produkt erstellt.';

          this.resetForm();

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

      lagerbestand:
        product.lagerbestand,

      minimumStock:
        product.minimumStock,

      categoryId:
        product.categoryId

    };

  }

  archiveProduct(
    product: ProductResponse
  ): void {

    if (
      !confirm(
        `Produkt "${product.name}" archivieren?`
      )
    ) {
      return;
    }

    this.productService
      .archiveProduct(product.id)
      .subscribe({

        next: (res) => {

          this.successMessage =
            res.message;

          this.loadProducts();

        }

      });

  }

  cancelEdit(): void {

    this.isEditMode = false;

    this.editingProductId = null;

    this.resetForm();

  }

  private resetForm(): void {

    this.productForm = {

      sku: '',

      name: '',

      manufacturer: '',

      description: '',

      price: 0,

      lagerbestand: 0,

      minimumStock: 0,

      categoryId: 0

    };

  }

}