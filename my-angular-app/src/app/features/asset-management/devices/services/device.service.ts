import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiMessageResponse }
from '../../../../core/models/api-message-response.model';

import { DeviceResponse }
from '../models/device-response.model';

import { DeviceCreateRequest }
from '../models/device-create-request.model';

import { DeviceUpdateRequest }
from '../models/device-update-request.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private readonly apiUrl =
    'http://localhost:8080/api/devices';

  constructor(
    private http: HttpClient
  ) {}

  getAllDevices():
    Observable<DeviceResponse[]> {

    return this.http.get<
      DeviceResponse[]
    >(this.apiUrl);
  }

  createDevice(
    request: DeviceCreateRequest
  ): Observable<DeviceResponse> {

    return this.http.post<
      DeviceResponse
    >(
      this.apiUrl,
      request
    );
  }

  updateDevice(
    id: number,
    request: DeviceUpdateRequest
  ): Observable<DeviceResponse> {

    return this.http.put<
      DeviceResponse
    >(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  archiveDevice(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.delete<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}`
    );
  }

  restoreDevice(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.put<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}/restore`,
      {}
    );
  }

  permanentlyDeleteDevice(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.delete<
      ApiMessageResponse
    >(
      `${this.apiUrl}/${id}/permanent`
    );
  }

}