import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiMessageResponse }
from '../../../../core/models/api-message-response.model';

import { ProductResponse }
from '../models/product-response.model';

import { ProductCreateRequest }
from '../models/product-create-request.model';

import { ProductUpdateRequest }
from '../models/product-update-request.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly apiUrl =
    'http://localhost:8080/api/products';

  constructor(
    private http: HttpClient
  ) {}

  getAllProducts(
    search: string = '',
    categoryId: number | null = null
  ): Observable<ProductResponse[]> {

    let params = new HttpParams();

    if (search) {

      params =
        params.set(
          'search',
          search
        );

    }

    if (categoryId !== null) {

      params =
        params.set(
          'categoryId',
          categoryId
        );

    }

    return this.http.get<
      ProductResponse[]
    >(
      this.apiUrl,
      { params }
    );
  }

  getProductById(
    id: number
  ): Observable<ProductResponse> {

    return this.http.get<
      ProductResponse
    >(
      `${this.apiUrl}/${id}`
    );
  }

  createProduct(
    request: ProductCreateRequest
  ): Observable<ProductResponse> {

    return this.http.post<
      ProductResponse
    >(
      this.apiUrl,
      request
    );
  }

  updateProduct(
    id: number,
    request: ProductUpdateRequest
  ): Observable<ProductResponse> {

    return this.http.put<
      ProductResponse
    >(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  archiveProduct(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.delete<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}`
    );
  }

  restoreProduct(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.put<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}/restore`,
      {}
    );
  }

  permanentlyDeleteProduct(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.delete<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}/permanent`
    );
  }

}