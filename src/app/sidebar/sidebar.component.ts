import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface MenuItem {
  name: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  items: MenuItem[] = [
    { name: 'Dashboard', icon: 'bi bi-speedometer2', route: '/dashboard' },
    { name: 'Registro', icon: 'bi bi-person-plus', route: '/registrar' },
    { name: 'Reportes', icon: 'bi bi-file-earmark-text', route: '/dashboard-tickets' },
    { name: 'Perfil', icon: 'bi bi-person-bounding-box', route: '/profile' },
    { name: 'Crear Reporte', icon: 'bi bi-folder-plus', route: '/create-ticket' },
    { name: 'Informacion', icon: 'bi bi-info-circle', route: '/informacion' },
  ];

}
