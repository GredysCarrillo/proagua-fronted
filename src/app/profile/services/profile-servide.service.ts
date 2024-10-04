import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { RegisterData } from '../interfaces/user-register.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { photoUpdate } from '../interfaces/photo.interface';

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

  uploadPhoto(formData: FormData, userId: string): Observable<any> {
    console.log("Este es el formDAta", formData);
    return this.http.put(`${this.baseUrl}/auth/uploadPhoto/${userId}`, formData);
  }

  getUserPhoto(userId: string): Observable<Blob> {
    const url = `${this.baseUrl}/auth/photo/${userId}`;
    return this.http.get(url, { responseType: 'blob' });
  }



}

