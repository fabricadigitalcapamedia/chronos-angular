import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { LoginService } from '../seguridad/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private loginService: LoginService) { }
url = environment.apiUrl;

}
