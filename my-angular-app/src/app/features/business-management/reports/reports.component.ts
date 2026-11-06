import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { InventoryValueComponent }
from './inventory-value/inventory-value.component';

import { LowStockComponent }
from './low-stock/low-stock.component';

import { ProductMarginComponent }
from './product-margin/product-margin.component';

import { SupplierInventoryComponent }
from './supplier-inventory/supplier-inventory.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    InventoryValueComponent,
    LowStockComponent,
    ProductMarginComponent,
    SupplierInventoryComponent
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  selectedReport:
    'inventory'
    | 'low-stock'
    | 'margin'
    | 'supplier'
    =
    'inventory';

  selectReport(
    report:
      'inventory'
      | 'low-stock'
      | 'margin'
      | 'supplier'
  ): void {

    this.selectedReport =
      report;
  }

}