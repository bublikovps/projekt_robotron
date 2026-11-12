import { Component } from '@angular/core';

import { CommonModule }
from '@angular/common';

import { CategoriesComponent }
from '../categories/components/categories.component';

import { ProductsComponent }
from '../products/components/products.component';

import { InventoryValueComponent }
from '../reports/inventory-value/inventory-value.component';

import { LowStockComponent }
from '../reports/low-stock/low-stock.component';

import { ProductMarginComponent }
from '../reports/product-margin/product-margin.component';

import { SupplierInventoryComponent }
from '../reports/supplier-inventory/supplier-inventory.component';

import {
  BreadcrumbComponent,
  BreadcrumbItem
} from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-business-management',
  standalone: true,
  imports: [
    CommonModule,

    BreadcrumbComponent,

    CategoriesComponent,
    ProductsComponent,

    InventoryValueComponent,
    LowStockComponent,
    ProductMarginComponent,
    SupplierInventoryComponent
  ],
  templateUrl:
    './business-management.component.html',

  styleUrls: [
    './business-management.component.css'
  ]
})
export class BusinessManagementComponent {

  selectedArea:
    | 'master-data'
    | 'analytics'
    =
    'master-data';

  selectedModule:
    | 'categories'
    | 'products'
    | 'inventory-value'
    | 'low-stock'
    | 'product-margin'
    | 'supplier-inventory'
    =
    'categories';

  selectArea(
    area:
      | 'master-data'
      | 'analytics'
  ): void {

    this.selectedArea = area;

    switch (area) {

      case 'master-data':

        this.selectedModule =
          'categories';

        break;

      case 'analytics':

        this.selectedModule =
          'inventory-value';

        break;
    }
  }

  selectModule(
    module:
      | 'categories'
      | 'products'
      | 'inventory-value'
      | 'low-stock'
      | 'product-margin'
      | 'supplier-inventory'
  ): void {

    this.selectedModule = module;
  }

  get breadcrumbItems():
    BreadcrumbItem[] {

    const items:
      BreadcrumbItem[] = [

      {
        label:
          'Arbeitsbereich',

        route:
          '/dashboard'
      },

      {
        label:
          'Business Management',

        route:
          '/business-management'
      }

    ];

    if (
      this.selectedArea ===
      'master-data'
    ) {

      items.push({

        label:
          'Master Data'

      });

    } else {

      items.push({

        label:
          'Analytics'

      });
    }

    switch (
      this.selectedModule
    ) {

      case 'categories':

        items.push({
          label:
            'Categories'
        });

        break;

      case 'products':

        items.push({
          label:
            'Products'
        });

        break;

      case 'inventory-value':

        items.push({
          label:
            'Inventory Value'
        });

        break;

      case 'low-stock':

        items.push({
          label:
            'Low Stock'
        });

        break;

      case 'product-margin':

        items.push({
          label:
            'Product Margin'
        });

        break;

      case 'supplier-inventory':

        items.push({
          label:
            'Supplier Inventory'
        });

        break;
    }

    return items;
  }
}