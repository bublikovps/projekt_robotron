import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { DepartmentResponse }
from '../models/department-response.model';

import { DepartmentCreateRequest }
from '../models/department-create-request.model';

import { DepartmentUpdateRequest }
from '../models/department-update-request.model';

import { ApiMessageResponse }
from '../../../../core/models/api-message-response.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private readonly apiUrl =
    'http://localhost:8080/api/departments';

  constructor(
    private http: HttpClient
  ) {}

  getAllDepartments():
    Observable<DepartmentResponse[]> {

    return this.http.get<
      DepartmentResponse[]
    >(this.apiUrl);
  }

  getDepartmentById(
    id: number
  ): Observable<DepartmentResponse> {

    return this.http.get<
      DepartmentResponse
    >(`${this.apiUrl}/${id}`);
  }

  createDepartment(
    request: DepartmentCreateRequest
  ): Observable<DepartmentResponse> {

    return this.http.post<
      DepartmentResponse
    >(
      this.apiUrl,
      request
    );
  }

  updateDepartment(
    id: number,
    request: DepartmentUpdateRequest
  ): Observable<DepartmentResponse> {

    return this.http.put<
      DepartmentResponse
    >(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  archiveDepartment(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.delete<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}`
    );
  }

  restoreDepartment(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.put<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}/restore`,
      {}
    );
  }

  permanentlyDeleteDepartment(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.delete<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}/permanent`
    );
  }

}