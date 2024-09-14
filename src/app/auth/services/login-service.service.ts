import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { checkTokenResponse } from '../interfaces/check-token.response';
import { loginResponse } from '../interfaces/login.response';
import { isPlatformBrowser } from '@angular/common';
import { RegisterService } from '../interfaces/service-register.interface';
import { RegisterUser } from '../interfaces/user-register.interface';
import { User } from '../interfaces/user.interface';

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
        catchError(err => throwError(() => err.error.message)
        )
      );
  }

  registerUser(body: RegisterUser): Observable<RegisterUser> {
    return this.http.post<RegisterUser>(`${this.baseUrl}/auth/createUser`, body)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }

  registerService(body:RegisterService):Observable<RegisterService>{
    console.log('Datos enviados para crear el servicio:', body);
    return this.http.post<RegisterService>(`${this.baseUrl}/auth/createService`, body)
    .pipe(
      catchError(err => throwError(() => err.error.message))
    )
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
