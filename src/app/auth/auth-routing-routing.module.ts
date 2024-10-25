import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';

const routes: Routes = [
{
  path:'',
  component:AuthLayoutComponent,
  children:[
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    { path: 'forgotPassword', component: RecoveryPasswordComponent }, // Añade esta línea
    {path: '**', redirectTo: 'login'}
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingRoutingModule { }
