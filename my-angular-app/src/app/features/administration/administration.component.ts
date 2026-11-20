import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  AdminService,
  AdminUserData
} from '../../core/services/admin.service';

import {
  AuthService
} from '../../core/services/auth.service';

type AdminArea =
  | 'users'
  | 'customers'
  | 'employees';

@Component({
  selector: 'app-administration',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl:
    './administration.component.html',

  styleUrls: [
    './administration.component.css'
  ]
})
export class AdministrationComponent
implements OnInit {

  users: AdminUserData[] = [];

  filteredUsers:
    AdminUserData[] = [];

  selectedArea:
    AdminArea =
      'users';

  searchTerm = '';

  errorMessage = '';

  successMessage = '';

  isLoading = false;

  newEmployee = {

    login: '',

    email: '',

    role: 'ROLE_MANAGER'

  };

  constructor(
    private adminService:
      AdminService,

    private authService:
      AuthService,

    private cdr:
      ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.authService
      .getCurrentUser()
      .subscribe({

        next: user => {

          if (
            user.role ===
              'ROLE_ADMIN' ||
            user.role ===
              'ROLE_DIRECTOR'
          ) {

            this.loadUsers();

          } else {

            this.errorMessage =
              'Zugriff verweigert.';

            this.cdr.detectChanges();

          }

        },

        error: () => {

          this.errorMessage =
            'Zugriff verweigert.';

          this.cdr.detectChanges();

        }

      });

  }

  selectArea(
    area: AdminArea
  ): void {

    this.selectedArea = area;

    this.filterUsers();

  }

  loadUsers(): void {

    this.adminService
      .getAllUsers()
      .subscribe({

        next: data => {

          this.users = data;

          this.filterUsers();

          this.cdr.detectChanges();

        },

        error: err => {

          this.errorMessage =
            err.error?.error ||
            'Fehler beim Laden.';

          this.cdr.detectChanges();

        }

      });

  }

  filterUsers(): void {

    const term =
      this.searchTerm
        .toLowerCase()
        .trim();

    let result =
      [...this.users];

    switch (
      this.selectedArea
    ) {

      case 'customers':

        result =
          result.filter(
            user =>
              user.role ===
              'ROLE_CUSTOMER'
          );

        break;

      case 'employees':

        result =
          result.filter(
            user =>
              user.role !==
              'ROLE_CUSTOMER'
          );

        break;

    }

    if (term) {

      result =
        result.filter(
          user =>
            user.login
              .toLowerCase()
              .includes(term)
            ||
            user.email
              .toLowerCase()
              .includes(term)
        );

    }

    this.filteredUsers =
      result;

  }

  onCreateEmployee(): void {

    this.adminService
      .createEmployee(
        this.newEmployee
      )
      .subscribe({

        next: res => {

          this.successMessage =
            res.message;

          this.newEmployee = {

            login: '',

            email: '',

            role:
              'ROLE_MANAGER'

          };

          this.loadUsers();

        },

        error: err => {

          this.errorMessage =
            err.error?.error
            ||
            'Fehler';

        }

      });

  }

  onDeleteUser(
    userId: number
  ): void {

    if (
      !confirm(
        'Benutzer löschen?'
      )
    ) {
      return;
    }

    this.adminService
      .deleteUser(userId)
      .subscribe({

        next: () => {

          this.loadUsers();

        }

      });

  }

  onChangeRole(
    userId: number,
    role: string
  ): void {

    const newRole =
      role === 'ROLE_MANAGER'
        ? 'ROLE_CUSTOMER'
        : 'ROLE_MANAGER';

    this.adminService
      .changeUserRole(
        userId,
        newRole
      )
      .subscribe({

        next: () => {

          this.loadUsers();

        }

      });

  }

}
