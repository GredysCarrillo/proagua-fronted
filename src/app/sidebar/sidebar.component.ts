import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  items = [
    'dashboard',
    'registrar',
    'dashboard-tickets',
    'informacion',
    'profile',
    'create-ticket'
  ]

}
