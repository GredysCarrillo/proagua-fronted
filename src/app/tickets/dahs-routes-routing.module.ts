import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketDashbordComponent } from './pages/dashbord.component';
import { CreateTicketComponent } from '../tickets-user/pages/create-ticket.component';

const routes: Routes = [
  {
    path: '',
    component: TicketDashbordComponent,
    children: [
      { path: '**', redirectTo: 'login' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DahsRoutesRoutingModule { }
