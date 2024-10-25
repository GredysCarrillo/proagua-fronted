import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/login-service.service';
import { AuthStatus } from '../interfaces/auth-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router      = inject(Router);
console.log('en el isAuthenticatedGuard')
  if(authService.authStatus()=== AuthStatus.authenticated) return true;
  router.navigateByUrl('/auth/login')
  return false;
};
