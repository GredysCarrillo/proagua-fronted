import { AuthService } from './../auth/services/login-service.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebaService } from './services/sideba.service';
import { ProfileService } from '../profile/services/profile-servide.service';


interface MenuItem {
  name: string;
  icon: string;
  route: string;
  rolesAllowed: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  @Input() isSidebarCollapsed = false;
  @Output()toggleSidebar = new EventEmitter<boolean>();

  userRole: string = 'user';
  userId = this.authService.getUserId();
  userPhotoUrl: string | undefined;
  userName = this.getUserName();
  userRol = this.getUserRol();

  constructor(
    private sidebarService: SidebaService,
    private profileService: ProfileService,
    private authService: AuthService,
  ) { }


  ngOnInit(): void {
    this.userRole = this.sidebarService.getUserRole();
    this.items;
    this.loadUserPhoto();
  }

  onToggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.toggleSidebar.emit(this.isSidebarCollapsed);  // Emite el estado si es necesario
  }

  items: MenuItem[] = [

    { name: 'Dashboard', icon: 'bi bi-speedometer2', route: '/dashboard', rolesAllowed: ['admin'] },
    { name: 'Registro', icon: 'bi bi-person-plus', route: '/registrar', rolesAllowed: ['admin'] },
    { name: 'Reportes', icon: 'bi bi-file-earmark-text', route: '/dashboard-tickets', rolesAllowed: ['admin'] },
    { name: 'Perfil', icon: 'bi bi-person-bounding-box', route: '/profile', rolesAllowed: ['user', 'admin'] },
    { name: 'Crear Reporte', icon: 'bi bi-folder-plus', route: '/create-ticket', rolesAllowed: ['user'] },
    { name: 'Informacion', icon: 'bi bi-info-circle', route: '/informacion', rolesAllowed: ['user'] },
  ];

  loadUserPhoto(): void {
    if(this.userId){
    this.profileService.getUserPhoto(this.userId).subscribe({
      next: (blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.userPhotoUrl = objectUrl;
      },
      error: (err) => {
        console.error('Error al cargar la imagen del usuario en el sidebar', err);
      }
    });
  }
  }

  getUserName(){
    this.authService.getname();
  }

  getUserRol(){
    this.authService.getRol();
  }

}
