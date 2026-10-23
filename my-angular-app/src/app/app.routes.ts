import { Routes } from '@angular/router';

import { ProductsComponent }
from './features/business-management/products/components/products.component';

import { DashboardComponent }
from './features/dashboard/dashboard.component';

import { ProfileComponent }
from './features/profile/profile.component';

import { roleGuard }
from './core/guards/role.guard';

import { AUTH_ROUTES }
from './features/auth/auth.routes';

import { ADMINISTRATION_ROUTES }
from './features/administration/administration.routes';

import { BUSINESS_MANAGEMENT_ROUTES }
from './features/business-management/business-management.routes';

import { ASSET_MANAGEMENT_ROUTES }
from './features/asset-management/asset-management.routes';
import { CATALOG_ROUTES } from './features/catalog/catalog.routes';

export const routes: Routes = [


  {
    path: 'dashboard',

    component: DashboardComponent,

    canActivate: [roleGuard],

    data: {
      expectedRoles: [
        'ROLE_CUSTOMER',
        'ROLE_MANAGER',
        'ROLE_ADMIN',
        'ROLE_DIRECTOR'
      ]
    }
  },

  {
    path: 'profile',

    component: ProfileComponent,

    canActivate: [roleGuard],

    data: {
      expectedRoles: [
        'ROLE_CUSTOMER',
        'ROLE_MANAGER',
        'ROLE_ADMIN',
        'ROLE_DIRECTOR'
      ]
    }
  },

  ...AUTH_ROUTES,

  ...ADMINISTRATION_ROUTES,

  ...BUSINESS_MANAGEMENT_ROUTES,

  ...ASSET_MANAGEMENT_ROUTES,

  ...CATALOG_ROUTES,

  {
    path: '**',
    redirectTo: ''
  }

];