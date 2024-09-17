import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { userResponse } from '../interfaces/user-dash-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashServiceService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,


  ) { }

  getUsers():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/auth/users`)
  }

  getActiveTickes(): Observable<any>{
    return this.http.get(`${this.baseUrl}/data-tickets/count-active-ticket`)
  }
}
