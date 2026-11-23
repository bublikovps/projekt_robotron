import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';

@Component({
  selector: 'app-order-confirmation',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl:
    './order-confirmation.component.html',

  styleUrls: [
    './order-confirmation.component.css'
  ]
})
export class OrderConfirmationComponent
implements OnInit {

  orderId = 0;

  orderNumber = '';

  status = '';

  totalPrice = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {

        this.orderId =
          Number(
            params['orderId']
          ) || 0;

        this.orderNumber =
          params['orderNumber'] || '';

        this.status =
          params['status'] || '';

        this.totalPrice =
          Number(
            params['totalPrice']
          ) || 0;

      });

  }

  goToOrders(): void {

    this.router.navigate([
      '/my-orders'
    ]);

  }

  goToPayment(): void {

    this.router.navigate(
      ['/payment'],
      {
        queryParams: {

          orderId:
            this.orderId,

          orderNumber:
            this.orderNumber,

          totalPrice:
            this.totalPrice

        }
      }
    );

  }

}