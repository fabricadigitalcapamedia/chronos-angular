import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, startWith, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  toastr: any;

  constructor(private http: HttpClient) { }
  url = environment.apiUrl;

  formatFecha(fecharec: any) {
    if (typeof fecharec === 'number') {
      const fecha = new Date(fecharec);
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // ¡Recuerda que los meses comienzan desde 0!
      const anio = fecha.getFullYear();
      fecharec = `${dia}/${mes}/${anio}`;
    }
    return fecharec;
  }

  convertirAFecha(fechaString: string): Date {
    const partesFecha = fechaString.split('/');
    return new Date(parseInt(partesFecha[2]), parseInt(partesFecha[1]) - 1, parseInt(partesFecha[0]));
  }

  cargarCoordinador(clUsuario: any) {
    this.getCoordinador(clUsuario).subscribe({
      next: (data) => {  
        return data.data.filter((tipo: any) => tipo.codestructuratipo === 2 && startWith('Coord'));
      },
      error: (error) => {
       return this.toastr.error('error de conexion con el servidor.')
      }
    })
  }

  getCoordinador(clUsuario: any): Observable<any> {
    const headers = new HttpHeaders().set('CL_USUARIO', clUsuario);
    return this.http.get(this.url + '/estructuraorganizacional', { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => Error(error.message));
      })
    );
  }

}
