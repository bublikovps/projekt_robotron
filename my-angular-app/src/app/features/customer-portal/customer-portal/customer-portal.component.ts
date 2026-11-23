import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  BreadcrumbComponent,
  BreadcrumbItem
} from '../../../shared/components/breadcrumb/breadcrumb.component';

import {
  MyOrdersComponent
} from '../my-orders/my-orders.component';

import {
  MyInvoicesComponent
} from '../my-invoices/my-invoices.component';

import {
  MyDeliveryNotesComponent
} from '../my-delivery-notes/my-delivery-notes.component';

import {
  AuthService
} from '../../../core/services/auth.service';

@Component({
  selector: 'app-customer-portal',

  standalone: true,

  imports: [
    CommonModule,

    BreadcrumbComponent,

    MyOrdersComponent,
    MyInvoicesComponent,
    MyDeliveryNotesComponent
  ],

  templateUrl:
    './customer-portal.component.html',

  styleUrls: [
    './customer-portal.component.css'
  ]
})
export class CustomerPortalComponent
implements OnInit {

  private readonly authService =
    inject(AuthService);

  accountBalance = 0;

  selectedArea:
    | 'documents'
    | 'account'
    =
    'documents';

  selectedModule:
    | 'orders'
    | 'invoices'
    | 'delivery-notes'
    | 'balance'
    =
    'orders';

  ngOnInit(): void {

    this.loadBalance();

  }

  private loadBalance(): void {

    this.authService
      .getProfile()
      .subscribe({

        next: profile => {

          this.accountBalance =
            profile.accountBalance ?? 0;

        },

        error: error => {

          console.error(
            'Balance loading failed:',
            error
          );

        }

      });

  }

  selectArea(
    area:
      | 'documents'
      | 'account'
  ): void {

    this.selectedArea = area;

    switch (area) {

      case 'documents':

        this.selectedModule =
          'orders';

        break;

      case 'account':

        this.selectedModule =
          'balance';

        break;

    }

  }

  selectModule(
    module:
      | 'orders'
      | 'invoices'
      | 'delivery-notes'
      | 'balance'
  ): void {

    this.selectedModule =
      module;

  }

  get breadcrumbItems():
    BreadcrumbItem[] {

    return [

      {
        label:
          'Arbeitsbereich',

        route:
          '/dashboard'
      },

      {
        label:
          'Kundenbereich'
      }

    ];

  }

}