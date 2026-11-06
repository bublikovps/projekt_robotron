import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AssetValueResponse }
from '../models/asset-value-response.model';

import { DepartmentAssetValueResponse }
from '../models/department-asset-value-response.model';

import { ActiveDeviceResponse }
from '../models/active-device-response.model';

import { ExpiringLicenseResponse }
from '../models/expiring-license-response.model';

@Injectable({
  providedIn: 'root'
})
export class AssetReportService {

  private readonly http =
    inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8080/api/reports';

  getAssetValueReport():
    Observable<AssetValueResponse[]> {

    return this.http.get<
      AssetValueResponse[]
    >(
      `${this.apiUrl}/asset-value`
    );
  }

  getDepartmentAssetValueReport():
    Observable<
      DepartmentAssetValueResponse[]
    > {

    return this.http.get<
      DepartmentAssetValueResponse[]
    >(
      `${this.apiUrl}/department-assets`
    );
  }

  getActiveDevicesReport():
    Observable<
      ActiveDeviceResponse[]
    > {

    return this.http.get<
      ActiveDeviceResponse[]
    >(
      `${this.apiUrl}/active-devices`
    );
  }

  getExpiringLicensesReport():
    Observable<
      ExpiringLicenseResponse[]
    > {

    return this.http.get<
      ExpiringLicenseResponse[]
    >(
      `${this.apiUrl}/expiring-licenses`
    );
  }

}