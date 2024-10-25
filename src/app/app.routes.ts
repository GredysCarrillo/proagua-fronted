import { Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { RegisterComponent } from './auth/pages/register/register.component';
import { DashboardComponent } from './dashbord/pages/dashboard.component';
import { InformationPageComponent } from './informacion/pages/information-page.component';
import { ProfilePageComponent } from './profile/pages/profile-page.component';

export const routes: Routes = [

  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
  },
  {
    path: 'dashboard-tickets',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./tickets/dahs-routes.module').then(m => m.DahsRoutesModule),
  },
  {
    path: 'dashboard',
    canActivate: [isAuthenticatedGuard],
    component: DashboardComponent
  },
  {
    path: 'registrar',
    canActivate: [isAuthenticatedGuard],
    component: RegisterComponent,
  },
  {
    path: 'profile',
    canActivate: [isAuthenticatedGuard],
    component: ProfilePageComponent,
  },
  {
    path: 'create-ticket',
    canActivate: [isAuthenticatedGuard],
    loadChildren: ()=> import('./tickets-user/ticket-routing.module').then(m => m.TicketRoutingModule),
  },
  {
    path: 'informacion',
    canActivate:[isAuthenticatedGuard],
    component: InformationPageComponent
  },
  {
    path: '**',
    redirectTo: 'auth'
  },

];
