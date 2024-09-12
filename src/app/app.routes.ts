import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
  },
  {
    path: '**',
    redirectTo: 'auth'
  },

];
