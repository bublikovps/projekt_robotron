import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpHeaders,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { jwtInterceptor } from './jwt.interceptor';

describe('jwtInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([jwtInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
     
    httpTestingController.verify();
  });

  it('sollte withCredentials: true für ausgehende HTTP-Anfragen aktivieren', () => {
    // Arrange
    const testUrl = '/api/orders';

    // Act
    httpClient.get(testUrl).subscribe();

    // Assert
    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBe(true);
    req.flush({});
  });

  it('sollte bestehende Header, Query-Parameter und Body beim Klonen erhalten', () => {
    // Arrange
    const testUrl = '/api/products?page=1&size=20';
    const customHeaders = new HttpHeaders({
      'X-Correlation-ID': 'trace-12345',
      Accept: 'application/json',
    });
    const payload = { name: 'Server Rack 42U' };

    // Act
    httpClient.post(testUrl, payload, { headers: customHeaders }).subscribe();

    // Assert
    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.withCredentials).toBe(true);
    expect(req.request.headers.get('X-Correlation-ID')).toBe('trace-12345');
    expect(req.request.headers.get('Accept')).toBe('application/json');
    expect(req.request.body).toEqual(payload);
    req.flush({ id: 1 });
  });

  it('sollte idempotent arbeiten, wenn withCredentials bereits true ist', () => {
    // Arrange
    const testUrl = '/api/auth/me';

    // Act
    httpClient.get(testUrl, { withCredentials: true }).subscribe();

    // Assert
    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.withCredentials).toBe(true);
    req.flush({});
  });
});
