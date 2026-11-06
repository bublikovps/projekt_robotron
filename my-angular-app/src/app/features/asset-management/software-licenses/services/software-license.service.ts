import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { SoftwareLicenseResponse }
from '../models/software-license-response.model';

import { SoftwareLicenseCreateRequest }
from '../models/software-license-create-request.model';

import { SoftwareLicenseUpdateRequest }
from '../models/software-license-update-request.model';

@Injectable({
  providedIn: 'root'
})
export class SoftwareLicenseService {

  private readonly http =
    inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8080/api/software-licenses';

  getAllLicenses():
    Observable<
      SoftwareLicenseResponse[]
    > {

    return this.http.get<
      SoftwareLicenseResponse[]
    >(this.apiUrl);
  }

  getLicenseById(
    id: number
  ): Observable<
    SoftwareLicenseResponse
  > {

    return this.http.get<
      SoftwareLicenseResponse
    >(
      `${this.apiUrl}/${id}`
    );
  }

  createLicense(
    request:
      SoftwareLicenseCreateRequest
  ): Observable<
    SoftwareLicenseResponse
  > {

    return this.http.post<
      SoftwareLicenseResponse
    >(
      this.apiUrl,
      request
    );
  }

  updateLicense(
    id: number,
    request:
      SoftwareLicenseUpdateRequest
  ): Observable<
    SoftwareLicenseResponse
  > {

    return this.http.put<
      SoftwareLicenseResponse
    >(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  archiveLicense(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

}