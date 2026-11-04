import {
  inject,
  PLATFORM_ID
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  map,
  catchError,
  of
} from 'rxjs';

import { AuthService }
from '../services/auth.service';

export const roleGuard:
CanActivateFn = (route, state) => {

  const router =
    inject(Router);

  const authService =
    inject(AuthService);

  const platformId =
    inject(PLATFORM_ID);

  if (
    !isPlatformBrowser(
      platformId
    )
  ) {

    return true;
  }

  const expectedRoles =
    route.data[
      'expectedRoles'
    ] as string[];

  const currentUser =
    authService.getCurrentUserValue();

  /**
   * Уже есть пользователь в памяти
   */
  if (currentUser) {

    if (
      expectedRoles?.includes(
        currentUser.role
      )
    ) {

      return true;
    }

    console.warn(
      `[ROLE GUARD DENIED] Access blocked for role [${currentUser.role}] to: ${state.url}`
    );

    router.navigate(['/']);

    return false;
  }

  /**
   * Пользователь ещё не загружен.
   * Загружаем через /api/auth/me.
   */
  return authService
    .getCurrentUser()
    .pipe(

      map(user => {

        if (!user) {

          router.navigate(['/']);

          return false;
        }

        if (
          expectedRoles?.includes(
            user.role
          )
        ) {

          return true;
        }

        console.warn(
          `[ROLE GUARD DENIED] Access blocked for role [${user.role}] to: ${state.url}`
        );

        router.navigate(['/']);

        return false;
      }),

      catchError(() => {

        console.warn(
          `[ROLE GUARD DENIED] Guest access blocked to: ${state.url}`
        );

        router.navigate(['/']);

        return of(false);
      })
    );
};