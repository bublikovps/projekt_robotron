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

  showCreateEmployeeDialog = false;

  currentRole = '';

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

          this.currentRole =
            user.role;

          if (

            user.role ===
              'ROLE_ADMIN'

            ||

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

          this.errorMessage = '';

          this.newEmployee = {

            login: '',

            email: '',

            role: 'ROLE_MANAGER'

          };

          this.closeCreateEmployeeDialog();

          this.loadUsers();

        },

        error: err => {

          this.errorMessage =
            err.error?.error ||
            'Fehler beim Anlegen.';

        }

      });

  }

  onBlockUser(
    userId: number
  ): void {

    this.adminService
      .blockUser(userId)
      .subscribe({

        next: () => {

          this.successMessage =
            'Benutzer wurde gesperrt.';

          this.errorMessage = '';

          this.loadUsers();

        }

      });

  }

  onUnblockUser(
    userId: number
  ): void {

    this.adminService
      .unblockUser(userId)
      .subscribe({

        next: () => {

          this.successMessage =
            'Benutzer wurde entsperrt.';

          this.errorMessage = '';

          this.loadUsers();

        }

      });

  }

  onDeleteUser(
    userId: number
  ): void {

    if (
      !confirm(
        'Benutzer endgültig löschen?'
      )
    ) {
      return;
    }

    this.adminService
      .deleteUser(userId)
      .subscribe({

        next: () => {

          this.successMessage =
            'Benutzer gelöscht.';

          this.errorMessage = '';

          this.loadUsers();

        },

        error: err => {

          this.errorMessage =
            err.error?.error ||
            'Löschen fehlgeschlagen.';

        }

      });

  }

  onAnonymizeUser(
    userId: number
  ): void {

    if (
      !confirm(
        'Benutzer DSGVO-konform anonymisieren?'
      )
    ) {
      return;
    }

    this.adminService
      .anonymizeUser(
        userId
      )
      .subscribe({

        next: res => {

          this.successMessage =
            res.message;

          this.errorMessage = '';

          this.loadUsers();

        },

        error: err => {

          this.errorMessage =
            err.error?.error
            ||
            'Anonymisierung fehlgeschlagen.';

          this.cdr.detectChanges();

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

          this.successMessage =
            'Rolle geändert.';

          this.errorMessage = '';

          this.loadUsers();

        }

      });

  }

  isDirector(): boolean {

    return this.currentRole ===
      'ROLE_DIRECTOR';

  }

  canAnonymize(
    user: AdminUserData
  ): boolean {

    return user.role ===
      'ROLE_CUSTOMER'
      &&
      !user.anonymized;

  }

  canDelete(
    user: AdminUserData
  ): boolean {

    return user.canDelete;

  }

  getStatusLabel(
    user: AdminUserData
  ): string {

    if (
      user.anonymized
    ) {

      return 'Anonymisiert';

    }

    return user.active
      ? 'Aktiv'
      : 'Gesperrt';

  }

  getRoleLabel(
    role: string
  ): string {

    switch (role) {

      case 'ROLE_DIRECTOR':
        return 'Direktor';

      case 'ROLE_ADMIN':
        return 'Administrator';

      case 'ROLE_MANAGER':
        return 'Manager';

      case 'ROLE_CUSTOMER':
        return 'Kunde';

      default:
        return role;

    }

  }

  openCreateEmployeeDialog(): void {

    this.showCreateEmployeeDialog = true;

  }

  closeCreateEmployeeDialog(): void {

    this.showCreateEmployeeDialog = false;

  }

}