import {
  ApplicationConfig,
  LOCALE_ID
} from '@angular/core';

import {
  provideRouter
} from '@angular/router';

import {
  provideHttpClient,
  withInterceptors,
  withFetch
} from '@angular/common/http';

import {
  registerLocaleData
} from '@angular/common';

import localeDe
from '@angular/common/locales/de';

import {
  provideClientHydration
} from '@angular/platform-browser';

import {
  routes
} from './app.routes';

import {
  jwtInterceptor
} from './core/interceptors/jwt.interceptor';

registerLocaleData(localeDe);

export const appConfig: ApplicationConfig = {

  providers: [

    provideRouter(routes),

    provideClientHydration(),

    {
      provide: LOCALE_ID,
      useValue: 'de-DE'
    },

    provideHttpClient(
      withFetch(),
      withInterceptors([
        jwtInterceptor
      ])
    )

  ]

};