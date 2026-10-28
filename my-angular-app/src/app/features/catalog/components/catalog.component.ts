import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Router,
  RouterLink,
  ActivatedRoute
} from '@angular/router';

import { CategoryService }
from '../../business-management/categories/services/category.service';

import { ProductService }
from '../../business-management/products/services/product.service';

import { CategoryResponse }
from '../../business-management/categories/models/category-response.model';

import { ProductResponse }
from '../../business-management/products/models/product-response.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent
implements OnInit {

  categories: CategoryResponse[] = [];

  products: ProductResponse[] = [];

  selectedCategoryId:
    number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    this.loadCategories();

    this.route.paramMap.subscribe(params => {

      const categoryId =
        params.get('id');

      this.selectedCategoryId =
        categoryId
          ? Number(categoryId)
          : null;

      this.loadProducts();
    });
  }

  loadCategories(): void {

    this.categoryService
      .getAllCategories()
      .subscribe({

        next: data => {
          this.categories = data;
        },

        error: err => {
          console.error(
            'Fehler beim Laden der Kategorien',
            err
          );
        }
      });
  }

  loadProducts(): void {
    console.log(
      'LOAD PRODUCTS:',
      this.selectedCategoryId
    );

    this.productService
      .getAllProducts(
        '',
        null
      )
      .subscribe({

        next: data => {
          console.log('PRODUCTS', data);
          console.log('COUNT = ', data.length);
          this.products = data;
        },

        error: err => {
          console.error(
            'Fehler beim Laden der Produkte',
            err
          );
        }
      });
  }

  filterByCategory(
    categoryId: number
  ): void {

    this.router.navigate([
      '/category',
      categoryId
    ]);
  }

  showAllProducts(): void {

    this.router.navigate(['/']);
  }
}