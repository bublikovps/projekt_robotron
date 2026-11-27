import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AuthService } from './auth.service';
import { CurrentUserResponse } from '../models/current-user-response.model';
import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';
import { ChangePasswordRequest } from '../models/change-password-request.model';
import { ResetPasswordRequest } from '../models/reset-password-request.model';
import { CustomerProfileUpdateRequest } from '../models/customer-profile-update-request.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  const baseUrl = '/api/auth';

  const mockCurrentUser = {
    id: 1,
    login: 'admin@robotron.de',
    role: 'ADMIN',
    mustChangePassword: false,
  } as unknown as CurrentUserResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('sollte initial nicht authentifiziert sein', () => {
    expect(service.getCurrentUserValue()).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
  });

  describe('Authentifizierung & Session-Verwaltung', () => {
    it('sollte login() als POST mit withCredentials aufrufen', () => {
      // Arrange
      const credentials = {
        login: 'user@robotron.de',
        password: 'SecretPassword123!',
      } as unknown as LoginRequest;
      const mockResponse = { message: 'Login successful' };
      let actualResponse: unknown;

      // Act
      service.login(credentials).subscribe((res) => (actualResponse = res));

      // Assert
      const req = httpTestingController.expectOne(`${baseUrl}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(credentials);
      expect(req.request.withCredentials).toBe(true);
      req.flush(mockResponse);

      expect(actualResponse).toEqual(mockResponse);
    });

    it('sollte loadCurrentUser() bei Erfolg im BehaviorSubject speichern und isAuthenticated auf true setzen', () => {
      // Arrange
      const emittedValues: Array<CurrentUserResponse | null> = [];
      service.currentUser$.subscribe((user) => emittedValues.push(user));
      let completed = false;

      // Act
      service.loadCurrentUser().subscribe({
        complete: () => (completed = true),
      });

      // Assert
      const req = httpTestingController.expectOne(`${baseUrl}/me`);
      expect(req.request.method).toBe('GET');
      expect(req.request.withCredentials).toBe(true);
      req.flush(mockCurrentUser);

      expect(service.getCurrentUserValue()).toEqual(mockCurrentUser);
      expect(service.isAuthenticated()).toBe(true);
      expect(emittedValues).toEqual([null, mockCurrentUser]);
      expect(completed).toBe(true);
    });

    it('sollte loadCurrentUser() bei 401-Fehler den State auf null zurücksetzen und den Fehler weiterleiten', () => {
      // Arrange
      let receivedErrorStatus = 0;

      // Act
      service.loadCurrentUser().subscribe({
        next: () => {
          throw new Error('Erwartete einen Fehler, aber next() wurde aufgerufen');
        },
        error: (err) => {
          receivedErrorStatus = err.status;
        },
      });

      // Assert
      const req = httpTestingController.expectOne(`${baseUrl}/me`);
      req.flush(
        { message: 'Unauthorized' },
        { status: 401, statusText: 'Unauthorized' }
      );

      expect(receivedErrorStatus).toBe(401);
      expect(service.getCurrentUserValue()).toBeNull();
      expect(service.isAuthenticated()).toBe(false);
    });

    it('sollte logout() den Benutzerstatus auch dann löschen, wenn der Server-Logout fehlschlägt', () => {
      // Arrange
      service.loadCurrentUser().subscribe();
      httpTestingController.expectOne(`${baseUrl}/me`).flush(mockCurrentUser);
      expect(service.isAuthenticated()).toBe(true);

      // Act
      service.logout();

      // Assert
      const req = httpTestingController.expectOne(`${baseUrl}/logout`);
      expect(req.request.method).toBe('POST');
      expect(req.request.withCredentials).toBe(true);
      req.flush(
        { message: 'Server Error' },
        { status: 500, statusText: 'Internal Server Error' }
      );

      expect(service.getCurrentUserValue()).toBeNull();
      expect(service.isAuthenticated()).toBe(false);
    });

    it('sollte clearCurrentUser() den lokalen Zustand sofort zurücksetzen', () => {
      // Arrange
      service.loadCurrentUser().subscribe();
      httpTestingController.expectOne(`${baseUrl}/me`).flush(mockCurrentUser);
      expect(service.isAuthenticated()).toBe(true);

      // Act
      service.clearCurrentUser();

      // Assert
      expect(service.getCurrentUserValue()).toBeNull();
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('Registrierung, Profil & Passwort-Management', () => {
    it('sollte register() an /register senden', () => {
      const registerData = {
        email: 'neu@robotron.de',
        password: 'Password123!',
      } as unknown as RegisterRequest;

      service.register(registerData).subscribe();

      const req = httpTestingController.expectOne(`${baseUrl}/register`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(registerData);
      expect(req.request.withCredentials).toBe(true);
      req.flush({ message: 'Registered' });
    });

    it('sollte getProfile() per GET von /profile abrufen', () => {
      service.getProfile().subscribe();

      const req = httpTestingController.expectOne(`${baseUrl}/profile`);
      expect(req.request.method).toBe('GET');
      expect(req.request.withCredentials).toBe(true);
      req.flush({});
    });

    it('sollte updateProfile() per PUT an /profile senden', () => {
      const updateData = {
        customerType: 'PRIVATE',
        vorname: 'Pavel',
        nachname: 'Bublikov',
      } as unknown as CustomerProfileUpdateRequest;

      service.updateProfile(updateData).subscribe();

      const req = httpTestingController.expectOne(`${baseUrl}/profile`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updateData);
      expect(req.request.withCredentials).toBe(true);
      req.flush({ message: 'Updated' });
    });

    it('sollte changePassword() per PUT an /change-password senden', () => {
      const pwdData = {
        oldPassword: 'Old1!',
        newPassword: 'New2!',
      } as unknown as ChangePasswordRequest;

      service.changePassword(pwdData).subscribe();

      const req = httpTestingController.expectOne(`${baseUrl}/change-password`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(pwdData);
      expect(req.request.withCredentials).toBe(true);
      req.flush({ message: 'Password changed' });
    });

    it('sollte sendForgotPasswordLink() die E-Mail im Body an /forgot-password senden', () => {
      const email = 'vergessen@robotron.de';

      service.sendForgotPasswordLink(email).subscribe();

      const req = httpTestingController.expectOne(`${baseUrl}/forgot-password`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email });
      expect(req.request.withCredentials).toBe(true);
      req.flush({ message: 'Link sent' });
    });

    it('sollte resetPassword() an /reset-password senden', () => {
      const resetData = {
        token: 'reset-token-abc',
        newPassword: 'NewPassword123!',
      } as unknown as ResetPasswordRequest;

      service.resetPassword(resetData).subscribe();

      const req = httpTestingController.expectOne(`${baseUrl}/reset-password`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(resetData);
      expect(req.request.withCredentials).toBe(true);
      req.flush({ message: 'Password reset' });
    });
  });
});
