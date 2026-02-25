import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor'; // ✅ ADD THIS

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    )
  ]
};
