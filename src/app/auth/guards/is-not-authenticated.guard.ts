import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/login-service.service';
import { AuthStatus } from '../interfaces/auth-status.enum';

export const isNotAuthenticatedGuard: CanActivateFn = (_route, _state) => {


  const authService = inject(AuthService);
  const router      = inject(Router);


  if(authService.authStatus()=== AuthStatus.authenticated){
    router.navigateByUrl(authService.getRol() == 'admin'? '/dashboard' : '/profile');
    return false;
  }

  return true;
};
