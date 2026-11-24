import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { firstValueFrom, Observable, of, throwError } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { roleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';
import { CurrentUserResponse } from '../models/current-user-response.model';

describe('roleGuard', () => {
  let routerMock: { navigate: ReturnType<typeof vi.fn> };
  let authServiceMock: {
    getCurrentUserValue: ReturnType<typeof vi.fn>;
    getCurrentUser: ReturnType<typeof vi.fn>;
  };

  const mockState = { url: '/administration' } as RouterStateSnapshot;

  const createRoute = (expectedRoles?: string[]): ActivatedRouteSnapshot =>
    ({
      data: expectedRoles ? { expectedRoles } : {},
    } as unknown as ActivatedRouteSnapshot);

  const setupTestBed = (platformId: 'browser' | 'server' = 'browser') => {
    routerMock = {
      navigate: vi.fn().mockResolvedValue(true),
    };

    authServiceMock = {
      getCurrentUserValue: vi.fn().mockReturnValue(null),
      getCurrentUser: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: platformId },
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    });
  };

  const executeGuard = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot = mockState
  ) => TestBed.runInInjectionContext(() => roleGuard(route, state));

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('SSR / Server-Plattform', () => {
    it('sollte auf dem Server (non-browser) sofort true zurückgeben, ohne AuthService aufzurufen', () => {
      // Arrange
      setupTestBed('server');
      const route = createRoute(['ROLE_ADMIN']);

      // Act
      const result = executeGuard(route);

      // Assert
      expect(result).toBe(true);
      expect(authServiceMock.getCurrentUserValue).not.toHaveBeenCalled();
      expect(authServiceMock.getCurrentUser).not.toHaveBeenCalled();
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });
  });

  describe('Synchroner Pfad (Benutzer bereits im Speicher)', () => {
    beforeEach(() => {
      setupTestBed('browser');
    });

    it('sollte Zugriff erlauben (true), wenn die Rolle des Benutzers erlaubt ist', () => {
      // Arrange
      const adminUser = { role: 'ROLE_ADMIN' } as CurrentUserResponse;
      authServiceMock.getCurrentUserValue.mockReturnValue(adminUser);
      const route = createRoute(['ROLE_ADMIN', 'ROLE_DIRECTOR']);

      // Act
      const result = executeGuard(route);

      // Assert
      expect(result).toBe(true);
      expect(authServiceMock.getCurrentUser).not.toHaveBeenCalled();
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });

    it('sollte Zugriff verweigern (false) und auf "/" umleiten, wenn die Rolle nicht ausreicht', () => {
      // Arrange
      const customerUser = { role: 'ROLE_CUSTOMER' } as CurrentUserResponse;
      authServiceMock.getCurrentUserValue.mockReturnValue(customerUser);
      const route = createRoute(['ROLE_ADMIN']);
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Act
      const result = executeGuard(route);

      // Assert
      expect(result).toBe(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
      expect(warnSpy).toHaveBeenCalled();
      expect(authServiceMock.getCurrentUser).not.toHaveBeenCalled();
    });

    it('sollte Zugriff verweigern (false), wenn expectedRoles in den Route-Daten fehlt', () => {
      // Arrange
      const adminUser = { role: 'ROLE_ADMIN' } as CurrentUserResponse;
      authServiceMock.getCurrentUserValue.mockReturnValue(adminUser);
      const routeWithoutRoles = createRoute(undefined);
      vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Act
      const result = executeGuard(routeWithoutRoles);

      // Assert
      expect(result).toBe(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('Asynchroner Pfad (Initiales Laden via getCurrentUser)', () => {
    beforeEach(() => {
      setupTestBed('browser');
    });

    it('sollte Zugriff erlauben (true), wenn getCurrentUser() einen Benutzer mit passender Rolle liefert', async () => {
      // Arrange
      const directorUser = { role: 'ROLE_DIRECTOR' } as CurrentUserResponse;
      authServiceMock.getCurrentUserValue.mockReturnValue(null);
      authServiceMock.getCurrentUser.mockReturnValue(of(directorUser));
      const route = createRoute(['ROLE_ADMIN', 'ROLE_DIRECTOR']);

      // Act
      const result$ = executeGuard(route) as Observable<boolean>;
      const result = await firstValueFrom(result$);

      // Assert
      expect(result).toBe(true);
      expect(authServiceMock.getCurrentUser).toHaveBeenCalledTimes(1);
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });

    it('sollte Zugriff verweigern (false) und auf "/" umleiten, wenn getCurrentUser() null liefert', async () => {
      // Arrange
      authServiceMock.getCurrentUserValue.mockReturnValue(null);
      authServiceMock.getCurrentUser.mockReturnValue(of(null));
      const route = createRoute(['ROLE_ADMIN']);

      // Act
      const result$ = executeGuard(route) as Observable<boolean>;
      const result = await firstValueFrom(result$);

      // Assert
      expect(result).toBe(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    });

    it('sollte Zugriff verweigern (false) und auf "/" umleiten, wenn getCurrentUser() eine falsche Rolle liefert', async () => {
      // Arrange
      const customerUser = { role: 'ROLE_CUSTOMER' } as CurrentUserResponse;
      authServiceMock.getCurrentUserValue.mockReturnValue(null);
      authServiceMock.getCurrentUser.mockReturnValue(of(customerUser));
      const route = createRoute(['ROLE_ADMIN']);
      vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Act
      const result$ = executeGuard(route) as Observable<boolean>;
      const result = await firstValueFrom(result$);

      // Assert
      expect(result).toBe(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    });

    it('sollte Gastzugriff blockieren (false) und auf "/" umleiten, wenn getCurrentUser() mit 401 fehlschlägt', async () => {
      // Arrange
      authServiceMock.getCurrentUserValue.mockReturnValue(null);
      authServiceMock.getCurrentUser.mockReturnValue(
        throwError(() => ({ status: 401, message: 'Unauthorized' }))
      );
      const route = createRoute(['ROLE_ADMIN']);
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Act
      const result$ = executeGuard(route) as Observable<boolean>;
      const result = await firstValueFrom(result$);

      // Assert
      expect(result).toBe(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
      expect(warnSpy).toHaveBeenCalled();
    });
  });
});
