import { Injectable } from '@angular/core';

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
