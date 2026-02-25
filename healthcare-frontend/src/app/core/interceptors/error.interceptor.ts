import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        console.error("Unauthorized");
      }
      return throwError(() => error);
    })
  );
};
