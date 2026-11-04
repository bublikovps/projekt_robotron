import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService }
from '../services/auth.service';

export const passwordChangeGuard:
CanActivateFn =
  (route, state) => {

    const router =
      inject(Router);

    const authService =
      inject(AuthService);

    const currentUser =
      authService.getCurrentUserValue();

    if (
      currentUser?.passwordChangeRequired
    ) {

      console.warn(
        `[PASSWORD GUARD] Zugriff blockiert. Passwortänderung erforderlich. Ziel: ${state.url}`
      );

      router.navigate([
        '/profile'
      ]);

      return false;
    }

    return true;
  };