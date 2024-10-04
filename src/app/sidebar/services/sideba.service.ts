import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProfileService } from '../../profile/services/profile-servide.service';

@Injectable({
  providedIn: 'root'
})
export class SidebaService {

  constructor() {
  }


  getUserRole(): string {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      // Si localStorage está disponible, obtenemos el rol
      const userRole = localStorage.getItem('rol');
      console.log(userRole, 'este es')
      return userRole ? userRole : 'user';
    } else {
      // Si estamos en el servidor (SSR) o localStorage no está disponible
      return 'NaN';
    }
  }





}
