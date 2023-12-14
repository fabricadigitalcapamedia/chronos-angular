import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
  url = environment.apiUrl;

  getProyecto(clUsuario: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.get(this.url + '/proyecto', { headers });
  }


  getProyectoXid(clUsuario: any, id: number): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.get(this.url + '/proyecto/' + id, { headers });
  }

  getPresupuesto(): Observable<any> {
    return this.http.get(this.url + '/presupuesto');
  }

  getProyectoTipo(): Observable<any> {
    return this.http.get(this.url + '/proyectotipo');
  }

  createProyecto(clUsuario: any, data: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.post(this.url + '/proyecto', data, { headers });
  }

  updateProyecto(clUsuario: any, data: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);    
    return this.http.put(this.url + '/proyecto/' + data.id, data, { headers });
  }
}

