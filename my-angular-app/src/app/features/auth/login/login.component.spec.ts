import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/services/auth.service';
import { AuthResponse } from '../../../core/models/auth-response.model';
import { CurrentUserResponse } from '../../../core/models/current-user-response.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authServiceMock: {
    login: ReturnType<typeof vi.fn>;
    loadCurrentUser: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    vi.useFakeTimers();
    sessionStorage.clear();

    authServiceMock = {
      login: vi.fn(),
      loadCurrentUser: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    sessionStorage.clear();
  });

  it('sollte die Komponente erfolgreich erstellen', () => {
    expect(component).toBeTruthy();
  });

  it('sollte bei normalem Login nach 1500ms zum "/dashboard" weiterleiten, wenn keine returnUrl gesetzt ist', () => {
    // Arrange
    component.loginData = { login: 'admin', password: 'Password123!' };
    authServiceMock.login.mockReturnValue(
      of({ passwordChangeRequired: false } as unknown as AuthResponse)
    );
    authServiceMock.loadCurrentUser.mockReturnValue(
      of({ id: 1, role: 'ROLE_ADMIN' } as unknown as CurrentUserResponse)
    );

    // Act
    component.onLogin();

    // Assert: Sofortige Rückmeldung vor Timer-Ablauf
    expect(authServiceMock.login).toHaveBeenCalledWith({
      login: 'admin',
      password: 'Password123!',
    });
    expect(authServiceMock.loadCurrentUser).toHaveBeenCalledTimes(1);
    expect(component.successMessage).toBe('Login erfolgreich! Weiterleitung...');
    expect(component.errorMessage).toBe('');
    expect(router.navigate).not.toHaveBeenCalled();

    // Act: Timer um 1500ms vorspulen
    vi.advanceTimersByTime(1500);

    // Assert: Navigation erfolgt
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('sollte nach Login zur gespeicherten "returnUrl" aus sessionStorage weiterleiten und diese löschen', () => {
    // Arrange
    sessionStorage.setItem('returnUrl', '/asset-management/devices');
    component.loginData = { login: 'manager', password: 'Password123!' };
    authServiceMock.login.mockReturnValue(
      of({ passwordChangeRequired: false } as unknown as AuthResponse)
    );
    authServiceMock.loadCurrentUser.mockReturnValue(
      of({ id: 2, role: 'ROLE_MANAGER' } as unknown as CurrentUserResponse)
    );

    // Act
    component.onLogin();
    vi.advanceTimersByTime(1500);

    // Assert
    expect(router.navigate).toHaveBeenCalledWith(['/asset-management/devices']);
    expect(sessionStorage.getItem('returnUrl')).toBeNull();
  });

  it('sollte bei Erstanmeldung (passwordChangeRequired: true) nach 2000ms auf "/profile" umleiten', () => {
    // Arrange
    component.loginData = { login: 'new.employee', password: 'TempPassword1!' };
    authServiceMock.login.mockReturnValue(
      of({ passwordChangeRequired: true } as unknown as AuthResponse)
    );
    authServiceMock.loadCurrentUser.mockReturnValue(
      of({ id: 3, role: 'ROLE_EMPLOYEE' } as unknown as CurrentUserResponse)
    );

    // Act
    component.onLogin();

    // Assert: Nach 1500ms darf noch keine Weiterleitung passieren
    vi.advanceTimersByTime(1500);
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.successMessage).toContain('Passwortänderung');

    // Act: Restliche 500ms vorspulen (gesamt 2000ms)
    vi.advanceTimersByTime(500);
    expect(router.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('sollte spezifische Fehlermeldung vom Backend anzeigen, wenn login() mit 401 fehlschlägt', () => {
    // Arrange
    component.loginData = { login: 'wrong', password: 'wrong' };
    authServiceMock.login.mockReturnValue(
      throwError(() => ({
        status: 401,
        error: { error: 'Benutzerkonto ist gesperrt!' },
      }))
    );

    // Act
    component.onLogin();

    // Assert
    expect(component.errorMessage).toBe('Benutzerkonto ist gesperrt!');
    expect(component.successMessage).toBe('');
    expect(authServiceMock.loadCurrentUser).not.toHaveBeenCalled();
  });

  it('sollte Standard-Fehlermeldung anzeigen, wenn Backend keine detaillierte Nachricht liefert', () => {
    // Arrange
    authServiceMock.login.mockReturnValue(
      throwError(() => ({ status: 500 }))
    );

    // Act
    component.onLogin();

    // Assert
    expect(component.errorMessage).toBe('Ungültiger Login oder Passwort!');
  });

  it('sollte Fehlermeldung setzen, wenn login() klappt, aber loadCurrentUser() fehlschlägt', () => {
    // Arrange
    authServiceMock.login.mockReturnValue(
      of({ passwordChangeRequired: false } as unknown as AuthResponse)
    );
    authServiceMock.loadCurrentUser.mockReturnValue(
      throwError(() => ({ status: 500 }))
    );

    // Act
    component.onLogin();

    // Assert
    expect(component.errorMessage).toBe(
      'Benutzerdaten konnten nicht geladen werden.'
    );
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
