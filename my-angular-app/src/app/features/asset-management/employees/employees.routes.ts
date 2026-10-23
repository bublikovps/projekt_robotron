import { Routes } from '@angular/router';

import { EmployeesComponent }
from './components/employees.component';

export const EMPLOYEES_ROUTES: Routes = [

  {
    path: 'asset-management/employees',
    component: EmployeesComponent
  }

];
