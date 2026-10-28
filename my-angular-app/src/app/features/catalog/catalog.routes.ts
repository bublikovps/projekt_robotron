import { Routes } from '@angular/router';

import { CatalogComponent }
from './components/catalog.component';

import { ProductDetailsComponent }
from './product-details/product-details.component';

export const CATALOG_ROUTES: Routes = [

  {
    path: 'catalog',
    component: CatalogComponent
  },

  {
    path: 'catalog/category/:id',
    component: CatalogComponent
  },

  {
    path: 'catalog/products/:id',
    component: ProductDetailsComponent
  }

];