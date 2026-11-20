import {
  Component,
  OnInit,
  computed,
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
  Router
} from '@angular/router';

import {
  CartService
} from '../../../core/services/cart.service';

import {
  AuthService
} from '../../../core/services/auth.service';

import {
  OrderService
} from '../../business-management/orders/services/order.service';

import {
  OrderCreateRequest
} from '../../business-management/orders/models/order-create-request.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent
implements OnInit {

  private readonly cartService =
    inject(CartService);

  private readonly authService =
    inject(AuthService);

  private readonly orderService =
    inject(OrderService);

  private readonly router =
    inject(Router);

  private readonly cdr =
    inject(ChangeDetectorRef);

  readonly items =
    this.cartService.items;

  readonly grossTotal =
    this.cartService.totalPrice;

  readonly netTotal =
    computed(() =>
      this.grossTotal() / 1.19
    );

  readonly vatTotal =
    computed(() =>
      this.grossTotal() -
      this.netTotal()
    );

  isSubmitting = false;

  isLoadingProfile = true;

  successMessage = '';

  errorMessage = '';

  customerType:
    'PRIVATE'
    | 'BUSINESS' =
    'PRIVATE';

  vorname = '';

  nachname = '';

  companyName = '';

  ustIdnr = '';

  shippingAddress = '';

  ngOnInit(): void {

    this.authService
      .getCurrentUser()
      .subscribe({

        next: () => {

          this.loadCustomerProfile();

        },

        error: () => {

          sessionStorage.setItem(
            'returnUrl',
            '/checkout'
          );

          this.router.navigate([
            '/register'
          ]);

        }

      });

  }

  private loadCustomerProfile(): void {

    this.authService
      .getProfile()
      .subscribe({

        next: profile => {

          if (
            profile.customerType
          ) {

            this.customerType =
              profile.customerType as
                | 'PRIVATE'
                | 'BUSINESS';

          }

          this.vorname =
            profile.vorname ?? '';

          this.nachname =
            profile.nachname ?? '';

          this.companyName =
            profile.companyName ?? '';

          this.ustIdnr =
            profile.ustIdnr ?? '';

          this.shippingAddress =
            profile.defaultShippingAddress ?? '';

          this.isLoadingProfile =
            false;

          this.cdr.detectChanges();

        },

        error: error => {

          console.error(
            'Profile loading failed',
            error
          );

          this.isLoadingProfile =
            false;

          this.cdr.detectChanges();

        }

      });

  }

  submitOrder(): void {

    this.errorMessage = '';

    this.successMessage = '';

    if (
      this.items().length === 0
    ) {

      this.errorMessage =
        'Der Warenkorb ist leer.';

      return;

    }

    if (
      !this.vorname.trim()
      || !this.nachname.trim()
      || !this.shippingAddress.trim()
    ) {

      this.errorMessage =
        'Bitte füllen Sie alle Pflichtfelder aus.';

      return;

    }

    if (
      this.customerType === 'BUSINESS'
      &&
      !this.companyName.trim()
    ) {

      this.errorMessage =
        'Firmenname ist erforderlich.';

      return;

    }

    const request:
      OrderCreateRequest = {

      customerType:
        this.customerType,

      vorname:
        this.vorname.trim(),

      nachname:
        this.nachname.trim(),

      companyName:
        this.companyName.trim(),

      ustIdnr:
        this.ustIdnr.trim(),

      shippingAddress:
        this.shippingAddress.trim(),

      idempotencyKey:
        crypto.randomUUID(),

      items:
        this.items().map(
          item => ({

            productId:
              item.productId,

            quantity:
              item.quantity

          })
        )

    };

    this.isSubmitting =
      true;

    this.orderService
      .createOrder(request)
      .subscribe({

        next: response => {

          this.cartService
            .clearCart();

          this.successMessage =
            `Bestellung ${response.orderNumber} erfolgreich angelegt.`;

          this.isSubmitting =
            false;

          setTimeout(() => {

            this.router.navigate(
              ['/order-confirmation'],
              {
                queryParams: {

                  orderId:
                    response.id,

                  orderNumber:
                    response.orderNumber,

                  status:
                    response.status,

                  totalPrice:
                    response.totalPrice

                }
              }
            );

          }, 1500);

        },

        error: error => {

          console.error(
            'Create order failed:',
            error
          );

          this.errorMessage =
            error?.error?.message
            ||
            'Bestellung konnte nicht angelegt werden.';

          this.isSubmitting =
            false;

        }

      });

  }

}