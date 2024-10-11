import { AuthService } from './../../auth/services/login-service.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreatTicketServiceService } from '../services/creat-ticket-service.service';
import { ticket } from '../interfaces/ticket-interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.css'
})
export class CreateTicketComponent implements OnInit {

  @ViewChild('ticketModal') ticketModal: ElementRef | undefined;

  tickets: ticket[] = [];
  selectedTicket: ticket | null = null;
  selectedImage: File | null = null;
  p: number = 1; // Página actual

  constructor(
    private fb: FormBuilder,
    private ticketService: CreatTicketServiceService,
    private toast: ToastrService,
    private route: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  myForm = this.fb.group({
    problemType: ['1', [Validators.required]],
    description: ['Mi problema es con el agua', [Validators.required]],
    photo: [null]
  })

// Actualiza el método onFileChange
onFileChange(event: any): void {
  if (event.target.files.length > 0) {
    this.selectedImage = event.target.files[0];
  }
}


  createTicket() {
    if (this.myForm.invalid) {
      this.toast.error('Por favor, completa todos los campos', 'Error');
      return;
    }

    const status = 'Abierto';
    const userId = this.authService.getUserId();
    const CreatedAt = new Date();
    const { problemType, description, photo } = this.myForm.value;

    // Crear un FormData para enviar datos del formulario y archivo
    const formData = new FormData();

    // Solo agregamos valores si no son null o undefined
    if (problemType) formData.append('problemType', problemType);
    if (description) formData.append('description', description);
    if (status) formData.append('status', status);
    if (userId) formData.append('userId', userId);
    if (CreatedAt) formData.append('CreatedAt', CreatedAt.toISOString());

    // Si hay un archivo seleccionado, lo agregamos a formData
  if (this.selectedImage) {
      formData.append('photo', this.selectedImage, this.selectedImage.name);
    }

    this.ticketService.ccreateTicket(formData).subscribe({
      next: () => {
        this.toast.success('Ticket creado correctamente', 'Registro');
        this.route.navigateByUrl('/information');
      },
      error: (message) => {
        console.log(message);
        this.toast.error('No se creó el ticket', 'Error');
      }
    });
  }


  loadTickets(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.ticketService.getTickets(userId).subscribe({
        next: (data: ticket[]) => {
          console.log('Datos recibidos del backend:', data); // Verifica qué datos llegan desde el backend
          this.tickets = data.map(ticket => {
            if (ticket.image && Array.isArray(ticket.image.data)) {
              // Convertimos el array de números en un Blob
              const byteArray = new Uint8Array(ticket.image.data);
              const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Asegúrate de que el tipo sea correcto
              const imageUrl = URL.createObjectURL(blob); // Creamos la URL temporal del blob

              return {
                ...ticket,
                imagenUrl: imageUrl // Asignamos la URL temporal a `imagenUrl`
              };
            }
            return ticket; // Si no hay imagen, devolvemos el ticket sin modificar
          });

          console.log('Tickets procesados:', this.tickets); // Verifica qué tickets están siendo asignados
        },
        error: (error) => {
          console.log(error);
          this.toast.error('Error al obtener los tickets', error);
        }
      });
    } else {
      this.toast.error('El userId no se pudo obtener');
    }
  }




   showDetails(ticket: ticket) {
    this.selectedTicket = ticket;
  }




}
