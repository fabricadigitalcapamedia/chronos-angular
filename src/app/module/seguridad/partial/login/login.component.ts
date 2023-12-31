import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { LoginService } from './../../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AutenticationService } from 'src/app/autentication.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: string = '';
  password: string = '';
  hashedPassword: string = '';
  private isAuthenticated = false;
  isDisabled = false;
  restablecerPass= false; // Variable que controla la visibilidad

  constructor(private loginService: LoginService, private toastr: ToastrService, private router: Router, private autenticationService: AutenticationService) {
  }

  ngOnInit() {
  }


  login() {
    this.hashPassword();
    this.isDisabled = true;
    this.loginService.getLogin(this.user).subscribe((response) => {
      this.isDisabled = false;
      if (response !== "0") {
        if (response && response.clave === this.hashedPassword) {
          this.router.navigate(['/home']);
          localStorage.setItem('login', 'true');
          localStorage.setItem("user", this.user);
          localStorage.setItem("nameuser", response.nombre);
          localStorage.setItem("azureemail", response.azureemail);
          localStorage.setItem("tokenazure", response.tokenazure);
        }
        else {
          this.toastr.error('usuario o contraseña incorrecto')
          localStorage.removeItem('login');
          localStorage.removeItem("user");
          localStorage.removeItem("nameuser");
        }
      }
      else {
        this.toastr.error('error de conexion con el servidor.')
      }
    });
  }

  hashPassword() {
    this.hashedPassword = CryptoJS.SHA256(this.password).toString();
  }

  olvidasteContrasena() {
    this.restablecerPass=!this.restablecerPass;
  }

}
