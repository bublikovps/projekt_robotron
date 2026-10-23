import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { login: '', password: '' };
  
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (res: any) => { // Nutzen von any, da wir nun ein dynamisches Map-Objekt vom Server erhalten
        
        // 1. Benutzerdaten im Browser-Speicher sichern
        const userObj = {
          login: res.login,
          role: res.role
        };
        
        sessionStorage.setItem('currentUser', JSON.stringify(userObj));
        sessionStorage.setItem('userRole', res.role);
        sessionStorage.setItem('jwtToken', res.token);
        sessionStorage.setItem('passwordChangeRequired', String(res.passwordChangeRequired));

        // 2. B2B-SICHERHEITSCHECK: Muss der neue Kollege sein Passwort ändern?
        if (res.passwordChangeRequired === true) {
          this.successMessage = 'Erstanmeldung erkannt! Sie werden zur obligatorischen Passwortänderung weitergeleitet...';
          
          setTimeout(() => {
            this.router.navigate(['/profile']); // Hardcore-Umleitung direkt in den Profil-Bereich!
          }, 2000);
          
        } else {
          // Standard-Weiterleitung für normale Benutzer auf die Store-Startseite
          this.successMessage = 'Login erfolgreich! Weiterleitung...';
          
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Ungültiger Login oder Passwort!';
        console.error('Login-Fehler:', err);
      }
    });
  }
}
