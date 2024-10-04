import { AuthService } from './../../auth/services/login-service.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile-servide.service';
import { RegisterData } from '../interfaces/user-register.interface';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
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
  selectedFile: File | null = null;
  userPhotoUrl: string | undefined;
  userId = this.authService.getUserId();

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private toast: ToastrService,
    private rout: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.loadUserPhoto();
  }

  getUser() {

    const userId = this.authService.getUserId();
    if (userId) {
      this.profileService.getUserInfo(userId)
        .subscribe({
          next: (data) => {
            this.user = data;
          },
          error: (error) => {
            this.toast.error('No se pudo cargar el perfil', 'Error', error)
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
      console.log('metodo de subir foto')
      this.profileService.uploadPhoto(formData, userId)
        .subscribe({
          next: () => {
            console.log('la foto ya fue cargada, uploadFoto method')
            this.toast.success('Fotografía cargada exitosamente', 'Éxito');
          },
          error: (message) => {
            this.toast.error('La fotografía no fue cargada', 'Error');
          }
        });
    }
  }

  loadUserPhoto(): void {
    console.log('fuera del if')
    if(this.userId){
    this.profileService.getUserPhoto(this.userId).subscribe({
      next: (blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.userPhotoUrl = objectUrl;
      },
      error: (err) => {
        console.error('Error al cargar la imagen del usuario', err);
      }
    });
  }
  }


}
