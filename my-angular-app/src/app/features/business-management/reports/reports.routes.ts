import { Routes } from '@angular/router';

import { InventoryValueComponent }
from './inventory-value/inventory-value.component';

import { LowStockComponent }
from './low-stock/low-stock.component';

import { ProductMarginComponent }
from './product-margin/product-margin.component';

import { SupplierInventoryComponent }
from './supplier-inventory/supplier-inventory.component';

export const REPORTS_ROUTES: Routes = [

  {
    path: 'business-management/analytics/inventory-value',
    component: InventoryValueComponent
  },

  {
    path: 'business-management/analytics/low-stock',
    component: LowStockComponent
  },

  {
    path: 'business-management/analytics/product-margin',
    component: ProductMarginComponent
  },

  {
    path: 'business-management/analytics/supplier-inventory',
    component: SupplierInventoryComponent
  }

];