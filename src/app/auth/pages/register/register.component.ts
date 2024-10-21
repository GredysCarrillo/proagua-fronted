import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/login-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../interfaces/service-register.interface';
import { RegisterUser } from '../../interfaces/user-register.interface';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private toastr: ToastrService,
  ) {

  }

  myForm = this.fb.group({
    name: ['', [Validators.required]],
    dpi: ['', [Validators.required, Validators.minLength(13)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.minLength(8)]],
    Colonia: ['', [Validators.required]],
    serviceType: ['', [Validators.required]],
    Address: ['', [Validators.required, Validators.minLength(12)]]
  });

  deptos = [
    "Aldea rio la virgen",
    "Asentamiento 29 de septiembre",
    "Barrio alegre",
    "Barrio cerro colorado",
    "Barrio el chaparrón",
    "Barrio el cóndor",
    "Barrio la federal",
    "Barrio latino",
    "Caserío el Rinconcito",
    "Caserío el rodeo",
    "Caserío el salitre",
    "caserío las crucitas",
    "Caserío piedra blanca",
    "Caserío Quebrada del tejar",
    "Caserío san francisco",
    "Colonia 29 de septiembre",
    "Colonia buenos aires",
    "Colonia el manantial",
    "Colonia Jerusalém",
    "Colonia la democracia",
    "Colonia la nueva",
    "Colonia llanos de la virgen",
    "Colonia maría Eugenia",
    "Colonia Méndez Orozco",
    "Colonia san simón",
    "Colonia santa bárbara",
    "Colonia villa hermosa",
    "Finca Oasis",
    "Paraje el brujo",
    "Residenciales llanos de Jutiapa",
    "Residenciales los arcos",
  ]

  onSubmitUser() {


    if (this.myForm.invalid) {
      this.toastr.error('Error', 'Debes llenar correctamente el formulario')
    } else {
    const { name, dpi, email, phoneNumber } = this.myForm.value;
    const body: RegisterUser = { dpi, email, name, phoneNumber };
    this.authService.registerUser(body)
      .subscribe({
        next: (response) => {
          const userId = response._id;
          this.toastr.success('Usuario registrado con exito', 'Registro');
          this.onSubmitService(userId)
        },
        error: (message) => {
          this.toastr.error(message, 'Error')
        }
      })
    }
  }

  onSubmitService(_Id: string | null | undefined) {

      const { Colonia, serviceType, Address } = this.myForm.value;
      const body: RegisterService = { _Id, Address, Colonia, serviceType };
      this.authService.registerService(body)
        .subscribe({
          next: () => {
            this.toastr.success('Registro de servicio', 'Registro')
            this.route.navigateByUrl('/dashboard')
          },
          error: (message) => {
            this.toastr.error('Ocurrio un error', message)
          }
        })
    }





}
