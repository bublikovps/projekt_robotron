import { Routes } from '@angular/router';

import { OrdersComponent }
from './components/orders.component';

import { roleGuard }
from '../../../core/guards/role.guard';

import { passwordChangeGuard }
from '../../../core/guards/password-change.guard';

export const ORDERS_ROUTES: Routes = [

  {
    path: 'business-management/orders',

    component: OrdersComponent,

    canActivate: [
      passwordChangeGuard,
      roleGuard
    ],

    data: {
      expectedRoles: [
        'ROLE_MANAGER',
        'ROLE_DIRECTOR'
      ]
    }
  }

];