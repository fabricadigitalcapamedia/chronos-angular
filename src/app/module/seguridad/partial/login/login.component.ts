import { Component, OnInit, ViewChild } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { LoginService } from './../../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AutenticationService } from 'src/app/service/autentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('form', { static: true }) Form?: NgForm;
  validate: boolean = false;
  user: string = '';
  password: string = '';
  hashedPassword: string = '';
  private isAuthenticated = false;
  isDisabled = false;
  restablecerPass = false; // Variable que controla la visibilidad

  constructor(private loginService: LoginService, private toastr: ToastrService, private router: Router, private autenticationService: AutenticationService) {
  }

  ngOnInit() {
  }


  login() {
    this.remove();
    if (this.user === '' || this.password === '') {
      this.validate = true
      this.toastr.warning('Debe diligenciar los campos remarcados en rojo');
    } else {
      this.hashPassword();
      this.isDisabled = true;
      this.loginService.getLogin(this.user).subscribe((response) => {
        this.isDisabled = false;
        if (response !== "0") {
          if (response && response.clave === this.hashedPassword) {
            this.router.navigate(['/home']);
            console.log(response);
            localStorage.setItem('login', 'true');
            localStorage.setItem("user", this.user);
            localStorage.setItem("nameuser", response.nombre);
            localStorage.setItem("azureemail", response.azureemail);
            localStorage.setItem("tokenazure", response.tokenazure);
            localStorage.setItem("codpersona", response.codpersona)
          }
          else {
            this.toastr.error('usuario o contraseña incorrecto')
          }
        }
        else {
          this.toastr.error('error de conexion con el servidor.')
        }
      });
    }
  }
  remove(){
    localStorage.removeItem('login');
    localStorage.removeItem("user");
    localStorage.removeItem("nameuser");
    localStorage.removeItem("codpersona");
    localStorage.removeItem("azureemail");
    localStorage.removeItem("azureemail");
    localStorage.removeItem("tokenazure");
    localStorage.removeItem("codpersona");
  }

  hashPassword() {
    this.hashedPassword = CryptoJS.SHA256(this.password).toString();
  }

  olvidasteContrasena() {
    this.restablecerPass = !this.restablecerPass;
  }

}
