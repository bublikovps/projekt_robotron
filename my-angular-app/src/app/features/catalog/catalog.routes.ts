import { Routes } from '@angular/router';

import { CatalogComponent }
from './components/catalog.component';

import { ProductDetailsComponent }
from './product-details/product-details.component';

export const CATALOG_ROUTES: Routes = [

  {
    path: '',
    component: CatalogComponent
  },

  {
    path: 'category/:id',
    component: CatalogComponent
  },

  {
    path: 'products/:id',
    component: ProductDetailsComponent
  }

];
