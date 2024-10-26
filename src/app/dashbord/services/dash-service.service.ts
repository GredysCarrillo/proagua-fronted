import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashServiceService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/auth/users`)
  }

  getActiveTickes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/data-tickets/count-active-ticket`)
  }

  deleteUserById(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/auth/delete/${userId}`)
  }

  updateUserStatus(userId: string, status: boolean) {
    console.log("estado que se esta enviando", status)
    return this.http.patch(`${this.baseUrl}/auth/updateStatus/${userId}`, { status })
  }
}
