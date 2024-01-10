import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TercerosService {

  constructor(private http: HttpClient) { }
  url = environment.apiUrl;


  getTercero(clUsuario: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.get(this.url + '/tercero', { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }

  getTerceroXid(clUsuario: any, id: number): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.get(this.url + '/tercero/' + id, { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }

  createTercero(clUsuario: any, data: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.post(this.url + '/tercero', data, { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }

  updateTercero(clUsuario: any, data: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.put(this.url + '/tercero/' + data.id, data, { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }

}
