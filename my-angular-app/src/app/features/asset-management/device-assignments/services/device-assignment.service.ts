import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  DeviceAssignmentResponse
} from '../models/device-assignment-response.model';

import {
  DeviceAssignmentCreateRequest
} from '../models/device-assignment-create-request.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceAssignmentService {

  private readonly apiUrl =
    'http://localhost:8080/api/device-assignments';

  constructor(
    private http: HttpClient
  ) {}

  getAllAssignments():
    Observable<DeviceAssignmentResponse[]> {

    return this.http.get<
      DeviceAssignmentResponse[]
    >(this.apiUrl);
  }

  getActiveAssignments():
    Observable<DeviceAssignmentResponse[]> {

    return this.http.get<
      DeviceAssignmentResponse[]
    >(
      `${this.apiUrl}/active`
    );
  }

  createAssignment(
    request:
      DeviceAssignmentCreateRequest
  ): Observable<DeviceAssignmentResponse> {

    return this.http.post<
      DeviceAssignmentResponse
    >(
      this.apiUrl,
      request
    );
  }

  returnDevice(
    id: number
  ): Observable<DeviceAssignmentResponse> {

    return this.http.put<
      DeviceAssignmentResponse
    >(
      `${this.apiUrl}/${id}/return`,
      {}
    );
  }

}