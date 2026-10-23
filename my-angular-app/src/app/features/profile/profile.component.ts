import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserProfileResponse } from '../../core/models/user-profile-response.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserProfileResponse | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = true;
  
  // Флаг принудительной блокировки интерфейса для первого входа
  isEnforcedChange: boolean = false; 
  pwdData = { oldPassword: '', newPassword: '' };

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const currentUserJson = sessionStorage.getItem('currentUser');
    if (currentUserJson) {
      const currentUser = JSON.parse(currentUserJson);
      
      console.log(`[PROFILE] Lade Daten für Benutzer: ${currentUser.login}`);

      this.authService.getProfile().subscribe({
        next: (data: UserProfileResponse) => {
          this.user = data;
          this.isLoading = false;
          
          // Проверяем: если бэкенд говорит, что пароль ОБЯЗАТЕЛЬНО нужно сменить
          if (data.passwordChangeRequired) {
            this.isEnforcedChange = true;
            this.errorMessage = 'Erstanmeldung erkannt! Bitte ändern Sie Ihr temporäres Passwort, um Ihr Konto zu aktivieren.';
          }
          
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Fehler beim Laden des Profils vom Server.';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.isLoading = false;
      this.errorMessage = 'Sie sind nicht eingeloggt.';
      this.cdr.detectChanges();
    }
  }

  onChangePassword(): void {
    this.errorMessage = '';
    this.successMessage = '';

    const currentUserJson = sessionStorage.getItem('currentUser');
    if (!currentUserJson) {
      this.errorMessage = 'Sitzung abgelaufen. Bitte neu einloggen.';
      return;
    }
    const currentUser = JSON.parse(currentUserJson);

    const requestData = {
      login: currentUser.login,
      oldPassword: this.pwdData.oldPassword,
      newPassword: this.pwdData.newPassword
    };

    this.authService.changePassword(requestData).subscribe({
      next: (res) => {
        // УСПЕХ: Пароль изменен!
        this.successMessage = 'Passwort erfolgreich geändert! Ihr Konto ist nun vollständig aktiv.';
        this.errorMessage = '';
        
        // БЕСШОВНЫЙ СБРОС БЛОКИРОВКИ: Снимаем флаг принудительной смены, менеджер может работать!
        this.isEnforcedChange = false; 
        if (this.user) {
          this.user.passwordChangeRequired = false;
        }

        sessionStorage.setItem('passwordChangeRequired', 'false');
        
        this.pwdData = { oldPassword: '', newPassword: '' }; // Очищаем форму
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Fehler beim Ändern des Passworts.';
        this.cdr.detectChanges();
      }
    });
  }
}
