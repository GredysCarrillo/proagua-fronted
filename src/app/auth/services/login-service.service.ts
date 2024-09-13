import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { computed, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { User } from '../interfaces/user.interface';
import { checkTokenResponse } from '../interfaces/check-token.response';
import { loginResponse } from '../interfaces/login.response';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkAuthStatus().subscribe();
    }
  }


  private readonly baseUrl: string = environment.baseUrl;
  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());


  private setAuthentication(user: User, token: string): boolean {
    this._authStatus.set(AuthStatus.authenticated);
    this._currentUser.set(user);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user._id);
    return true
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  login(dpi: string, password: string): Observable<boolean> {
    return this.http.post<loginResponse>(`${this.baseUrl}/auth/login`, { dpi, password })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token,)),
        catchError(err => throwError(() => err.error.message + 'Ocurio un error')
        )
      );
  }


  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.closeSesion();
      return of(false);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<checkTokenResponse>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false)
        })
      );

    }

  closeSesion() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

}
