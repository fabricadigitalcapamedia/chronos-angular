import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AjusteService } from '../../service/ajuste.service';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-ajuste',
  templateUrl: './ajuste.component.html',
  styleUrls: ['./ajuste.component.css']
})
export class AjusteComponent implements OnInit {

  dataazure: any = {};
  datapass: any = {};
  password: String = '';
  reppassword: String = '';
  mesajepass: String = '';
  hashedPassword: String = ''
  public showPassword: boolean = false;
  public repshowPassword: boolean = false;
  public showPasswordazure: boolean = false;
  bsModalRef: BsModalRef | undefined;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private titleService: Title, private ajusteService: AjusteService, private toastr: ToastrService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
    this.titleService.setTitle('Ajuste');
    this.datapass.user = localStorage.getItem('user');
    this.dataazure.email = localStorage.getItem("azureemail");
    this.dataazure.passwordazure = localStorage.getItem("tokenazure");
  }


  saveToken() {
    this.ajusteService.updateToken(this.datapass.user,this.dataazure.passwordazure,this.dataazure.email).subscribe((response) => {
         this.toastr.success(response.mensaje)
    });
  }

  savePassword() {
    this.mesajepass = '';
    if (this.datapass.password === this.reppassword) {
      this.datapass.hashedPassword = CryptoJS.SHA256(this.datapass.password).toString();
      this.ajusteService.updatePass(this.datapass).subscribe((response) => {
        this.toastr.success(response.mensaje)
      });
    }
    else {
      this.mesajepass = 'La contraseña no coinciden';
    }
  }

  togglePasswordVisibility(value: string) {
    if (value === 'reppassword') {
      this.repshowPassword = !this.repshowPassword;
    } else {
      this.showPassword = !this.showPassword;
    }
  }

  getPasswordFieldType(value: string) {
    if (value === 'reppassword') {
      return this.repshowPassword ? 'text' : 'password';
    }
    else {
      return this.showPassword ? 'text' : 'password';
    }
  }


  togglePasswordVisibilityazure() {
    this.showPasswordazure = !this.showPasswordazure;
  }

  getPasswordFieldTypeazure() {
    return this.showPasswordazure ? 'text' : 'password';

  }


}
