import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiMessageResponse }
from '../../../../core/models/api-message-response.model';

import { EmploymentContractResponse }
from '../models/employment-contract-response.model';

import { EmploymentContractCreateRequest }
from '../models/employment-contract-create-request.model';

import { EmploymentContractUpdateRequest }
from '../models/employment-contract-update-request.model';

@Injectable({
  providedIn: 'root'
})
export class EmploymentContractService {

  private readonly apiUrl =
    'http://localhost:8080/api/contracts';

  constructor(
    private http: HttpClient
  ) {}

  getAllContracts():
    Observable<EmploymentContractResponse[]> {

    return this.http.get<
      EmploymentContractResponse[]
    >(this.apiUrl);
  }

  createContract(
    request: EmploymentContractCreateRequest
  ): Observable<EmploymentContractResponse> {

    return this.http.post<
      EmploymentContractResponse
    >(
      this.apiUrl,
      request
    );
  }

  updateContract(
    id: number,
    request: EmploymentContractUpdateRequest
  ): Observable<EmploymentContractResponse> {

    return this.http.put<
      EmploymentContractResponse
    >(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  archiveContract(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.delete<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}`
    );
  }

  restoreContract(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.put<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}/restore`,
      {}
    );
  }

  permanentlyDeleteContract(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.delete<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}/permanent`
    );
  }

}
