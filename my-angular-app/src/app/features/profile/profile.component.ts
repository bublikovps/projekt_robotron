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

import { AuthService }
from '../../core/services/auth.service';

import { UserProfileResponse }
from '../../core/models/user-profile-response.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent
implements OnInit {

  user: UserProfileResponse | null = null;

  errorMessage = '';

  successMessage = '';

  isLoading = true;

  isEnforcedChange = false;

  pwdData = {
    oldPassword: '',
    newPassword: ''
  };

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.authService
      .getCurrentUser()
      .subscribe({

        next: currentUser => {

          this.authService
            .getProfile()
            .subscribe({

              next: (data: UserProfileResponse) => {

                this.user = data;

                this.isLoading = false;

                if (
                  data.passwordChangeRequired
                ) {

                  this.isEnforcedChange = true;

                  this.errorMessage =
                    'Erstanmeldung erkannt! Bitte ändern Sie Ihr temporäres Passwort, um Ihr Konto zu aktivieren.';
                }

                this.cdr.detectChanges();
              },

              error: () => {

                this.isLoading = false;

                this.errorMessage =
                  'Fehler beim Laden des Profils vom Server.';

                this.cdr.detectChanges();
              }
            });
        },

        error: () => {

          this.isLoading = false;

          this.errorMessage =
            'Sie sind nicht eingeloggt.';

          this.cdr.detectChanges();
        }
      });
  }

  onChangePassword(): void {

    this.errorMessage = '';

    this.successMessage = '';

    this.authService
      .getCurrentUser()
      .subscribe({

        next: currentUser => {

          const requestData = {

            login: currentUser.login,

            oldPassword:
              this.pwdData.oldPassword,

            newPassword:
              this.pwdData.newPassword
          };

          this.authService
            .changePassword(requestData)
            .subscribe({

              next: () => {

                this.successMessage =
                  'Passwort erfolgreich geändert! Ihr Konto ist nun vollständig aktiv.';

                this.errorMessage = '';

                this.isEnforcedChange = false;

                if (this.user) {

                  this.user.passwordChangeRequired =
                    false;
                }

                this.pwdData = {
                  oldPassword: '',
                  newPassword: ''
                };

                this.cdr.detectChanges();
              },

              error: err => {

                this.errorMessage =
                  err.error?.error ||
                  'Fehler beim Ändern des Passworts.';

                this.cdr.detectChanges();
              }
            });
        },

        error: () => {

          this.errorMessage =
            'Sitzung abgelaufen. Bitte neu einloggen.';

          this.cdr.detectChanges();
        }
      });
  }
}