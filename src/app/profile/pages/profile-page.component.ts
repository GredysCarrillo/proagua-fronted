import { AuthService } from './../../auth/services/login-service.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile-servide.service';
import { RegisterData } from '../interfaces/user-register.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {

  user: RegisterData | null = null;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {

    const userId = this.authService.getUserId();
    if (userId) {
      this.profileService.getUserInfo(userId)
        .subscribe({
          next: (data) => {
            console.log("Una data del usuarios",data);
            this.user = data;
          },
          error: (error) => {
            console.log('Ha ocurrido un error', error)
          }
        })
    }
  }

}
