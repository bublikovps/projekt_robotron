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
  HttpClient
} from '@angular/common/http';

interface OrderListItem {

  id: number;

  orderNumber: string;

  customerName: string;

  companyName: string | null;

  status: string;

  totalPrice: number;

  createdAt: string;

  invoiceNumber?: string | null;

  deliveryNumber?: string | null;

}

interface OrderItem {

  sku: string;

  productName: string;

  quantity: number;

  unitPriceNet: number;

  unitPriceGross: number;

}

interface OrderDetails {

  id: number;

  orderNumber: string;

  status: string;

  customerName: string;

  companyName: string;

  ustIdnr: string;

  shippingAddress: string;

  totalPrice: number;

  invoiceNumber: string;

  deliveryNumber: string;

  trackingNumber: string;

  createdAt: string;

  items: OrderItem[];

}

@Component({
  selector: 'app-my-orders',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl:
    './my-orders.component.html',

  styleUrls: [
    './my-orders.component.css'
  ]
})
export class MyOrdersComponent
implements OnInit {

  private readonly http =
    inject(HttpClient);

  private readonly cdr =
    inject(ChangeDetectorRef);

  orders: OrderListItem[] = [];

  filteredOrders:
    OrderListItem[] = [];

  selectedOrder:
    OrderDetails | null = null;

  expandedOrderNumber = '';

  searchTerm = '';

  isLoading = true;

  ngOnInit(): void {

    this.loadOrders();

  }

  loadOrders(): void {

    this.http
      .get<OrderListItem[]>(
        'http://localhost:8080/api/orders/my',
        {
          withCredentials: true
        }
      )
      .subscribe({

        next: orders => {

          this.orders =
            orders;

          this.filteredOrders =
            orders;

          this.isLoading =
            false;

          this.cdr.detectChanges();

        },

        error: error => {

          console.error(error);

          this.orders = [];

          this.filteredOrders = [];

          this.isLoading =
            false;

          this.cdr.detectChanges();

        }

      });

  }

  applySearch(): void {

    const term =
      this.searchTerm
        .toLowerCase()
        .trim();

    this.filteredOrders =
      this.orders.filter(order =>

        order.orderNumber
          .toLowerCase()
          .includes(term)

      );

  }

  toggleDetails(
    orderNumber: string
  ): void {

    if (
      this.expandedOrderNumber ===
      orderNumber
    ) {

      this.expandedOrderNumber = '';

      this.selectedOrder = null;

      this.cdr.detectChanges();

      return;

    }

    this.http
      .get<OrderDetails>(
        `http://localhost:8080/api/orders/${orderNumber}`,
        {
          withCredentials: true
        }
      )
      .subscribe({

        next: details => {

          this.selectedOrder =
            details;

          this.expandedOrderNumber =
            orderNumber;

          this.cdr.detectChanges();

        },

        error: error => {

          console.error(error);

        }

      });

  }

}