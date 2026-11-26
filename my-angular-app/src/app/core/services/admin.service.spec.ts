import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AdminService, AdminUserData } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let httpTestingController: HttpTestingController;
  const baseUrl = '/api/admin/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AdminService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('sollte getAllUsers() per GET mit withCredentials abrufen', () => {
    // Arrange
    const mockUsers: AdminUserData[] = [
      {
        id: 1,
        login: 'admin',
        email: 'admin@robotron.de',
        role: 'ROLE_ADMIN',
        active: true,
        createdAt: '2026-01-10T10:00:00Z',
        canDelete: false,
        anonymized: false,
      },
      {
        id: 2,
        login: 'deleted_user_2',
        email: 'anon@robotron.de',
        role: 'ROLE_CUSTOMER',
        active: false,
        createdAt: '2026-02-15T12:30:00Z',
        canDelete: false,
        anonymized: true,
      },
    ];
    let actualUsers: AdminUserData[] = [];

    // Act
    service.getAllUsers().subscribe((users) => (actualUsers = users));

    // Assert
    const req = httpTestingController.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBe(true);
    req.flush(mockUsers);

    expect(actualUsers).toEqual(mockUsers);
    expect(actualUsers).toHaveLength(2);
  });

  it('sollte createEmployee() per POST an /api/admin/users senden', () => {
    // Arrange
    const newEmployee = {
      login: 'm.mueller',
      email: 'm.mueller@robotron.de',
      role: 'ROLE_MANAGER',
    };
    let response: unknown;

    // Act
    service.createEmployee(newEmployee).subscribe((res) => (response = res));

    // Assert
    const req = httpTestingController.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEmployee);
    expect(req.request.withCredentials).toBe(true);
    req.flush({ id: 15, ...newEmployee });

    expect(response).toEqual({ id: 15, ...newEmployee });
  });

  it('sollte changeUserRole() per PUT mit newRoleName im Body senden', () => {
    // Arrange
    const userId = 42;
    const newRoleName = 'ROLE_DIRECTOR';

    // Act
    service.changeUserRole(userId, newRoleName).subscribe();

    // Assert
    const req = httpTestingController.expectOne(`${baseUrl}/42/role`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ newRoleName: 'ROLE_DIRECTOR' });
    expect(req.request.withCredentials).toBe(true);
    req.flush({ message: 'Role updated' });
  });

  it('sollte blockUser() per PUT an /{id}/block senden', () => {
    // Act
    service.blockUser(7).subscribe();

    // Assert
    const req = httpTestingController.expectOne(`${baseUrl}/7/block`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({});
    expect(req.request.withCredentials).toBe(true);
    req.flush({ message: 'User blocked' });
  });

  it('sollte unblockUser() per PUT an /{id}/unblock senden', () => {
    // Act
    service.unblockUser(7).subscribe();

    // Assert
    const req = httpTestingController.expectOne(`${baseUrl}/7/unblock`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({});
    expect(req.request.withCredentials).toBe(true);
    req.flush({ message: 'User unblocked' });
  });

  it('sollte anonymizeUser() (DSGVO-Workflow) per PUT an /{id}/anonymize senden', () => {
    // Act
    service.anonymizeUser(99).subscribe();

    // Assert
    const req = httpTestingController.expectOne(`${baseUrl}/99/anonymize`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({});
    expect(req.request.withCredentials).toBe(true);
    req.flush({ message: 'User anonymized according to DSGVO' });
  });

  it('sollte deleteUser() per DELETE an /{id} senden', () => {
    // Act
    service.deleteUser(12).subscribe();

    // Assert
    const req = httpTestingController.expectOne(`${baseUrl}/12`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.withCredentials).toBe(true);
    req.flush({ message: 'User deleted' });
  });

  it('sollte 403 Forbidden Fehler bei fehlenden Admin-Rechten sauber weiterleiten', () => {
    // Arrange
    let errorStatus = 0;

    // Act
    service.deleteUser(1).subscribe({
      next: () => {
        throw new Error('Erwartete 403 Fehler');
      },
      error: (err) => {
        errorStatus = err.status;
      },
    });

    // Assert
    const req = httpTestingController.expectOne(`${baseUrl}/1`);
    req.flush(
      { message: 'Access Denied' },
      { status: 403, statusText: 'Forbidden' }
    );

    expect(errorStatus).toBe(403);
  });
});
