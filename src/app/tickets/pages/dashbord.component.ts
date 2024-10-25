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
  selectedTicket: ticket | null = null;

  constructor(
    private dashService: dashBoardService,
    private toast: ToastrService) { }


  //Metodo ngOnInit
  ngOnInit(): void {
    console.log('tickets', this.allTickets),
    console.log('filtered tickets', this.filteredTickets),
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

 // Método para obtener todos los tickets
getAllTickets(): void {
  this.dashService.getAllTickets()
    .subscribe({
      next: (data: ticket[]) => {
        this.allTickets = data.map(ticket => {
          // Comprobamos si hay una imagen y es un array
          if (ticket.image && Array.isArray(ticket.image.data)) {
            // Convertimos el array de números en un Blob
            const byteArray = new Uint8Array(ticket.image.data);
            const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Asegúrate de que el tipo sea correcto
            const imageUrl = URL.createObjectURL(blob); // Creamos la URL temporal del blob

            return {
              ...ticket,
              CreatedAt: ticket.CreatedAt ? new Date(ticket.CreatedAt) : undefined,
              status: ticket.status ?? 'Cerrado',
              imagenUrl: imageUrl // Asignamos la URL temporal a `imagenUrl`
            };
          }
          return {
            ...ticket,
            CreatedAt: ticket.CreatedAt ? new Date(ticket.CreatedAt) : undefined,
            status: ticket.status ?? 'Cerrado',
            imagenUrl: null // No hay imagen, asignamos null
          };
        }).sort((a, b) => {
          const priorityOrder = ['Abierto', 'En Proceso', 'Cerrado'];
          return priorityOrder.indexOf(a.status) - priorityOrder.indexOf(b.status);
        });

        console.log('Tickets asignados:', this.allTickets); // Verificar contenido aquí
        this.filteredTickets = [...this.allTickets];
        this.allTickets.forEach(ticket => {
          if (ticket.userId) {
            this.getUserName(ticket.userId);
          }
        });
      },
      error: (error) => {
        this.toast.error('Error al cargar los tickets', error);
      }
    });
}


  clic(){
    console.log('clic en el boton')
    console.log(this.selectedTicket)
  }

  // Método para cambiar el estado del ticket
  changeTicketStatus(ticketId: string, newStatus: string) {
    console.log(`intentando cambiar el ticket idno. ${ticketId}`)
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


  showDetails(ticket: ticket) {
    this.selectedTicket = ticket;
  }

}
