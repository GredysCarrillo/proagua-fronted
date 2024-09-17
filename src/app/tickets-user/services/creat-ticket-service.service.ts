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

  ccreateTicket(body:ticket): Observable<any> {
    return this.http.post<any>(`${this.url}/data-tickets/create-ticket`, body).pipe(
      catchError((error) => {
        console.error('Error creating ticket:', error);
        console.log('Eror en en el servicio');
        return throwError(error);
      })
    );
  }


  getTickets(userId:string):Observable<ticket[]>{
    return this.http.get<ticket[]>(`${this.url}/data-tickets/user/${userId}`)
  }


}
