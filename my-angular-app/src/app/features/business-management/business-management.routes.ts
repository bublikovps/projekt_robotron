import { Routes } from '@angular/router';



import { CATEGORIES_ROUTES } from './categories/categories.routes';
import { PRODUCTS_ROUTES } from './products/products.routes';
import { REPORTS_ROUTES } from './reports/reports.routes';

import { roleGuard } from '../../core/guards/role.guard';
import { passwordChangeGuard } from '../../core/guards/password-change.guard';
import { BusinessManagementComponent } from './business-management/business-management.component';

export const BUSINESS_MANAGEMENT_ROUTES: Routes = [

  {
    path: 'business-management',

    component: BusinessManagementComponent,

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

  ...PRODUCTS_ROUTES,

  ...REPORTS_ROUTES

];