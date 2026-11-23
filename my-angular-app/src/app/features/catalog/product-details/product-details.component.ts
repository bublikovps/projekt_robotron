import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { CatalogService }
from '../services/catalog.service';

import { CatalogProductResponse }
from '../models/catalog-product-response.model';

import { CartService }
from '../../../core/services/cart.service';

import { AuthService }
from '../../../core/services/auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent
implements OnInit {

  product?: CatalogProductResponse;

  isLoading = true;

  errorMessage = '';

  currentRole = '';

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private cartService: CartService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.authService
      .currentUser$
      .subscribe(user => {

        this.currentRole =
          user?.role ?? '';

      });

    this.route.paramMap
      .subscribe(params => {

        const id =
          Number(
            params.get('id')
          );

        if (!id) {

          this.errorMessage =
            'Ungültige Produkt-ID';

          this.isLoading = false;

          this.cdr.markForCheck();

          return;

        }

        this.loadProduct(id);

      });

  }

  private loadProduct(
    id: number
  ): void {

    this.product = undefined;

    this.isLoading = true;

    this.errorMessage = '';

    this.catalogService
      .getProductById(id)
      .subscribe({

        next: product => {

          this.product = product;

          this.isLoading = false;

          this.cdr.markForCheck();

        },

        error: () => {

          this.errorMessage =
            'Produkt nicht gefunden.';

          this.isLoading = false;

          this.cdr.markForCheck();

        }

      });

  }

  addToCart(): void {

    if (!this.product) {

      return;

    }

    this.cartService.addToCart(
      this.product
    );

  }

  canUseCart(): boolean {

    return this.currentRole !==
           'ROLE_MANAGER'
         &&
         this.currentRole !==
           'ROLE_ADMIN'
         &&
         this.currentRole !==
           'ROLE_DIRECTOR';

  }

}