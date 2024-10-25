import { Component } from '@angular/core';
import { AuthService } from '../../services/login-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.css'
})
export class RecoveryPasswordComponent {
  recoveryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private authServide: AuthService, // Inyección del servicio
    private route: Router
  ) {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.recoveryForm.valid) {
      const email = this.recoveryForm.value.email;
      this.authServide.sendRecoveryEmail(email).subscribe({
        next: () => {
          this.toast.success('Se ha enviado un correo de recuperación a ' + email);
          this.recoveryForm.reset(); // Restablecer el formulario
          this.route.navigateByUrl('/login')
        },
        error: (error: any) => {
          this.toast.error('Error al enviar el correo de recuperación. Intente de nuevo.');
          console.error('Error:', error);
          console.error('Error al recuperar la contraseña', error);
        }
      });
    } else {
      this.toast.error('Por favor, ingresa un correo válido');
    }
  }
}
