import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  AdminService,
  AdminUserData
} from '../../core/services/admin.service';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  users: AdminUserData[] = [];

  errorMessage = '';

  successMessage = '';

  isLoading = false;

  newEmployee = {
    login: '',
    email: '',
    role: ''
  };

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const token =
      sessionStorage.getItem('jwtToken');

    const role =
      sessionStorage.getItem('userRole');

    if (
      token &&
      (
        role === 'ROLE_ADMIN' ||
        role === 'ROLE_DIRECTOR'
      )
    ) {

      this.loadUsers();

    } else {

      this.users = [];

      this.errorMessage =
        'Zugriff verweigert! Sie haben keine Berechtigung für dieses Panel.';
    }
  }

  loadUsers(): void {

    this.adminService
      .getAllUsers()
      .subscribe({

        next: (data) => {

          this.users = data;

          this.errorMessage = '';

          this.cdr.detectChanges();
        },

        error: (err) => {

          this.users = [];

          this.errorMessage =
            err.error?.error ||
            'Fehler beim Laden der Benutzerdaten vom Server.';

          console.error(
            'Administration Error:',
            err
          );

          this.cdr.detectChanges();
        }
      });
  }

  onCreateEmployee(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (
      !this.newEmployee.login ||
      !this.newEmployee.email ||
      !this.newEmployee.role
    ) {

      this.errorMessage =
        'Bitte füllen Sie alle Pflichtfelder aus!';

      return;
    }

    this.isLoading = true;

    this.adminService
      .createEmployee(this.newEmployee)
      .subscribe({

        next: (res) => {

          this.successMessage =
            res.message ||
            'Mitarbeiter erfolgreich angelegt!';

          this.resetForm();

          this.loadUsers();

          this.clearMessages();
        },

        error: (err) => {

          this.isLoading = false;

          this.errorMessage =
            err.error?.error ||
            'Fehler beim Anlegen des Mitarbeiters.';

          this.cdr.detectChanges();
        }
      });
  }

  onChangeRole(
    userId: number,
    currentRole: string
  ): void {

    if (
      currentRole === 'ROLE_ADMIN' ||
      currentRole === 'ROLE_DIRECTOR'
    ) {

      this.errorMessage =
        'Systemrollen können nicht manipuliert werden!';

      this.clearMessages();

      return;
    }

    const newRole =
      currentRole === 'ROLE_CUSTOMER'
        ? 'ROLE_MANAGER'
        : 'ROLE_CUSTOMER';

    this.adminService
      .changeUserRole(userId, newRole)
      .subscribe({

        next: () => {

          this.successMessage =
            `Rolle erfolgreich auf ${newRole} aktualisiert!`;

          this.loadUsers();

          this.clearMessages();
        },

        error: (err) => {

          this.errorMessage =
            err.error?.error ||
            'Fehler beim Ändern der Rolle.';

          this.clearMessages();
        }
      });
  }

  onDeleteUser(userId: number): void {

    if (
      confirm(
        'Möchten Sie diesen Benutzer wirklich unwiderruflich löschen?'
      )
    ) {

      this.adminService
        .deleteUser(userId)
        .subscribe({

          next: () => {

            this.successMessage =
              'Benutzerkonto erfolgreich gelöscht.';

            this.loadUsers();

            this.clearMessages();
          },

          error: (err) => {

            this.errorMessage =
              err.error?.error ||
              'Fehler beim Löschen des Benutzers.';

            this.clearMessages();
          }
        });
    }
  }

  private resetForm(): void {

    this.newEmployee = {
      login: '',
      email: '',
      role: ''
    };

    this.isLoading = false;
  }

  private clearMessages(): void {

    setTimeout(() => {

      this.successMessage = '';

      this.errorMessage = '';

      this.cdr.detectChanges();

    }, 4000);
  }
}