import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/login-service.service';
import { AuthStatus } from '../interfaces/auth-status.enum';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {


  const authService = inject(AuthService);
  const router      = inject(Router);

  if(authService.authStatus()=== AuthStatus.authenticated){
    console.log('redirigiendo al dashboard');
    router.navigateByUrl('/dashboard');
    return false;
  }

  return true;
};
