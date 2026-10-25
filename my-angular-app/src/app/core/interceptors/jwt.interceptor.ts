import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * HTTP-Interceptor zur automatischen Beifuegung des JWT-Tokens.
 * Entspricht dem IHK-Standard fuer gesicherte REST-Anfragen.
 */
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  // Stellt sicher, что der Code nur im Client-Browser und nicht waehrend des SSR-Serverseitigen Renderings ausgefuehrt wird.
  if (isPlatformBrowser(platformId)) {
    // 1. JWT-Token aus dem SessionStorage des Browsers auslesen
    const token = sessionStorage.getItem('jwtToken');

    // 2. Wenn das Token existiert, den Request klonen und den Authorization-Header anfuegen
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(`[HTTP INTERCEPTOR] Token erfolgreich an Request angehaengt: ${req.url}`);
      return next(clonedRequest); // Modifizierten Request weiterleiten
    }
  }

  // Wenn kein Token vorhanden ist oder SSR aktiv ist, den Request unveraendert weiterleiten
  return next(req);
};
