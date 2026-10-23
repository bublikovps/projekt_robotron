import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

import { CategoryService }
from '../../../features/business-management/categories/services/category.service';

import { CategoryResponse }
from '../../../features/business-management/categories/models/category-response.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent
  implements OnInit {

  categories: CategoryResponse[] = [];

  isMobileMenuOpen = false;

  isUserMenuOpen = false;

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {

    this.loadCategories();

  }

  private loadCategories(): void {

    this.categoryService
      .getAllCategories()
      .subscribe({

        next: (data) => {

          this.categories = data;

        },

        error: (err) => {

          console.error(
            'Fehler beim Laden der Kategorien',
            err
          );

        }

      });

  }

  toggleMobileMenu(): void {

    this.isMobileMenuOpen =
      !this.isMobileMenuOpen;

  }

  toggleUserMenu(): void {

    this.isUserMenuOpen =
      !this.isUserMenuOpen;

  }

  isLoggedIn(): boolean {

    return (
      sessionStorage.getItem(
        'jwtToken'
      ) !== null
    );

  }

  getUsername(): string {

    const userJson =
      sessionStorage.getItem(
        'currentUser'
      );

    if (userJson) {

      const user =
        JSON.parse(userJson);

      return user.login;

    }

    return '';

  }

  hasRole(
    role: string
  ): boolean {

    return (
      sessionStorage.getItem(
        'userRole'
      ) === role
    );

  }

  getRoleDisplayName(): string {

    const role =
      sessionStorage.getItem(
        'userRole'
      );

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

  isPasswordChangeRequired(): boolean {

    return (
      sessionStorage.getItem(
        'passwordChangeRequired'
      ) === 'true'
    );

  }

  onLogout(): void {

    this.isMobileMenuOpen = false;

    this.isUserMenuOpen = false;

    sessionStorage.removeItem(
      'currentUser'
    );

    sessionStorage.removeItem(
      'userRole'
    );

    sessionStorage.removeItem(
      'jwtToken'
    );

    sessionStorage.removeItem(
      'passwordChangeRequired'
    );

    this.router.navigate([
      '/login'
    ]);

  }

}