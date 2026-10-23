import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiMessageResponse } from '../../../../core/models/api-message-response.model';

import { EmployeeResponse }
from '../models/employee-response.model';

import { EmployeeCreateRequest }
from '../models/employee-create-request.model';

import { EmployeeUpdateRequest }
from '../models/employee-update-request.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly apiUrl =
    'http://localhost:8080/api/employees';

  constructor(
    private http: HttpClient
  ) {}

  getAllEmployees():
    Observable<EmployeeResponse[]> {

    return this.http.get<
      EmployeeResponse[]
    >(this.apiUrl);
  }

  createEmployee(
    request: EmployeeCreateRequest
  ): Observable<EmployeeResponse> {

    return this.http.post<
      EmployeeResponse
    >(
      this.apiUrl,
      request
    );
  }

  updateEmployee(
    id: number,
    request: EmployeeUpdateRequest
  ): Observable<EmployeeResponse> {

    return this.http.put<
      EmployeeResponse
    >(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  archiveEmployee(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.delete<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}`
    );
  }

  restoreEmployee(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.put<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}/restore`,
      {}
    );
  }

  permanentlyDeleteEmployee(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.delete<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}/permanent`
    );
  }

}