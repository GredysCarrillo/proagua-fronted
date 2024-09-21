import { ticket } from './../../tickets-user/interfaces/ticket-interface';
import { map } from 'rxjs';
import { dashBoardService } from './../services/dash-service.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class TicketDashbordComponent implements OnInit {

  ticketCounts: any = { abiertos: 0, enProceso: 0, cerrados: 0 };
  allTickets: ticket[] = [];
  p: number = 1; // Página actual
  searchTerm: string = '';
  filteredUsers: any[] = [];
  users: any[] = [];

  constructor(
    private dashService: dashBoardService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.getTicketsCount();
    this.getAllTickets();
  }

  getTicketsCount(): void {
    this.dashService.getTicketsCount()
      .subscribe({
        next: (data) => {
          console.log('data de los contadores', { data })
          this.ticketCounts = data;
        },
        error: (error) => {
          this.toast.error('Erro al traer los contadores de tickets', error)
        }
      })
  }

  getAllTickets(): void {
    this.dashService.getAllTickets()
      .subscribe({
        next: (data: ticket[]) => {
          console.log('datos de los tickets', { data });

          // Mapeamos y ordenamos los tickets
          this.allTickets = data.map(ticket => ({
            ...ticket,
            CreatedAt: ticket.CreatedAt ? new Date(ticket.CreatedAt) : undefined,
            status: ticket.status ?? 'Cerrado' // Proporcionamos un valor por defecto para 'status'
          })).sort((a, b) => {
            // Priorizar tickets en estado 'Abierto' y 'En Proceso'
            const priorityOrder = ['Abierto', 'En Proceso', 'Cerrado'];

            return priorityOrder.indexOf(a.status) - priorityOrder.indexOf(b.status);
          });
        },
        error: (error) => {
          this.toast.error('Error al cargar los tickets', error);
        }
      });
  }


  // Método para cambiar el estado del ticket
  changeTicketStatus(ticketId: string, newStatus: string): void {
    this.dashService.updateTicketStatus(ticketId, newStatus).subscribe(
      (response) => {
        console.log('Estado actualizado:', response);
        // Actualizar la lista de tickets después de cambiar el estado
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al actualizar el estado del ticket', error);
      }
    );
  }

  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filterUsers(): void {
    const normalizedSearchTerm = this.normalizeString(this.searchTerm);

    if (normalizedSearchTerm.trim() === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user =>
        this.normalizeString(user.name).toLowerCase().includes(normalizedSearchTerm.toLowerCase())
      );
    }
  }


}
