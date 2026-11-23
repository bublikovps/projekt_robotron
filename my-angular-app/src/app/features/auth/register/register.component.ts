import {
  Component
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  AuthService
} from '../../../core/services/auth.service';

import {
  RegisterRequest
} from '../../../core/models/register-request.model';

@Component({
  selector: 'app-register',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl:
    './register.component.html',

  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent {

  registerData:
    RegisterRequest = {

    login: '',

    email: '',

    password: ''

  };

  errorMessage = '';

  successMessage = '';

  isLoading = false;

  constructor(

    private authService:
      AuthService,

    private router:
      Router

  ) {}

  onRegister(): void {

    this.errorMessage = '';

    this.successMessage = '';

    this.isLoading = true;

    this.authService
      .register(
        this.registerData
      )
      .subscribe({

        next: () => {

          this.successMessage =
            'Registrierung erfolgreich. Anmeldung wird durchgeführt...';

          this.authService
            .login({

              login:
                this.registerData.login,

              password:
                this.registerData.password

            })
            .subscribe({

              next: () => {

                this.authService
                  .loadCurrentUser()
                  .subscribe({

                    next: () => {

                      const returnUrl =

                        sessionStorage.getItem(
                          'returnUrl'
                        );

                      if (
                        returnUrl
                      ) {

                        sessionStorage.removeItem(
                          'returnUrl'
                        );

                        this.router.navigate([
                          returnUrl
                        ]);

                      }
                      else {

                        this.router.navigate([
                          '/dashboard'
                        ]);

                      }

                    },

                    error: () => {

                      this.errorMessage =
                        'Benutzerdaten konnten nicht geladen werden.';

                      this.isLoading =
                        false;

                    }

                  });

              },

              error: () => {

                this.errorMessage =
                  'Automatische Anmeldung fehlgeschlagen.';

                this.isLoading =
                  false;

              }

            });

        },

        error: err => {

          this.errorMessage =
            err.error?.error
            ||
            'Registrierung fehlgeschlagen.';

          this.isLoading =
            false;

        }

      });

  }

}