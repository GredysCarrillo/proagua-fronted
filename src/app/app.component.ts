import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthLayoutComponent } from "./auth/layouts/auth-layout.component";
import { AuthStatus } from './auth/interfaces/auth-status.enum';
import { AuthService } from './auth/services/login-service.service';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./navBar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    AuthLayoutComponent,
    SidebarComponent,
    CommonModule,
    NavbarComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'proagua';
  isSidebarCollapsed = false;
  isloading: boolean = true;

  private authService = inject(AuthService);
  private router = inject(Router);


  toggleSidebar(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }

  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }
    return true;
  });

  public isAunthenticated = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.authenticated) {
      return true;
    }
    return false;
  });


  public authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatus()) {

      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl(this.authService.getRol() == 'admin' ? '/dashboard' : '/profile');
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;

    }

  });

}
