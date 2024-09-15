import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTicketComponent } from './pages/create-ticket.component';

const routes: Routes = [
  {
    path: '',
    component: CreateTicketComponent,
    children:[
      {
        path: '**', redirectTo: 'login',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutUserTicketRoutingModule { }
