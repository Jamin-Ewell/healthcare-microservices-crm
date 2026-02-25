import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();

  const cloned = req.clone({
    setHeaders: token
      ? { Authorization: `Bearer ${token}` }
      : {},
    withCredentials: true
  });

  return next(cloned);
};
