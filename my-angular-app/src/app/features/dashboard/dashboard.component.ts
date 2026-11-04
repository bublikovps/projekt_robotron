import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { RouterLink }
from '@angular/router';

import { AuthService }
from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent
implements OnInit {

  login = '';

  role = '';

  passwordChangeRequired = false;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.authService
      .currentUser$
      .subscribe(user => {

        if (!user) {

          this.login = '';

          this.role = '';

          this.passwordChangeRequired = false;

          return;
        }

        this.login = user.login;

        this.role = user.role;

        this.passwordChangeRequired =
          user.passwordChangeRequired;
      });
  }

  hasRole(
    roleName: string
  ): boolean {

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