import { Routes } from '@angular/router';

import { ProductsComponent }
from './components/products.component';

export const PRODUCTS_ROUTES: Routes = [

  {
    path: 'lager-management/products',
    component: ProductsComponent
  }

];