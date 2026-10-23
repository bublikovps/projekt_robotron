import { Routes } from '@angular/router';

import { AdministrationComponent } from './administration.component';

import { roleGuard } from '../../core/guards/role.guard';
import { passwordChangeGuard } from '../../core/guards/password-change.guard';

export const ADMINISTRATION_ROUTES: Routes = [

  {
    path: 'admin',

    component: AdministrationComponent,

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
  }

];