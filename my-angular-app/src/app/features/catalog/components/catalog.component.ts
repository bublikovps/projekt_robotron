import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  RouterLink,
  ActivatedRoute
} from '@angular/router';

import {
  ChangeDetectorRef
} from '@angular/core';

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

  private readonly cdr =
  inject(ChangeDetectorRef);

  categories =
    this.catalogService.categories;

  products:
    CatalogProductResponse[] = [];

  selectedCategoryId:
    number | null = null;

  searchTerm = '';

  ngOnInit(): void {

    this.catalogService
      .loadCategoriesIfNeeded();

    this.route.paramMap
      .subscribe(params => {

        const categoryId =
          params.get('id');

        this.selectedCategoryId =
          categoryId
            ? Number(categoryId)
            : null;

        this.loadProducts();

        this.cdr.detectChanges();
      });
  }

  loadProducts(): void {

    this.catalogService
      .getProducts(
        this.searchTerm,
        this.selectedCategoryId
      )
      .subscribe({

        next: data => {

          this.products = data;

          this.cdr.detectChanges();
        },

        
      });
  }

  onSearch(): void {

    this.loadProducts();
  }

  clearSearch(): void {

    this.searchTerm = '';

    this.loadProducts();
  }
}