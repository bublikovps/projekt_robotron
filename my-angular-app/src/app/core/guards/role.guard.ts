import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // 1. Вытаскиваем цифровой паспорт и роль текущей сессии
  const token = sessionStorage.getItem('jwtToken');
  const userRole = sessionStorage.getItem('userRole');

  // 2. Считываем массив ролей, которым разрешен доступ на эту страницу
  const expectedRoles = route.data['expectedRoles'] as Array<string>;

  // 3. Проверяем валидность сессии и вхождение роли в белый список
  if (token && userRole && expectedRoles && expectedRoles.includes(userRole)) {
    console.log(`[ROLE GUARD] Доступ разрешен для ${userRole} на адрес: ${state.url}`);
    return true; // Пропускаем пользователя на страницу!
  }

  // 4. Если токена нет или роль "чужая" — блокируем переход и выкидываем на главную
  console.warn(`[ROLE GUARD БЛОКИРОВКА] Доступ запрещен для роли [${userRole || 'Гость'}] на адрес: ${state.url}`);
  router.navigate(['/']);
  return false; // Отменяем рендеринг страницы
};
