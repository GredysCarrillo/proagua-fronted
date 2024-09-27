import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth/services/login-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Output() toggleSidebar = new EventEmitter<boolean>();
  isSidebarCollapsed = false;

  constructor(
    private authService: AuthService,
  ) { }

  closeSesion() {
    this.authService.closeSesion();
  }


  onToggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.toggleSidebar.emit(this.isSidebarCollapsed  );
  }
}
