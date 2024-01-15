import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AutenticationService } from 'src/app/service/autentication.service';
import { LoginService } from 'src/app/module/seguridad/service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  opened = false;
  menu = 'menu';
  user = localStorage.getItem('user');
  nameuser = localStorage.getItem('nameuser');
  userImgGoogle:any;
  menuItems?:any[];

  constructor(private loginService: LoginService, private toastr: ToastrService, private autenticationService: AutenticationService) {
  }
  ngOnInit() {
  }

  logout() {
    this.toastr.info('Sesión cerrada exitosamente.')
    this.autenticationService.logout();
  }

  onUserActivity() {
    this.autenticationService.initActivityListeners(); // Reinicia el temporizador en respuesta a la actividad del usuario
  }

  open() {
    if (this.opened) {
      this.opened = false;
      this.menu = 'menu';
    }
    else{
      this.opened = true;
      this.menu = 'clear_all';
    }
  }

  gridData?: any[];


  jsonDinamicoRecibido?: { [key: string]: any };

  recibirJsonDinamico(json: { [key: string]: any }) {
    this.jsonDinamicoRecibido = json;
  }

}
