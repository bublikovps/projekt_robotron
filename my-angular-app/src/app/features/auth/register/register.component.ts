import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../core/models/register-request.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // СТАЛО: Имя поля строго совпадает с RegisterRequest DTO на бэкенде Java!
  registerData: RegisterRequest  = {
    login: '',
    email: '',
    password: ''
  };

  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    console.log('[AUTH UI] Sende Registrierungsdaten an Backend...');

    this.authService.register(this.registerData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Registrierung erfolgreich! Weiterleitung zum Login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'Registrierung fehlgeschlagen. Bitte überprüfen Sie Ihre Daten.';
        console.error('Registrierungsfehler:', err);
      }
    });
  }
}
