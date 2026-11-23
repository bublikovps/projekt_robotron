import { Routes } from '@angular/router';

import {
  CustomerPortalComponent
} from './customer-portal/customer-portal.component';

import {
  OrderConfirmationComponent
} from './order-confirmation/order-confirmation.component';

import {
  PaymentComponent
} from './payment/payment.component';

import {
  roleGuard
} from '../../core/guards/role.guard';

import {
  passwordChangeGuard
} from '../../core/guards/password-change.guard';

export const CUSTOMER_PORTAL_ROUTES: Routes = [

  {
    path: 'customer-portal',

    component:
      CustomerPortalComponent,

    canActivate: [
      passwordChangeGuard,
      roleGuard
    ],

    data: {

      expectedRoles: [
        'ROLE_CUSTOMER'
      ]

    }

  },

  {
    path: 'order-confirmation',

    component:
      OrderConfirmationComponent,

    canActivate: [
      passwordChangeGuard,
      roleGuard
    ],

    data: {

      expectedRoles: [
        'ROLE_CUSTOMER'
      ]

    }

  },

  {
    path: 'payment',

    component:
      PaymentComponent,

    canActivate: [
      passwordChangeGuard,
      roleGuard
    ],

    data: {

      expectedRoles: [
        'ROLE_CUSTOMER'
      ]

    }

  }

];