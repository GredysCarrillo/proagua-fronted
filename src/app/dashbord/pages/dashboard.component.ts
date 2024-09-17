import { DashServiceService } from './../services/dash-service.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/login-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { userResponse } from '../interfaces/user-dash-response';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  users: any[] = [];
  p: number = 1; // Página actual
  activeUsersCount: number = 0;
  suspendedUsersCount: number = 0;
  searchTerm:string ='';
  filteredUsers: any[] = [];
  activeTickets: any = { abiertos: 0 };

  constructor(
    private authService: AuthService,
    private dashService: DashServiceService,
    private toast: ToastrService

  ) { }


  ngOnInit(): void {
    this.getUsers();
    this.getTicketsCount();
  }


  closeSesion() {
    this.authService.closeSesion();
  }

  getUsers(): void {
    this.dashService.getUsers()
      .subscribe(data => {
        console.log({ data });
        this.users = data;
        this.filteredUsers = data;
        this.countUserStatus();
      },
        (error) => {
          this.toast.error('Error al obtener la data', 'Error', error)
          console.log(error)
        }
      )
  }

  countUserStatus(): void {
    this.activeUsersCount = this.users.filter(user => user.status === true).length;
    this.suspendedUsersCount = this.users.filter(user => user.status === false).length;
  }

  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filterUsers(): void {
    const normalizedSearchTerm = this.normalizeString(this.searchTerm);

    if (normalizedSearchTerm.trim() === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user =>
        this.normalizeString(user.name).toLowerCase().includes(normalizedSearchTerm.toLowerCase())
      );
    }
    this.countUserStatus();
  }

  getTicketsCount():void {
    this.dashService.getActiveTickes()
      .subscribe({
        next: (data) => {
          console.log('Contador tickets activos', {data})
          this.activeTickets = data;
        },
        error: (error) => {
          this.toast.error('Erro al traer los contadores de tickets', error)
        }
      })
  }


}
