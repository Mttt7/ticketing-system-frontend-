import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/api/auth.service";
import {catchError, map, of} from "rxjs";
import {toast} from "ngx-sonner";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validateJwtToken().pipe(
    map((response) => {
      if (response.valid) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError((error) => {
      toast.info('Your session has expired. Please log in again.');
      router.navigate(['/login']);
      return of(false);
    })
  );
};
