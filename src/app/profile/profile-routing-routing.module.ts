import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page.component';
import path from 'path';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    children:[
      {
        path: '**', redirectTo: 'login'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingRoutingModule { }
