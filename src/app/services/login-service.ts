import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpCliente : HttpClient){
    
  }

  login(password: string, name: string) {
    return this.httpCliente.post<LoginResponse>("/login", { name, password }).pipe(
      tap(value => {
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("username", value.name);
    })
  );
}

}
