import { Component } from '@angular/core';
import { AuthService } from '../auth/services/login-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private authService: AuthService){

  }

  closeSesion(){
    this.authService.closeSesion();
  }


  

}
