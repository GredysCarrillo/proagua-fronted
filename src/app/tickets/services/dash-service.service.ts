import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class dashBoardService {

  constructor(
    private http: HttpClient,

  ) { }

  private readonly url = environment.baseUrl;

  getTicketsCount(): Observable<any> {
    return this.http.get(`${this.url}/data-tickets/count-by-status`);
  }

  getAllTickets(): Observable<any> {
    return this.http.get(`${this.url}/data-tickets/all-tickets`)
  }

  // Método para actualizar el estado de un ticket
  updateTicketStatus(ticketId: string, newStatus: string): Observable<any> {
    return this.http.patch(`${this.url}/data-tickets/update-status/${ticketId}`, { status: newStatus });
  }

  //Traer el nombre del usuario
  getUserById(userId: string) {
    return this.http.get<any>(`${this.url}/auth/${userId}`);
  }




}
