import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Вытаскиваем токен из сессии браузера
  const token = sessionStorage.getItem('jwtToken');

  // 2. Если токен существует, клонируем запрос и прикрепляем заголовок Authorization
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // IHK-стандарт передачи паспорта!
      }
    });
    console.log(`[HTTP INTERCEPTOR] Токен успешно прикреплен к запросу: ${req.url}`);
    return next(clonedRequest); // Отправляем измененный запрос дальше
  }

  // Если токена нет (гость смотрит каталог), отправляем запрос как есть
  return next(req);
};
