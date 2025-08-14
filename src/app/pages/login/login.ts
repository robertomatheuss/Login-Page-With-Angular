import { Component } from '@angular/core';
import { DefaultLoginLayout } from '../../components/default-login-layout/default-login-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInput } from '../../components/primary-input/primary-input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginLayout,
    ReactiveFormsModule,
    PrimaryInput
  ],
  providers:[
    LoginService
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private router:Router, private loginService: LoginService, private toastrService: ToastrService){
    this.loginForm = new FormGroup({
        email : new FormControl('', [Validators.required, Validators.email]),
        password : new FormControl('', [Validators.required, Validators.minLength(6)])
      })
  }

  submit(){
    this.loginService.login(this.loginForm.value.password,this.loginForm.value.email).subscribe(
      {
        next: ()=>this.toastrService.success("Login feito com sucesso"),
        error: ()=> this.toastrService.error("Erro inesperado !, tente novamente mais tarde")
      }
    )

  }
  navigate(){
    this.router.navigate(["signup"])
  }
}
