import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

export interface AdminUserData {

  id: number;

  login: string;

  email: string;

  role: string;

  active: boolean;

  createdAt: string;

  customerType?: string | null;

  companyName?: string | null;

  ustIdnr?: string | null;

  accountBalance?: number | null;

  canDelete: boolean;

  anonymized: boolean;

}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl =
    'http://localhost:8080/api/admin/users';

  constructor(
    private http: HttpClient
  ) {}

  getAllUsers():
  Observable<AdminUserData[]> {

    return this.http.get<
      AdminUserData[]
    >(
      this.apiUrl,
      {
        withCredentials: true
      }
    );

  }

  createEmployee(
    employeeData: {
      login: string;
      email: string;
      role: string;
    }
  ): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      employeeData,
      {
        withCredentials: true
      }
    );

  }

  changeUserRole(
    userId: number,
    newRoleName: string
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/${userId}/role`,

      {
        newRoleName
      },

      {
        withCredentials: true
      }

    );

  }

  blockUser(
    userId: number
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/${userId}/block`,

      {},

      {
        withCredentials: true
      }

    );

  }

  unblockUser(
    userId: number
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/${userId}/unblock`,

      {},

      {
        withCredentials: true
      }

    );

  }

  anonymizeUser(
    userId: number
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/${userId}/anonymize`,

      {},

      {
        withCredentials: true
      }

    );

  }

  deleteUser(
    userId: number
  ): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/${userId}`,

      {
        withCredentials: true
      }

    );

  }

}
