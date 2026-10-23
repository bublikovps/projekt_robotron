import { Routes } from '@angular/router';

import { DepartmentsComponent }
from './components/departments.component';

export const DEPARTMENTS_ROUTES: Routes = [

  {
    path: 'asset-management/departments',
    component: DepartmentsComponent
  }

];