import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiMessageResponse } from '../models/api-message-response.model';
import { UserProfileResponse } from '../models/user-profile-response.model';
import { RegisterRequest } from '../models/register-request.model';
import { LoginRequest } from '../models/login-request.model';
import { AuthResponse } from '../models/auth-response.model';
import { ChangePasswordRequest } from '../models/change-password-request.model';
import { ResetPasswordRequest } from '../models/reset-password-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient
  ) {}

  register(
    data: RegisterRequest
  ): Observable<ApiMessageResponse> {

    return this.http.post<ApiMessageResponse>(
      `${this.apiUrl}/register`,
      data
    );
  }

  login(
    credentials: LoginRequest
  ): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      credentials
    );
  }

  getProfile(): Observable<UserProfileResponse> {

    return this.http.get<UserProfileResponse>(
      `${this.apiUrl}/profile`
    );
  }

  changePassword(
    data: ChangePasswordRequest
  ): Observable<ApiMessageResponse> {

    return this.http.put<ApiMessageResponse>(
      `${this.apiUrl}/change-password`,
      data
    );
  }

  sendForgotPasswordLink(
    email: string
  ): Observable<ApiMessageResponse> {

    return this.http.post<ApiMessageResponse>(
      `${this.apiUrl}/forgot-password`,
      { email }
    );
  }

  resetPassword(
    data: ResetPasswordRequest
  ): Observable<ApiMessageResponse> {

    return this.http.post<ApiMessageResponse>(
      `${this.apiUrl}/reset-password`,
      data
    );
  }
}