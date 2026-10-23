import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  login = '';
  role = '';

  ngOnInit(): void {

    const userJson =
      sessionStorage.getItem('currentUser');

    if (userJson) {

      const user = JSON.parse(userJson);

      this.login = user.login;
      this.role = user.role;
    }
  }

  hasRole(roleName: string): boolean {
    return this.role === roleName;
  }

  getRoleDisplayName(): string {

    switch (this.role) {

      case 'ROLE_DIRECTOR':
        return 'Director';

      case 'ROLE_ADMIN':
        return 'Administrator';

      case 'ROLE_MANAGER':
        return 'Manager';

      case 'ROLE_CUSTOMER':
        return 'Customer';

      default:
        return 'User';
    }
  }
}