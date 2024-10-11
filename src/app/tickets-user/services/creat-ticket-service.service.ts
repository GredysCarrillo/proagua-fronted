import { environment } from './../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ticket } from '../interfaces/ticket-interface';

@Injectable({
  providedIn: 'root'
})
export class CreatTicketServiceService {

  private readonly url = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  ccreateTicket(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.url}/data-tickets/create-ticket`, formData).pipe(
      catchError((error) => {
        console.error('Error creating ticket:', error);
        return throwError(error);
      })
    );
  }



  getTickets(userId:string):Observable<ticket[]>{
    return this.http.get<ticket[]>(`${this.url}/data-tickets/user/${userId}`)
  }


}
