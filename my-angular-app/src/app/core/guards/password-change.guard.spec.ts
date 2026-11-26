import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { passwordChangeGuard } from './password-change.guard';
import { AuthService } from '../services/auth.service';
import { CurrentUserResponse } from '../models/current-user-response.model';

describe('passwordChangeGuard', () => {
  let routerMock: { navigate: ReturnType<typeof vi.fn> };
  let authServiceMock: { getCurrentUserValue: ReturnType<typeof vi.fn> };

  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = { url: '/asset-management' } as RouterStateSnapshot;

  const executeGuard = (
    route: ActivatedRouteSnapshot = mockRoute,
    state: RouterStateSnapshot = mockState
  ) => TestBed.runInInjectionContext(() => passwordChangeGuard(route, state));

  beforeEach(() => {
    vi.restoreAllMocks();

    routerMock = {
      navigate: vi.fn().mockResolvedValue(true),
    };

    authServiceMock = {
      getCurrentUserValue: vi.fn().mockReturnValue(null),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    });
  });

  it('sollte Navigation blockieren (false) und auf "/profile" umleiten, wenn passwordChangeRequired === true ist', () => {
    // Arrange
    const userMustChangePwd = {
      role: 'ROLE_EMPLOYEE',
      passwordChangeRequired: true,
    } as unknown as CurrentUserResponse;
    authServiceMock.getCurrentUserValue.mockReturnValue(userMustChangePwd);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Act
    const result = executeGuard();

    // Assert
    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/profile']);
    expect(warnSpy).toHaveBeenCalled();
  });

  it('sollte Navigation erlauben (true), wenn passwordChangeRequired === false ist', () => {
    // Arrange
    const validUser = {
      role: 'ROLE_EMPLOYEE',
      passwordChangeRequired: false,
    } as unknown as CurrentUserResponse;
    authServiceMock.getCurrentUserValue.mockReturnValue(validUser);

    // Act
    const result = executeGuard();

    // Assert
    expect(result).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('sollte Navigation erlauben (true), wenn kein Benutzer im Speicher geladen ist (null)', () => {
    // Arrange
    authServiceMock.getCurrentUserValue.mockReturnValue(null);

    // Act
    const result = executeGuard();

    // Assert
    expect(result).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
