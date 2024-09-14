import { Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { RegisterComponent } from './auth/pages/register/register.component';
import { DashboardComponent } from './dashbord/pages/dashboard.component';

export const routes: Routes = [

  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
  },
  {
    path: 'Ticket',
    canActivate:[isNotAuthenticatedGuard],
    loadChildren: () => import('./tickets/tickets-routing.module').then(m => m.TicketsRoutingModule),
  },
  {
    path: 'dashboard',
    canActivate: [isAuthenticatedGuard],
    component: DashboardComponent
  },
  {
    path: 'registrar',
    canActivate:[isAuthenticatedGuard],
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: 'auth'
  },

];
