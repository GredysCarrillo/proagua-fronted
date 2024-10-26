import { ticket } from './../../tickets-user/interfaces/ticket-interface';
import { dashBoardService } from './../services/dash-service.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class TicketDashbordComponent implements OnInit {

  ticketCounts: any = { abiertos: 0, enProceso: 0, cerrados: 0 };
  allTickets: ticket[] = [];
  p: number = 1;
  filteredTickets: ticket[] = [];
  searchTerm: string = '';
  selectedTicket: ticket | null = null;

  constructor(
    private dashService: dashBoardService,
    private toast: ToastrService) { }


  ngOnInit(): void {
      this.getTicketsCount();
    this.getAllTickets();
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
            if (ticket.image && Array.isArray(ticket.image.data)) {
              const byteArray = new Uint8Array(ticket.image.data);
              const blob = new Blob([byteArray], { type: 'image/jpeg' });
              const imageUrl = URL.createObjectURL(blob);

              return {
                ...ticket,
                CreatedAt: ticket.CreatedAt ? new Date(ticket.CreatedAt) : undefined,
                status: ticket.status ?? 'Cerrado',
                imagenUrl: imageUrl
              };
            }
            return {
              ...ticket,
              CreatedAt: ticket.CreatedAt ? new Date(ticket.CreatedAt) : undefined,
              status: ticket.status ?? 'Cerrado',
              imagenUrl: null
            };
          }).sort((a, b) => {
            const priorityOrder = ['Abierto', 'En Proceso', 'Cerrado'];
            return priorityOrder.indexOf(a.status) - priorityOrder.indexOf(b.status);
          });
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


  // Método para cambiar el estado del ticket
  changeTicketStatus(ticketId: string, newStatus: string) {
    this.dashService.updateTicketStatus(ticketId, newStatus).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (error) => {
        this.toast.error('Error al actualizar el estado del ticket');
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
      this.searchTerm.trim() === '' ||
      ticket.userId?.toLowerCase().includes(searchTermLower) ||
      ticket.description?.toLowerCase().includes(searchTermLower)
    );
  }


  showDetails(ticket: ticket) {
    this.selectedTicket = ticket;
  }


  generatePDF(ticket: any): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Detalles del Reporte', 10, 10);

    // Crear tabla
    const startY = 30;
    const rowHeight = 10;
    const columnWidth = 95;

    // Encabezados
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(0, 51, 102);
    doc.rect(10, startY, 190, rowHeight, 'F');
    doc.text('Campo', 12, startY + 7);
    doc.text('Valor', 150, startY + 7, { align: 'right' });

    // Datos
    doc.setTextColor(0);
    const data = [
      { field: 'ID del Ticket', value: ticket._id || 'N/A' },
      { field: 'Usuario', value: ticket.userId || 'N/A' },
      { field: 'Descripción', value: ticket.description || 'N/A' },
      { field: 'Estado', value: ticket.status || 'N/A' },
      { field: 'Fecha de Creación', value: ticket.CreatedAt ? new Date(ticket.CreatedAt).toLocaleDateString() : 'N/A' },
    ];

    // Ajuste para mover los datos hacia abajo
    const offsetY = 5;
    data.forEach((item, index) => {
      const yPosition = startY + (index + 1) * rowHeight + offsetY;
      doc.text(item.field, 12, yPosition);
      doc.text(item.value, 150, yPosition, { align: 'right' });

      // Dibuja las líneas de la tabla
      doc.line(10, yPosition + 1, 200, yPosition + 1);
    });

    // Dibuja la línea final de la tabla
    doc.line(10, startY + data.length * rowHeight + offsetY + 1, 200, startY + data.length * rowHeight + offsetY + 1);

    // Agregar una línea de espacio
    doc.text('', 10, startY + (data.length + 1) * rowHeight + offsetY + 5);

    // Agregar imagen si existe
    if (ticket.imagenUrl) {
      const img = new Image();
      img.src = ticket.imagenUrl;
      img.onload = () => {
        const imgWidth = 180;
        const imgHeight = (img.height * imgWidth) / img.width;
        doc.addImage(img, 'JPEG', 10, startY + (data.length + 2) * rowHeight + offsetY + 10, imgWidth, imgHeight);
        doc.save(`Ticket_${ticket._id}.pdf`);
      };
    } else {
      doc.save(`Ticket_${ticket._id}.pdf`);
    }
  }

}

