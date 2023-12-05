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
  user= localStorage.getItem("user")

  getProyecto(clUsuario: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.get(this.url + '/proyecto', { headers });
  }

  createItem(item: any): Observable<any> {
    return this.http.post(this.url + '/servicedemo', item);
  }

  // Operación de actualización (PUT)
  updateItem(id: number, item: any): Observable<any> {
    return this.http.put(this.url + '/servicedemo/' + id, item);
  }
}
