import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
  url = environment.apiUrl;

  getPerfil(clUsuario: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.get(this.url + '/perfil', { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }

  getPerfilXid(clUsuario: any, id: number): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.get(this.url + '/perfil/' + id, { headers });
  }

  createPerfil(clUsuario: any, data: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.post(this.url + '/perfil', data, { headers });
  }

  updatePerfil(clUsuario: any, data: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.put(this.url + '/perfil/' + data.id, data, { headers });
  }

  private handleError(error: HttpErrorResponse) {
    debugger
    return throwError(() => new Error(error.message));
  }
}
