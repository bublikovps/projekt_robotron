import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  BehaviorSubject
} from 'rxjs';

import { ApiMessageResponse }
from '../models/api-message-response.model';

import { UserProfileResponse }
from '../models/user-profile-response.model';

import { CurrentUserResponse }
from '../models/current-user-response.model';

import { RegisterRequest }
from '../models/register-request.model';

import { LoginRequest }
from '../models/login-request.model';

import { AuthResponse }
from '../models/auth-response.model';

import { ChangePasswordRequest }
from '../models/change-password-request.model';

import { ResetPasswordRequest }
from '../models/reset-password-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
    'http://localhost:8080/api/auth';

  private currentUserSubject =
    new BehaviorSubject<
      CurrentUserResponse | null
    >(null);

  currentUser$ =
    this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  register(
    data: RegisterRequest
  ): Observable<ApiMessageResponse> {

    return this.http.post<ApiMessageResponse>(
      `${this.apiUrl}/register`,
      data,
      {
        withCredentials: true
      }
    );
  }

  login(
    credentials: LoginRequest
  ): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      credentials,
      {
        withCredentials: true
      }
    );
  }

  getProfile():
    Observable<UserProfileResponse> {

    return this.http.get<UserProfileResponse>(
      `${this.apiUrl}/profile`,
      {
        withCredentials: true
      }
    );
  }

  getCurrentUser():
    Observable<CurrentUserResponse> {

    return this.http.get<CurrentUserResponse>(
      `${this.apiUrl}/me`,
      {
        withCredentials: true
      }
    );
  }

  loadCurrentUser(): Observable<CurrentUserResponse> {

    return new Observable(observer => {

      this.getCurrentUser()
        .subscribe({

          next: user => {

            this.currentUserSubject.next(
              user
            );

            observer.next(user);

            observer.complete();
          },

          error: err => {

            this.currentUserSubject.next(
              null
            );

            observer.error(err);
          }
        });
    });
  }

  getCurrentUserValue():
    CurrentUserResponse | null {

    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {

    return (
      this.currentUserSubject.value
      !== null
    );
  }

  clearCurrentUser(): void {

      this.currentUserSubject.next(
        null
      );
    }

    logoutRequest():
    Observable<ApiMessageResponse> {

    return this.http.post<ApiMessageResponse>(
      `${this.apiUrl}/logout`,
      {},
      {
        withCredentials: true
      }
    );
  }

  logout(): void {

    this.logoutRequest()
      .subscribe({

        next: () => {

          this.clearCurrentUser();
        },

        error: () => {

          this.clearCurrentUser();
        }
      });
  }

  changePassword(
    data: ChangePasswordRequest
  ): Observable<ApiMessageResponse> {

    return this.http.put<ApiMessageResponse>(
      `${this.apiUrl}/change-password`,
      data,
      {
        withCredentials: true
      }
    );
  }

  sendForgotPasswordLink(
    email: string
  ): Observable<ApiMessageResponse> {

    return this.http.post<ApiMessageResponse>(
      `${this.apiUrl}/forgot-password`,
      { email },
      {
        withCredentials: true
      }
    );
  }

  resetPassword(
    data: ResetPasswordRequest
  ): Observable<ApiMessageResponse> {

    return this.http.post<ApiMessageResponse>(
      `${this.apiUrl}/reset-password`,
      data,
      {
        withCredentials: true
      }
    );
  }
}