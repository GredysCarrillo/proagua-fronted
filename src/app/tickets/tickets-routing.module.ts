import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { TicketDashbordComponent } from './pages/dashbord.component';

const routes: Routes = [
  {
    path:'',
    component: TicketDashbordComponent,
    children:[
      {path: '**', redirectTo: 'login'}
    ]
  }
  ];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TicketsRoutingModule { }
