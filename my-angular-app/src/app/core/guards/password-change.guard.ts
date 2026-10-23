import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const passwordChangeGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const passwordChangeRequired =
    sessionStorage.getItem('passwordChangeRequired');

  // Если флаг установлен и пользователь пытается открыть
  // что-либо кроме профиля
  if (passwordChangeRequired === 'true') {

    console.warn(
      `[PASSWORD GUARD] Zugriff blockiert. Passwortänderung erforderlich. Ziel: ${state.url}`
    );

    router.navigate(['/profile']);
    return false;
  }

  return true;
};
