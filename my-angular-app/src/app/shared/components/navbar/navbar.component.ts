import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../../features/business-management/categories/services/category.service';
import { CategoryResponse } from '../../../features/business-management/categories/models/category-response.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  categories: CategoryResponse[] = [];
  isMobileMenuOpen = false;
  isUserMenuOpen = false;

  // Injiziert PLATFORM_ID, um zwischen Browser- und SSR-Server-Umgebung zu unterscheiden
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    // Kategorien nur im Browser laden, um unnoetige API-Aufrufe waehrend des Server-Side-Renderings zu vermeiden
    if (isPlatformBrowser(this.platformId)) {
      this.loadCategories();
    }
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Fehler beim Laden der Kategorien', err);
      },
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('jwtToken') !== null;
    }
    return false;
  }

  getUsername(): string {
    if (isPlatformBrowser(this.platformId)) {
      const userJson = sessionStorage.getItem('currentUser');
      if (userJson) {
        const user = JSON.parse(userJson);
        return user.login;
      }
    }
    return '';
  }

  hasRole(role: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('userRole') === role;
    }
    return false;
  }

  getRoleDisplayName(): string {
    if (isPlatformBrowser(this.platformId)) {
      const role = sessionStorage.getItem('userRole');
      switch (role) {
        case 'ROLE_DIRECTOR':
          return 'Director';
        case 'ROLE_ADMIN':
          return 'Administrator';
        case 'ROLE_MANAGER':
          return 'Lagerverwalter';
        case 'ROLE_CUSTOMER':
          return 'Kunde';
        default:
          return 'Benutzer';
      }
    }
    return 'Benutzer';
  }

  isPasswordChangeRequired(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('passwordChangeRequired') === 'true';
    }
    return false;
  }

  onLogout(): void {
    this.isMobileMenuOpen = false;
    this.isUserMenuOpen = false;

    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('userRole');
      sessionStorage.removeItem('jwtToken');
      sessionStorage.removeItem('passwordChangeRequired');
    }
    this.router.navigate(['/login']);
  }
}
