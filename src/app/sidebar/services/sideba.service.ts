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
      const userRole = localStorage.getItem('rol');
      return userRole ? userRole : 'user';
    } else {
      return 'NaN';
    }
  }





}
