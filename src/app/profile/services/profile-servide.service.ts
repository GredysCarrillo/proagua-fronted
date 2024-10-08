import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { RegisterData } from '../interfaces/user-register.interface';
import { HttpClient } from '@angular/common/http';

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

   // Método para cambiar la contraseña
   changePassword(userId: string, currentPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/auth/change-password/${userId}`, {
      currentPassword,
      newPassword,
      confirmPassword
    });
  }



}

