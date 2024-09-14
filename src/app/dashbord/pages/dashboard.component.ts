import { DashServiceService } from './../services/dash-service.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/login-service.service';
import { userResponse } from '../interfaces/user-dash-response';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  users: any[] = [];

  constructor(
    private authService: AuthService,
    private dashService: DashServiceService,
    private toast: ToastrService

  ) { }


  ngOnInit(): void {
this.getUsers();
  }


  closeSesion() {
    this.authService.closeSesion();
  }

  getUsers():void{
    this.dashService.getUsers()
      .subscribe( data => {
        console.log({data});
        this.users = data;
      },
        (error) =>{
          this.toast.error('Error al obtener la data', 'Error', error)
          console.log(error)
        }
      )
  }





}
