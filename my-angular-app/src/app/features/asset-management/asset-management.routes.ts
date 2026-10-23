import { Routes } from '@angular/router';

import { AssetManagementComponent }
from './asset-management/asset-management.component';

import { DEPARTMENTS_ROUTES }
from './departments/departments.routes';

import { EMPLOYEES_ROUTES }
from './employees/employees.routes';

import { CONTRACTS_ROUTES }
from './contracts/contracts.routes';

import { DEVICES_ROUTES }
from './devices/devices.routes';

import { roleGuard }
from '../../core/guards/role.guard';

import { passwordChangeGuard }
from '../../core/guards/password-change.guard';

export const ASSET_MANAGEMENT_ROUTES: Routes = [

  {
    path: 'asset-management',

    component: AssetManagementComponent,

    canActivate: [
      passwordChangeGuard,
      roleGuard
    ],

    data: {
      expectedRoles: [
        'ROLE_ADMIN',
        'ROLE_DIRECTOR'
      ]
    }
  },

  ...DEPARTMENTS_ROUTES,

  ...EMPLOYEES_ROUTES,

  ...CONTRACTS_ROUTES,

  ...DEVICES_ROUTES

];
