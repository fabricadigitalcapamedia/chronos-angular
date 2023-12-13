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

  createItem(item: any): Observable<any> {
    return this.http.post(this.url + '/servicedemo', item);
  }

  // Operación de actualización (PUT)
  updateItem(clUsuario: any, id: number): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.put(this.url + '/proyecto/' + id, { headers });
  }
}

