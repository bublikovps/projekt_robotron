import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { OrderService } from './order.service';
import { jwtInterceptor } from '../../../../core/interceptors/jwt.interceptor';
import { OrderCreateRequest } from '../models/order-create-request.model';
import { OrderResponse } from '../models/order-response.model';

describe('OrderService', () => {
  let service: OrderService;
  let httpTestingController: HttpTestingController;
  const apiUrl = '/api/orders';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderService,
        provideHttpClient(withInterceptors([jwtInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(OrderService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('sollte createOrder() per POST mit Bestelldaten und aktiviertem jwtInterceptor senden', () => {
    // Arrange
    const orderRequest = {
      items: [
        { productId: 101, quantity: 2 },
        { productId: 205, quantity: 1 },
      ],
      shippingAddress: 'Chemnitzer Straße 10, 09111 Chemnitz',
    } as unknown as OrderCreateRequest;

    const mockOrderResponse = {
      id: 5001,
      status: 'PENDING_PAYMENT',
      totalAmount: 3649.99,
    } as unknown as OrderResponse;

    let actualResponse: OrderResponse | undefined;

    // Act
    service.createOrder(orderRequest).subscribe((res) => (actualResponse = res));

    // Assert
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(orderRequest);
    // Integrationstest: jwtInterceptor setzt withCredentials automatisch auf true
    expect(req.request.withCredentials).toBe(true);

    req.flush(mockOrderResponse);
    expect(actualResponse).toEqual(mockOrderResponse);
  });

  it('sollte 400 Bad Request (z. B. unzureichender Lagerbestand oder Kontostand) weiterleiten', () => {
    // Arrange
    const invalidOrder = { items: [] } as unknown as OrderCreateRequest;
    let errorStatus = 0;
    let errorMessage = '';

    // Act
    service.createOrder(invalidOrder).subscribe({
      next: () => {
        throw new Error('Erwartete einen Validierungsfehler');
      },
      error: (err) => {
        errorStatus = err.status;
        errorMessage = err.error?.message;
      },
    });

    // Assert
    const req = httpTestingController.expectOne(apiUrl);
    req.flush(
      { message: 'Nicht genügend Lagerbestand verfügbar' },
      { status: 400, statusText: 'Bad Request' }
    );

    expect(errorStatus).toBe(400);
    expect(errorMessage).toBe('Nicht genügend Lagerbestand verfügbar');
  });
});
