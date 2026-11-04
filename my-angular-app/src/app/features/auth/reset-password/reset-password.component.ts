import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.component.html',  
  styleUrls: ['./reset-password.component.css']   
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  newPassword: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,  
    private router: Router,         
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      
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

        this.authService.resetPassword(requestData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Passwort erfolgreich zurückgesetzt! Sie werden gleich zum Login weitergeleitet...';
        this.newPassword = '';
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'Fehler beim Zurücksetzen des Passworts.';
        
        this.cdr.detectChanges();
      }
    });
  }
}
