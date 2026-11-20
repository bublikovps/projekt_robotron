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
  AuthService
} from '../../core/services/auth.service';

import {
  UserProfileResponse
} from '../../core/models/user-profile-response.model';

import {
  CustomerProfileUpdateRequest
} from '../../core/models/customer-profile-update-request.model';

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

  user: UserProfileResponse | null =
    null;

  errorMessage = '';

  successMessage = '';

  isLoading = true;

  isEnforcedChange = false;

  isSavingProfile = false;

  profileData:
    CustomerProfileUpdateRequest = {

    customerType: 'PRIVATE',

    vorname: '',

    nachname: '',

    companyName: '',

    ustIdnr: '',

    defaultShippingAddress: ''

  };

  pwdData = {

    oldPassword: '',

    newPassword: ''

  };

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadProfile();

  }

  loadProfile(): void {

    this.authService
      .getCurrentUser()
      .subscribe({

        next: () => {

          this.authService
            .getProfile()
            .subscribe({

              next: profile => {

                this.user =
                  profile;

                this.profileData = {

                  customerType:
                    (
                      profile.customerType as
                      'PRIVATE' | 'BUSINESS'
                    )
                    || 'PRIVATE',

                  vorname:
                    profile.vorname || '',

                  nachname:
                    profile.nachname || '',

                  companyName:
                    profile.companyName || '',

                  ustIdnr:
                    profile.ustIdnr || '',

                  defaultShippingAddress:
                    profile.defaultShippingAddress || ''

                };

                this.isLoading =
                  false;

                if (
                  profile.passwordChangeRequired
                ) {

                  this.isEnforcedChange =
                    true;

                  this.errorMessage =
                    'Erstanmeldung erkannt. Bitte ändern Sie Ihr Passwort.';

                }

                this.cdr.detectChanges();

              },

              error: () => {

                this.isLoading =
                  false;

                this.errorMessage =
                  'Fehler beim Laden des Profils.';

                this.cdr.detectChanges();

              }

            });

        },

        error: () => {

          this.isLoading =
            false;

          this.errorMessage =
            'Sie sind nicht eingeloggt.';

          this.cdr.detectChanges();

        }

      });

  }

  onSaveProfile(): void {

    this.successMessage = '';

    this.errorMessage = '';

    this.isSavingProfile =
      true;

    this.authService
      .updateProfile(
        this.profileData
      )
      .subscribe({

        next: response => {

          this.successMessage =
            response.message;

          this.isSavingProfile =
            false;

          this.loadProfile();

        },

        error: err => {

          this.errorMessage =
            err.error?.error
            || 'Profil konnte nicht gespeichert werden.';

          this.isSavingProfile =
            false;

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

            login:
              currentUser.login,

            oldPassword:
              this.pwdData.oldPassword,

            newPassword:
              this.pwdData.newPassword

          };

          this.authService
            .changePassword(
              requestData
            )
            .subscribe({

              next: () => {

                this.successMessage =
                  'Passwort erfolgreich geändert.';

                this.isEnforcedChange =
                  false;

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

        }

      });

  }

}