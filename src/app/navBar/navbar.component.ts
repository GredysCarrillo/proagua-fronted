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

constructor(
  private authService: AuthService,
){}

  closeSesion() {
    this.authService.closeSesion();
  }

  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit(); // Emitir el evento al hacer clic
  }
}
