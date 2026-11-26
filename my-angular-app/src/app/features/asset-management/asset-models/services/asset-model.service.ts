import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  ApiMessageResponse
} from '../../../../core/models/api-message-response.model';

import {
  AssetModelResponse
} from '../models/asset-model-response.model';

import {
  AssetModelCreateRequest
} from '../models/asset-model-create-request.model';

import {
  AssetModelUpdateRequest
} from '../models/asset-model-update-request.model';

@Injectable({
  providedIn: 'root'
})
export class AssetModelService {

  private readonly apiUrl =
    '/api/asset-models';

  constructor(
    private http: HttpClient
  ) {}

  getAll():
    Observable<AssetModelResponse[]> {

    return this.http.get<
      AssetModelResponse[]
    >(this.apiUrl);

  }

  getActive():
    Observable<AssetModelResponse[]> {

    return this.http.get<
      AssetModelResponse[]
    >(
      `${this.apiUrl}/active`
    );

  }

  getArchived():
    Observable<AssetModelResponse[]> {

    return this.http.get<
      AssetModelResponse[]
    >(
      `${this.apiUrl}/archived`
    );

  }

  create(
    request:
      AssetModelCreateRequest
  ): Observable<AssetModelResponse> {

    return this.http.post<
      AssetModelResponse
    >(
      this.apiUrl,
      request
    );

  }

  update(
    id: number,
    request:
      AssetModelUpdateRequest
  ): Observable<AssetModelResponse> {

    return this.http.put<
      AssetModelResponse
    >(
      `${this.apiUrl}/${id}`,
      request
    );

  }

  archive(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.delete<ApiMessageResponse>(
      `${this.apiUrl}/${id}`
    );

  }

  restore(
    id: number
  ): Observable<ApiMessageResponse> {

    return this.http.put<ApiMessageResponse>(
      `${this.apiUrl}/${id}/restore`,
      {}
    );

  }

  importAssetModels(
    file: File
  ): Observable<ApiMessageResponse> {

    const formData =
      new FormData();

    formData.append(
      'file',
      file
    );

    return this.http.post<ApiMessageResponse>(
      `${this.apiUrl}/import`,
      formData
    );

  }

}