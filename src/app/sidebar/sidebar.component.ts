import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebaService } from './services/sideba.service';

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

  userRole: string = 'user';

  constructor(
    private sidebarService: SidebaService
  ) { }


  ngOnInit(): void {
    this.userRole = this.sidebarService.getUserRole();
    this.items;
  }

  items: MenuItem[] = [

    { name: 'Dashboard', icon: 'bi bi-speedometer2', route: '/dashboard', rolesAllowed: ['admin'] },
    { name: 'Registro', icon: 'bi bi-person-plus', route: '/registrar', rolesAllowed: ['admin'] },
    { name: 'Reportes', icon: 'bi bi-file-earmark-text', route: '/dashboard-tickets', rolesAllowed: ['admin'] },
    { name: 'Perfil', icon: 'bi bi-person-bounding-box', route: '/profile', rolesAllowed: ['user', 'admin'] },
    { name: 'Crear Reporte', icon: 'bi bi-folder-plus', route: '/create-ticket', rolesAllowed: ['user'] },
    { name: 'Informacion', icon: 'bi bi-info-circle', route: '/informacion', rolesAllowed: ['user'] },
  ];

}
