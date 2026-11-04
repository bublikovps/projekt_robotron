import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  ChangeDetectorRef
} from '@angular/core';


import { AuthService }
from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    login: '',
    password: ''
  };

  errorMessage = '';

  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onLogin(): void {

    this.errorMessage = '';

    this.successMessage = '';

    this.authService
      .login(this.loginData)
      .subscribe({

        next: res => {

          this.authService
            .loadCurrentUser()
            .subscribe({

              next: () => {

                if (
                  res.passwordChangeRequired
                ) {

                  this.successMessage =
                    'Erstanmeldung erkannt! Sie werden zur obligatorischen Passwortänderung weitergeleitet...';

                  setTimeout(() => {

                    this.router.navigate([
                      '/profile'
                    ]);

                  }, 2000);

                } else {

                  this.successMessage =
                    'Login erfolgreich! Weiterleitung...';

                  setTimeout(() => {

                    this.router.navigate([
                      '/dashboard'
                    ]);

                  }, 1500);
                }
              },

              error: () => {

                this.errorMessage =
                  'Benutzerdaten konnten nicht geladen werden.';
              }
            });
        },

        error: err => {

          this.errorMessage =
            err.error?.error ??
            'Ungültiger Login oder Passwort!';

            this.cdr.detectChanges();

        
        }
      });
  }
}