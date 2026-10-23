import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiMessageResponse }
from '../../../../core/models/api-message-response.model';

import { CategoryResponse }
from '../models/category-response.model';

import { CategoryCreateRequest }
from '../models/category-create-request.model';

import { CategoryUpdateRequest }
from '../models/category-update-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiUrl =
    'http://localhost:8080/api/categories';

  constructor(
    private http: HttpClient
  ) {}

  getAllCategories():
    Observable<CategoryResponse[]> {

    return this.http.get<
      CategoryResponse[]
    >(this.apiUrl);
  }

  createCategory(
    request: CategoryCreateRequest
  ): Observable<CategoryResponse> {

    return this.http.post<
      CategoryResponse
    >(
      this.apiUrl,
      request
    );
  }

  updateCategory(
    id: number,
    request: CategoryUpdateRequest
  ): Observable<CategoryResponse> {

    return this.http.put<
      CategoryResponse
    >(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  archiveCategory(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.delete<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}`
    );
  }

  restoreCategory(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.put<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}/restore`,
      {}
    );
  }

  permanentlyDeleteCategory(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.delete<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}/permanent`
    );
  }

}