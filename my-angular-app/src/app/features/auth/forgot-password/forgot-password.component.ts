import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  onSendLink(): void {
    this.errorMessage = '';
    this.successMessage = '';
    
    if (!this.email) {
      this.errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
      return;
    }

    this.isLoading = true;
    console.log('[HTTP POST] Sende Passwort-Reset-Anforderung für Email:', this.email);

    this.authService.sendForgotPasswordLink(this.email).subscribe({
      next: (res) => {
        this.isLoading = false;
        // Получаем безопасное общее сообщение от Java
        this.successMessage = res.message || 'Wenn die E-Mail existiert, wurde ein Link gesendet.';
        this.email = ''; // Очищаем поле ввода
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'Fehler beim Senden des Wiederherstellungslinks.';
        console.error('Fehler bei Passwort-Reset-Anforderung:', err);
        this.cdr.detectChanges();
      }
    });
  }
}
