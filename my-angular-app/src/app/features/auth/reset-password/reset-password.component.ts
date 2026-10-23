import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.component.html', // Твой исправленный стандарт!
  styleUrls: ['./reset-password.component.css']    // Твой исправленный стандарт!
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  newPassword: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute, // Инструмент для чтения URL
    private router: Router,        // Инструмент для навигации
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Ловим ?token=XYZ из адресной строки в момент загрузки страницы
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      console.log('[ROUTER] Извлечен токен сброса пароля:', this.token);
      
      if (!this.token) {
        this.errorMessage = 'Ungültiger Link. Der Sicherheits-Token fehlt!';
        this.cdr.detectChanges();
      }
    });
  }

  onResetPassword(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.token) {
      this.errorMessage = 'Aktion nicht möglich: Kein gültiger Token vorhanden.';
      return;
    }

    this.isLoading = true;
    const requestData = {
      token: this.token,
      newPassword: this.newPassword
    };

    console.log('[HTTP POST] Отправка нового пароля на бэкенд...');

    this.authService.resetPassword(requestData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Passwort erfolgreich zurückgesetzt! Sie werden gleich zum Login weitergeleitet...';
        this.newPassword = '';
        this.cdr.detectChanges();

        // Авто-перенаправление на страницу входа через 3 секунды (Профессиональный UX!)
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.isLoading = false;
        // Показываем немецкую ошибку от Java, если токен просрочен (>15 мин) или пароль слишком простой
        this.errorMessage = err.error?.error || 'Fehler beim Zurücksetzen des Passworts.';
        console.error('Fehler beim Passwort-Reset:', err);
        this.cdr.detectChanges();
      }
    });
  }
}
