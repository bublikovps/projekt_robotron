import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { InventoryValueResponse }
from '../models/inventory-value-response.model';

import { LowStockResponse }
from '../models/low-stock-response.model';

import { ProductMarginResponse }
from '../models/product-margin-response.model';

import { SupplierInventoryResponse }
from '../models/supplier-inventory-response.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessReportService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8080/api/reports';

  getInventoryValueReport():
    Observable<InventoryValueResponse[]> {

    return this.http.get<InventoryValueResponse[]>(
      `${this.apiUrl}/inventory-value`
    );
  }

  getLowStockReport(
    threshold: number
  ): Observable<LowStockResponse[]> {

    return this.http.get<LowStockResponse[]>(
      `${this.apiUrl}/low-stock?threshold=${threshold}`
    );
  }

  getProductMarginReport():
    Observable<ProductMarginResponse[]> {

    return this.http.get<ProductMarginResponse[]>(
      `${this.apiUrl}/product-margin`
    );
  }

  getSupplierInventoryReport():
    Observable<SupplierInventoryResponse[]> {

    return this.http.get<SupplierInventoryResponse[]>(
      `${this.apiUrl}/supplier-inventory`
    );
  }
}
