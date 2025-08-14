import { Component } from '@angular/core';
import { DefaultLoginLayout } from '../../components/default-login-layout/default-login-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInput } from '../../components/primary-input/primary-input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm{
  nome: FormControl,
  email:FormControl,
  password:FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  imports: [
    DefaultLoginLayout,
    ReactiveFormsModule,
    PrimaryInput
  ],
  providers:[
    LoginService
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class SignupComponent {

  signupForm!: FormGroup<SignupForm>;

  constructor(private router:Router, private loginService: LoginService, private toastrService: ToastrService){
    this.signupForm = new FormGroup({
        nome : new FormControl('', [Validators.required, Validators.minLength(6)]),
        email : new FormControl('', [Validators.required, Validators.email]),
        password : new FormControl('', [Validators.required, Validators.minLength(6)]),
        passwordConfirm : new FormControl('', [Validators.required, Validators.minLength(6)])
      
      })
  }

  submit(){
    this.loginService.login(this.signupForm.value.password,this.signupForm.value.email).subscribe(
      {
        next: ()=>this.toastrService.success("Login feito com sucesso"),
        error: ()=> this.toastrService.error("Erro inesperado !, tente novamente mais tarde")
      }
    )

  }
  navigate(){
    this.router.navigate(["login"])
  }
}
