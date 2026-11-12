import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  LicenseAssignmentResponse
} from '../models/license-assignment-response.model';

import {
  LicenseAssignmentCreateRequest
} from '../models/license-assignment-create-request.model';

@Injectable({
  providedIn: 'root'
})
export class LicenseAssignmentService {

  private readonly apiUrl =
    'http://localhost:8080/api/license-assignments';

  constructor(
    private http: HttpClient
  ) {}

  getAllAssignments():
    Observable<LicenseAssignmentResponse[]> {

    return this.http.get<
      LicenseAssignmentResponse[]
    >(this.apiUrl);
  }

  getActiveAssignments():
    Observable<LicenseAssignmentResponse[]> {

    return this.http.get<
      LicenseAssignmentResponse[]
    >(
      `${this.apiUrl}/active`
    );
  }

  createAssignment(
    request:
      LicenseAssignmentCreateRequest
  ): Observable<LicenseAssignmentResponse> {

    return this.http.post<
      LicenseAssignmentResponse
    >(
      this.apiUrl,
      request
    );
  }

  revokeAssignment(
    id: number
  ): Observable<LicenseAssignmentResponse> {

    return this.http.put<
      LicenseAssignmentResponse
    >(
      `${this.apiUrl}/${id}/revoke`,
      {}
    );
  }

}