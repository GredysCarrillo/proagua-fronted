import { Routes } from '@angular/router';
import { DashboardComponent } from './dashbord/dashboard.component';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';

export const routes: Routes = [

  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
  },
  {
    path: 'dashboard',
    canActivate:[isAuthenticatedGuard],
    component: DashboardComponent
  },
  {
    path: '**',
    redirectTo: 'auth'
  },

];
