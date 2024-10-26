import { DashServiceService } from './../services/dash-service.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  searchTerm: string = '';
  filteredUsers: any[] = [];
  activeTickets: any = { abiertos: 0 };
  selectedUserId: string | null = null;

  constructor(
    private dashService: DashServiceService,
    private toast: ToastrService,
    private router: Router,

  ) { }


  ngOnInit(): void {
    this.getUsers();
    this.getTicketsCount();
  }

  setUserToDelete(user: any): void {
    this.selectedUserId = user._id;
  }

  getUsers(): void {
    this.dashService.getUsers()
      .subscribe(data => {
        this.users = data.filter((user: { roles: string | string[]; }) => user.roles.includes('user'));
        this.filteredUsers = this.users;
        this.countUserStatus();
      },
        (error) => {
          this.toast.error('Error al obtener la data', 'Error', error)
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

  getTicketsCount(): void {
    this.dashService.getActiveTickes()
      .subscribe({
        next: (data) => {
          this.activeTickets = data;
        },
        error: (error) => {
          this.toast.error('Erro al traer los contadores de tickets', error)
        }
      })
  }

  deleteUser(): void {
    if (this.selectedUserId) {
      this.dashService.deleteUserById(this.selectedUserId).subscribe({
        next: (response) => {
          this.toast.success('Usuario y registros eliminados correctamente');
          this.getUsers();
        },
        error: (error) => {
          this.toast.error('No se elimino el usuario')
        }

      })
    }
  }

  toggleUserStatus(user: any): void {
    const uspdateStatus = !user.status;
    this.dashService.updateUserStatus(user._id, uspdateStatus)
      .subscribe({
        next: () => {
          user.status = uspdateStatus;
          this.countUserStatus();
          this.toast.success(`El usuario ha sido ${uspdateStatus ? 'activado' : 'supendido'}`)
        },
        error: () => {
          this.toast.error('No se logro actualizar el estado del usuario')
        }
      })

  }

}
