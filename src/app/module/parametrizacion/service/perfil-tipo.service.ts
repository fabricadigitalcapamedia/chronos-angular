import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PerfilTipoService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
  url = environment.apiUrl;


  getPerfilTipo(clUsuario: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.get(this.url + '/perfiltipo', { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }

  getPerfilTipoXid(clUsuario: any, id: number): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.get(this.url + '/perfiltipo/' + id, { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );;
  }

  createPerfilTipo(clUsuario: any, data: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.post(this.url + '/perfiltipo', data, { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }

  updatePerfilTipo(clUsuario: any, data: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.put(this.url + '/perfiltipo/' + data.id, data, { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }


}
