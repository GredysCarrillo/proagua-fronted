import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/login-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterInterface } from '../../interfaces/user-register.interface';


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
    name: ['Anner Ronaldo Escobar Cruz', [Validators.required]],
    dpi: ['3423354132206', [Validators.required, Validators.minLength(13)]],
    email: ['anner123escobar@gmail.com', [Validators.required, Validators.email]],
    phoneNumber: ['41284104', [Validators.required, Validators.minLength(8)]],
    colonia: ['1', [Validators.required]],
    serviceType: ['1', [Validators.required]],
    address: ['5ta Avenida 10-28, zona 1', [Validators.required]]
  });

  deptos = [
    "Colonia Los Angeles",
    "Colonia La Reforma",
    "Colonia San Francisco",
    "Colonia La Libertad",
    "Colonia Santa María",
    "Colonia Los Jocotes",
    "Colonia El Trapiche",
    "Colonia Los Rosales",
    "Colonia El Pedregal",
    "Colonia El Mirador",
  ]

  onSubmit() {
    const _id = this.authService.getUserId();
    const { name, dpi, email, phoneNumber, colonia, serviceType, address } = this.myForm.value;

    const body: RegisterInterface = {_id, dpi, email, name, phoneNumber, colonia, serviceType, address};

    console.log({body});
    this.authService.register(body)
    .subscribe({
      next: () => this.route.navigateByUrl('/dashboard'),
      error: (message) =>{
        this.toastr.error(message, 'Error')
      }
    })
  }

}
