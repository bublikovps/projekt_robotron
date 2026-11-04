import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef,
  signal
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

import { CatalogService }
from '../../../features/catalog/services/catalog.service';

import { AuthService }
from '../../../core/services/auth.service';

import { CurrentUserResponse }
from '../../../core/models/current-user-response.model';

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

  private readonly router =
    inject(Router);

  private readonly catalogService =
    inject(CatalogService);

  private readonly authService =
    inject(AuthService);

  private readonly cdr =
    inject(ChangeDetectorRef);

  categories =
    this.catalogService.categories;

  currentUser =
    signal<CurrentUserResponse | null>(
      null
    );

  isMobileMenuOpen = false;

  isUserMenuOpen = false;

  isCatalogMenuOpen = false;

  ngOnInit(): void {

    this.catalogService
      .loadCategoriesIfNeeded();

    this.authService
      .currentUser$
      .subscribe(user => {

        this.currentUser.set(user);

        this.cdr.detectChanges();
      });
  }

  toggleCatalogMenu(): void {

    this.isCatalogMenuOpen =
      !this.isCatalogMenuOpen;
  }

  closeCatalogMenu(): void {

    this.isCatalogMenuOpen = false;
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

    return !!this.currentUser();
  }

  getUsername(): string {

    return this.currentUser()?.login ?? '';
  }

  hasRole(
    role: string
  ): boolean {

    return this.currentUser()?.role === role;
  }

  getRoleDisplayName(): string {

    switch (
      this.currentUser()?.role
    ) {

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

  isPasswordChangeRequired():
    boolean {

    return (
      this.currentUser()
        ?.passwordChangeRequired
      ?? false
    );
  }

  onLogout(): void {

    this.isMobileMenuOpen = false;

    this.isUserMenuOpen = false;

    this.authService
      .logoutRequest()
      .subscribe({

        next: () => {

          this.authService
            .clearCurrentUser();

          this.router.navigate([
            '/login'
          ]);
        },

        error: () => {

          this.authService
            .clearCurrentUser();

          this.router.navigate([
            '/login'
          ]);
        }
      });
  }
}