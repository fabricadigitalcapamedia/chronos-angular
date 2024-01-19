import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LineaProductoService {

  
  constructor(private http: HttpClient) { }
  url = environment.apiUrl;


  getLineaProduct(clUsuario: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.get(this.url + '/lineaproducto', { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }

  getLineaProductXid(clUsuario: any, id: number): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.get(this.url + '/lineaproducto/' + id, { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }

  creategetLineaProduct(clUsuario: any, data: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.post(this.url + '/lineaproducto', data, { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }

  updateLineaProduct(clUsuario: any, data: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.put(this.url + '/lineaproducto/' + data.id, data, { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }
}
