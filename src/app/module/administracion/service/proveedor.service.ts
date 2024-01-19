import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }
  url = environment.apiUrl;

  getProveedor(clUsuario: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.get(this.url + '/proveedor', { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }

  getProveedorXid(clUsuario: any, id: number): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.get(this.url + '/proveedor/' + id, { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }

  createProveedor(clUsuario: any, data: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.post(this.url + '/proveedor', data, { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }

  updateProveedor(clUsuario: any, data: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.put(this.url + '/proveedor/' + data.id, data, { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }
}
