import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface AdminUserData {
  id: number;
  login: string;
  email: string;
  createdAt: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin/users';

  constructor(private http: HttpClient) { }

  
  getAllUsers(): Observable<AdminUserData[]> {
    return this.http.get<AdminUserData[]>(this.apiUrl);
  }

  
  changeUserRole(userId: number, newRoleName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/role`, {newRoleName: newRoleName });
  }

  
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }

  
  createEmployee(employeeData: { login: string, email: string, role: string }): Observable<any> {
    console.log('[ADMIN SERVICE] Отправка данных нового сотрудника на бэкенд:', employeeData);
    return this.http.post<any>(this.apiUrl, employeeData);
  }
}
