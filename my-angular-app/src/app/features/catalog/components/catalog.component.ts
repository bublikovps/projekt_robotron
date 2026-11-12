import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  RouterLink,
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  Subject,
  debounceTime,
  distinctUntilChanged
} from 'rxjs';

import { CatalogService }
from '../services/catalog.service';

import { CatalogProductResponse }
from '../models/catalog-product-response.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent
implements OnInit {

  private readonly catalogService =
    inject(CatalogService);

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly cdr =
    inject(ChangeDetectorRef);

  private readonly searchSubject =
    new Subject<string>();

  categories =
    this.catalogService.categories;

  products:
    CatalogProductResponse[] = [];

  selectedCategoryId:
    number | null = null;

  searchTerm = '';

  isLoading = true;

  ngOnInit(): void {

    this.catalogService
      .loadCategoriesIfNeeded();

    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {

        this.loadProducts();
      });

    this.route.queryParamMap
      .subscribe(params => {

        const categoryId =
          params.get('category');

        this.selectedCategoryId =
          categoryId
            ? Number(categoryId)
            : null;

        this.loadProducts();
      });
  }

  loadProducts(): void {

    this.isLoading = true;

    this.catalogService
      .getProducts(
        this.searchTerm,
        this.selectedCategoryId
      )
      .subscribe({

        next: data => {

          this.products = data;

          this.isLoading = false;

          this.cdr.detectChanges();
        },

        error: () => {

          this.products = [];

          this.isLoading = false;

          this.cdr.detectChanges();
        }

      });
  }

  onSearch(): void {

    this.searchSubject.next(
      this.searchTerm
    );
  }

  clearSearch(): void {

    this.searchTerm = '';

    this.loadProducts();
  }

  selectCategory(
    categoryId: number | null
  ): void {

    this.router.navigate(
      ['/catalog'],
      {
        queryParams:
          categoryId
            ? {
                category: categoryId
              }
            : {}
      }
    );
  }

  trackByProductId(
    index: number,
    product: CatalogProductResponse
  ): number {

    return product.id;
  }
}
