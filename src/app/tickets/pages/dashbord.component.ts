import { ticket } from './../../tickets-user/interfaces/ticket-interface';
import { dashBoardService } from './../services/dash-service.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class TicketDashbordComponent implements OnInit {


  //Variables y arrays
  ticketCounts: any = { abiertos: 0, enProceso: 0, cerrados: 0 };
  allTickets: ticket[] = [];
  p: number = 1;
  filteredTickets: ticket[] = []; // Array para tickets filtrados
  searchTerm: string = ''; // Término de búsqueda

  constructor(
    private dashService: dashBoardService,
    private toast: ToastrService) { }


  //Metodo ngOnInit
  ngOnInit(): void {

    this.getTicketsCount();
    this.getAllTickets();
    console.log('desde el ngOnInit jajaja', this.getAllTickets())
  }

  //Metodo para obtener los contadores de tickets
  getTicketsCount(): void {
    this.dashService.getTicketsCount()
      .subscribe({
        next: (data) => {
          this.ticketCounts = data;
        },
        error: (error) => {
          this.toast.error('Erro al traer los contadores de tickets', error)
        }
      })
  }

  //Metodo para obtener todos los tickets
  getAllTickets(): void {
    this.dashService.getAllTickets()
      .subscribe({
        next: (data: ticket[]) => {
          this.allTickets = data.map(ticket => ({
            ...ticket,
            CreatedAt: ticket.CreatedAt ? new Date(ticket.CreatedAt) : undefined,
            status: ticket.status ?? 'Cerrado'
          })).sort((a, b) => {

            const priorityOrder = ['Abierto', 'En Proceso', 'Cerrado'];
            return priorityOrder.indexOf(a.status) - priorityOrder.indexOf(b.status);
          });
          this.filteredTickets = [...this.allTickets];
          this.allTickets.forEach(ticket => {
            if (ticket.userId) {
              this.getUserName(ticket.userId);
            }
          })
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
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al actualizar el estado del ticket', error);
      }
    );
  }


  //Metodo para obtener el nombre del usuario correspondiente al ticket
  getUserName(userId: string): void {
    this.dashService.getUserById(userId)
      .subscribe({
        next: (user: any) => {
          const ticketToUpdate = this.allTickets.find(ticket => ticket.userId === userId);
          if (ticketToUpdate) {
            ticketToUpdate.userId = user.name;
          }
        },
        error: (error) => {
          this.toast.error('Error al obtener el nombre del usuario', error);
        }
      });
  }

  // Método para filtrar tickets
  filterTickets(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredTickets = this.allTickets.filter(ticket =>
      this.searchTerm.trim() === ' ' ||
      ticket.userId?.toLowerCase().includes(searchTermLower) ||
      ticket.description?.toLowerCase().includes(searchTermLower) ||
      console.log(this.filteredTickets, 'Estos son los tickets filtrados')
    );
  }

}
