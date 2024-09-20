import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { RegisterData } from '../interfaces/user-register.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getUserInfo(userId: string): Observable<RegisterData> {
    return this.http.get<RegisterData>(`${this.baseUrl}/auth/me/${userId}`)
  }



}

