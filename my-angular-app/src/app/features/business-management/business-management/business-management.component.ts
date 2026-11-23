import { Component } from '@angular/core';

import { CommonModule }
from '@angular/common';

import { CategoriesComponent }
from '../categories/components/categories.component';

import { ProductsComponent }
from '../products/components/products.component';

import { OrdersComponent }
from '../orders/components/orders.component';

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
    OrdersComponent,

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
    | 'sales'
    | 'analytics'
    =
    'master-data';

  selectedModule:
    | 'categories'
    | 'products'
    | 'orders'
    | 'inventory-value'
    | 'low-stock'
    | 'product-margin'
    | 'supplier-inventory'
    =
    'categories';

  selectArea(
    area:
      | 'master-data'
      | 'sales'
      | 'analytics'
  ): void {

    this.selectedArea = area;

    switch (area) {

      case 'master-data':

        this.selectedModule =
          'categories';

        break;

      case 'sales':

        this.selectedModule =
          'orders';

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
      | 'orders'
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

    switch (
      this.selectedArea
    ) {

      case 'master-data':

        items.push({
          label:
            'Master Data'
        });

        break;

      case 'sales':

        items.push({
          label:
            'Sales'
        });

        break;

      case 'analytics':

        items.push({
          label:
            'Analytics'
        });

        break;

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

      case 'orders':

        items.push({
          label:
            'Orders'
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