import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { MarkdownModule, MARKED_OPTIONS } from 'ngx-markdown';
import { authInterceptor } from './interceptor/auth.interceptor';
import { AuthService } from './service/auth.service';

// Define the marked options factory
const markedOptionsFactory = () => {
  return {
    gfm: true,
    breaks: true,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors(
      [
        (req, next) => {
          const authService = inject(AuthService);
          return authInterceptor(authService)(req, next);
        }
      ])),
    provideServiceWorker(
      'ngsw-worker.js',
      {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
      }
    ),
    importProvidersFrom(
      MarkdownModule.forRoot({
        markedOptions: {
          provide: MARKED_OPTIONS,
          useFactory: markedOptionsFactory
        }
      })
    )
  ]
};
