import { Routes } from '@angular/router';

import { WarehouseComponent } from './warehouse/warehouse.component';

import { CATEGORIES_ROUTES } from './categories/categories.routes';
import { PRODUCTS_ROUTES } from './products/products.routes';

import { roleGuard } from '../../core/guards/role.guard';
import { passwordChangeGuard } from '../../core/guards/password-change.guard';

export const BUSINESS_MANAGEMENT_ROUTES: Routes = [

  {
    path: 'lager-management',

    component: WarehouseComponent,

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
  },

  ...CATEGORIES_ROUTES,

...PRODUCTS_ROUTES

];