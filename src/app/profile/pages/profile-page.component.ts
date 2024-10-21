import { AuthService } from './../../auth/services/login-service.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile-servide.service';
import { RegisterData } from '../interfaces/user-register.interface';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})


export class ProfilePageComponent implements OnInit {

  user: RegisterData | null = null;
  selectedFile: File | undefined;
  userPhotoUrl: string | undefined;
  userId = this.authService.getUserId();
  servicio: any = {};

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private toast: ToastrService,
    private rout: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.loadUserPhoto();
    this.loadServicio();
  }

  myForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  getUser() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.profileService.getUserInfo(userId)
        .subscribe({
          next: (data) => {
            this.user = data;
          },
          error: (error) => {
            this.toast.error('No se pudo cargar el perfil', 'Error')
          }
        })
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }


  // Método para subir la fotografía
  uploadPhoto(): void {
    const userId = this.authService.getUserId();
    if (this.selectedFile && userId) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.profileService.uploadPhoto(formData, userId)
        .subscribe({
          next: () => {
            this.toast.success('Fotografía cargada exitosamente', 'Éxito');
            location.reload();
            this.rout.navigateByUrl('/profile')
          },
          error: (message) => {
            this.toast.error('La fotografía no fue cargada', 'Error');
          }
        });
    }
  }

  loadUserPhoto(): void {
    if (this.userId) {
      this.profileService.getUserPhoto(this.userId).subscribe({
        next: (blob) => {
          const objectUrl = URL.createObjectURL(blob);
          this.userPhotoUrl = objectUrl;
        },
        error: (err) => {
          this.toast.error('Error','Error al cargar la imagen del usuario');
        }
      });
    }
  }

  // Método para enviar el cambio de contraseña
  onSubmit() {
    if (this.myForm.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.myForm.value;

      if (newPassword !== confirmPassword) {
        this.toast.error('Error','Las nuevas contraseñas no coinciden');
        return;
      }

      const userId = this.authService.getUserId();
      if (userId && currentPassword && newPassword && confirmPassword) {// Obtén el ID del usuario autenticado
        this.profileService.changePassword(userId, currentPassword, newPassword, confirmPassword).subscribe({
          next: () => {
            this.toast.success('Contraseña cambiada exitosamente');
            this.myForm.reset();
          },
          error: (err) => {
            this.toast.error('Error al cambiar la contraseña: ' + err.message);
          },
        });
      }
    } else {
      this.toast.warning('Por favor, completa todos los campos correctamente.');
    }
  }

  loadServicio() {
    let id = this.authService.getUserId();
    if (id) {
      this.profileService.getServicioById(id)
        .subscribe({
          next: (data) => {
            this.servicio = data;
          },
          error: (err) => {
            this.toast.error('Error', 'El servicio no se pudo cargar');
          }
        })
    }
  }

}
