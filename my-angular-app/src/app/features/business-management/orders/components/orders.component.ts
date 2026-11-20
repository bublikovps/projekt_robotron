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

interface OrderDashboardResponse {

  totalOrders: number;

  pendingOrders: number;

  paidOrders: number;

  shippedOrders: number;

  cancelledOrders: number;

  totalRevenue: number;

}

interface OrderListResponse {

  id: number;

  orderNumber: string;

  customerName: string;

  companyName: string | null;

  status: string;

  totalPrice: number;

  createdAt: string;

  invoiceNumber?: string | null;

  deliveryNumber?: string | null;

  trackingNumber?: string | null;

}

interface OrderItemDetailsResponse {

  sku: string;

  productName: string;

  quantity: number;

  unitPriceNet: number;

  unitPriceGross: number;

}

interface OrderDetailsResponse {

  id: number;

  orderNumber: string;

  status: string;

  customerName: string;

  companyName: string | null;

  ustIdnr: string | null;

  shippingAddress: string;

  totalPrice: number;

  invoiceNumber: string | null;

  deliveryNumber: string | null;

  trackingNumber: string | null;

  createdAt: string;

  items: OrderItemDetailsResponse[];

}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent
implements OnInit {

  private readonly http =
    inject(HttpClient);

  private readonly cdr =
    inject(ChangeDetectorRef);

  dashboard:
    OrderDashboardResponse | null =
    null;

  orders:
    OrderListResponse[] = [];

  filteredOrders:
    OrderListResponse[] = [];

  selectedOrder:
    OrderDetailsResponse | null =
    null;

  selectedOrderNumber:
    string | null = null;

  searchTerm = '';

  selectedStatus = 'ALL';

  statusMenuOpen = false;

  isLoading = false;

  isLoadingDetails = false;

  readonly statuses = [

    'ALL',

    'PENDING_PAYMENT',

    'PAID',

    'PROCESSING',

    'SHIPPED',

    'DELIVERED',

    'CANCELLED',

    'REFUNDED'

  ];

  ngOnInit(): void {

    this.loadDashboard();

    this.loadOrders();

  }

  refresh(): void {

    this.statusMenuOpen = false;

    this.loadDashboard();

    this.loadOrders();

  }

  loadDashboard(): void {

    this.http
      .get<OrderDashboardResponse>(
        'http://localhost:8080/api/orders/dashboard'
      )
      .subscribe({

        next: data => {

          this.dashboard = data;

          this.cdr.detectChanges();

        },

        error: error => {

          console.error(error);

        }

      });

  }

  loadOrders(): void {

    this.isLoading = true;

    this.http
      .get<OrderListResponse[]>(
        'http://localhost:8080/api/orders'
      )
      .subscribe({

        next: data => {

          this.orders = data;

          this.applyFilters();

          this.isLoading = false;

          this.cdr.detectChanges();

          if (
            data.length > 0 &&
            !this.selectedOrder
          ) {

            this.loadOrderDetails(
              data[0].orderNumber
            );

          }

        },

        error: error => {

          console.error(error);

          this.orders = [];

          this.filteredOrders = [];

          this.isLoading = false;

          this.cdr.detectChanges();

        }

      });

  }

  loadOrderDetails(
    orderNumber: string
  ): void {

    this.selectedOrderNumber =
      orderNumber;

    this.isLoadingDetails = true;

    this.cdr.detectChanges();

    this.http
      .get<OrderDetailsResponse>(
        `http://localhost:8080/api/orders/${orderNumber}`
      )
      .subscribe({

        next: data => {

          this.selectedOrder = {
            ...data
          };

          this.isLoadingDetails =
            false;

          this.cdr.detectChanges();

        },

        error: error => {

          console.error(error);

          this.isLoadingDetails =
            false;

          this.cdr.detectChanges();

        }

      });

  }

  applyFilters(): void {

    let result =
      [...this.orders];

    if (
      this.selectedStatus !== 'ALL'
    ) {

      result =
        result.filter(order =>
          order.status ===
          this.selectedStatus
        );

    }

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();

    if (search.length > 0) {

      result =
        result.filter(order =>

          order.orderNumber
            .toLowerCase()
            .includes(search)

          ||

          order.customerName
            .toLowerCase()
            .includes(search)

          ||

          (
            order.companyName ??
            ''
          )
            .toLowerCase()
            .includes(search)

        );

    }

    this.filteredOrders =
      result;

  }

  exportCsv(): void {

    const csv = [

      [
        'Order Number',
        'Customer',
        'Status',
        'Invoice',
        'Delivery',
        'Total'
      ].join(','),

      ...this.filteredOrders.map(
        order => [

          order.orderNumber,

          order.customerName,

          order.status,

          order.invoiceNumber ?? '',

          order.deliveryNumber ?? '',

          order.totalPrice

        ].join(',')
      )

    ].join('\n');

    const blob =
      new Blob(
        [csv],
        {
          type:
            'text/csv;charset=utf-8'
        }
      );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement('a');

    link.href = url;

    link.download =
      'orders.csv';

    link.click();

    URL.revokeObjectURL(url);

  }

  openInvoice(): void {

    if (
      !this.selectedOrder?.invoiceNumber
    ) {

      return;

    }

    window.open(
      `http://localhost:8080/api/documents/invoices/${this.selectedOrder.invoiceNumber}/pdf`,
      '_blank'
    );

  }

  openDeliveryNote(): void {

    if (
      !this.selectedOrder?.deliveryNumber
    ) {

      return;

    }

    window.open(
      `http://localhost:8080/api/documents/delivery-notes/${this.selectedOrder.deliveryNumber}/pdf`,
      '_blank'
    );

  }

}