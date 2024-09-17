import { AuthService } from './../../auth/services/login-service.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreatTicketServiceService } from '../services/creat-ticket-service.service';
import { ticket } from '../interfaces/ticket-interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.css'
})
export class CreateTicketComponent implements OnInit {

  tickets: ticket[] = [];

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
    description: ['Mi problema es con el agua', [Validators.required]]
  })

  createTicket() {
    let status = 'Enviado'
    const userId = this.authService.getUserId();
    const CreatedAt = new Date;

    const { problemType, description } = this.myForm.value;
    const body: ticket = { problemType, description, status, userId, CreatedAt }
    this.ticketService.ccreateTicket(body)
      .subscribe({
        next: () => {
          this.toast.success('Ticket creado correctamente', 'Registro'),
            this.route.navigateByUrl('/information')
        },
        error: (message) => {
          console.log(message);
          this.toast.error('No se creo el ticket', 'Error')
        }
      },
      )
  }

  loadTickets(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.ticketService.getTickets(userId)
        .subscribe({
          next: (data: ticket[]) =>{
            console.log({data});
            this.tickets = data;
          },
          error: (error)=>{
            console.log(error);
            this.toast.error('Error al obtener los tickets', error);
          }
        })
    }else{
      this.toast.error('El userId no se pudo obtener')
    }
  }


}
