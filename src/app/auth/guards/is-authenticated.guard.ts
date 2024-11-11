import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';
import { environment } from 'src/environments/environment';

export const isAuthenticatedGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!environment.production) {
    return true;
  }

  if (authService.authStatus() === AuthStatus.checking) {
    return false;
  }

  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  router.navigateByUrl('/dashboard');
  return false;
};
