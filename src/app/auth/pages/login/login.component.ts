import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/login-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,

  ){}

  public myForm = this.fb.group({
    dpi: ['3423354132201', [Validators.required, Validators.minLength(13)]],
    password: ['123456789', [Validators.required]]
  });


  onSubmit(){
    const {dpi, password} = this.myForm.value;
    if(dpi && password){
      this.authService.login(dpi, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (message) =>{
          this.toastr.error(message, 'Error')
        }
      })
    }
  }

}
