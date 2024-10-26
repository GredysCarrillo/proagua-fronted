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
    private authService: AuthService,
    private toastr: ToastrService,
    private route: Router) {


    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      dpi: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  async onSubmit() {
    if (this.recoveryForm.invalid) {
      return;
    }

    const { email, dpi } = this.recoveryForm.value;

    this.authService.sendRecoveryEmail(email, dpi).subscribe(
      response => {
        if (response && response.message === 'Correo enviado con éxito') {
          this.toastr.success('Se ha enviado un correo con la nueva contraseña.');
          this.route.navigate(['/login']);
        } else {
          this.toastr.error('Hubo un problema al enviar el correo.');
        }
      },
      error => {
        this.toastr.error('Error al intentar recuperar la contraseña. Por favor, verifica tus datos.');
      }
    );

  }
}
