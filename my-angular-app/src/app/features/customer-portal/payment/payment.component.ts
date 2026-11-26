import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  HttpClient
} from '@angular/common/http';

import {
  AuthService
} from '../../../core/services/auth.service';

import {
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-payment',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './payment.component.html',

  styleUrls: [
    './payment.component.css'
  ]
})
export class PaymentComponent
implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly http =
    inject(HttpClient);

  private readonly authService =
    inject(AuthService);

  private readonly cdr =
  inject(ChangeDetectorRef);

  orderId = 0;

  orderNumber = '';

  totalPrice = 0;

  accountBalance = 0;

  isSubmitting = false;

  successMessage = '';

  errorMessage = '';

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {

        this.orderId =
          Number(
            params['orderId']
          ) || 0;

        this.orderNumber =
          params['orderNumber'] || '';

        this.totalPrice =
          Number(
            params['totalPrice']
          ) || 0;

      });

    this.loadProfile();

  }

  private loadProfile(): void {

    this.authService
      .getProfile()
      .subscribe({

        next: profile => {


          this.accountBalance =
            Number(
              profile.accountBalance
            ) || 0;

          this.cdr.detectChanges();



        }

      });

  }

  pay(): void {

    this.errorMessage = '';

    this.successMessage = '';

    this.isSubmitting = true;

    this.http
      .post<any>(
        'http://localhost:8080/api/orders/payment',
        {

          orderId:
            this.orderId,

          paymentMethod:
            'BANK_TRANSFER',

          idempotencyKey:
            crypto.randomUUID()

        },
        {
          withCredentials: true
        }
      )
      .subscribe({

        next: () => {

          this.successMessage =
            'Zahlung erfolgreich durchgeführt.';

          this.isSubmitting =
            false;

          setTimeout(() => {

            this.router.navigate([
              '/customer-portal'
            ]);

          }, 1500);

        },

        error: error => {

          this.errorMessage =
            error?.error?.message
            || 'Zahlung fehlgeschlagen.';

          this.isSubmitting =
            false;

        }

      });

  }

}