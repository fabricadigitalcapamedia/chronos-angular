import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
  url = environment.apiUrl;


  getHorasRegistradasEmpleado(idEmpleado: any) : Observable<any>{
    return this.http.get(this.url + '/empleadocontrol/horasmesactual/' + idEmpleado);
  }

  getDatosEmpleadoByUsuario(usuarioClaro: any) : Observable<any> {
    return this.http.get(this.url + '/empleado/usuarioClaro/' + usuarioClaro);
  }

}
