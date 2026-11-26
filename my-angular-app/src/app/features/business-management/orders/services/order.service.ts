import {
  Injectable,
  inject
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  OrderCreateRequest
} from '../models/order-create-request.model';

import {
  OrderResponse
} from '../models/order-response.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly http =
    inject(HttpClient);

  private readonly apiUrl =
    '/api/orders';

  createOrder(
    request: OrderCreateRequest
  ): Observable<OrderResponse> {

    return this.http.post<OrderResponse>(
      this.apiUrl,
      request
    );

  }

}