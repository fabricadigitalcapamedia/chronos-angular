import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { LoginService } from '../seguridad/service/login.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private loginService: LoginService) { }
  url = environment.apiUrl;

  getActividadesFiltro(clUsuario:any, codPersona: any, fechaInicio: any, fechFin: any): Observable<any>{
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    if(fechaInicio == null && fechFin == null){
      fechaInicio = moment().subtract(1, 'months').startOf('month').format('DD/MM/YYYY');
      fechFin = moment().endOf('month').format('DD/MM/YYYY');
    }
    let url = this.url + '/tareaactividad/vu/filtro?codproyecto=0&codproveedor=0&codpersona='+
    codPersona+'&fechainicio='+fechaInicio+'&fechafin='+fechFin;
    return this.http.get(url, { headers });
  }

  getTareaById(id: any): Observable<any>{
    let url = this.url + '/tarea/'+id;
    return this.http.get(url, )
  }

  getTareasEstados() : Observable<any>{
    let url = this.url + '/tareaestado';
    return this.http.get(url, )
  }
}
