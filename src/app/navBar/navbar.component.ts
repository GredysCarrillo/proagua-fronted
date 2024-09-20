import { Component } from '@angular/core';
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
}
