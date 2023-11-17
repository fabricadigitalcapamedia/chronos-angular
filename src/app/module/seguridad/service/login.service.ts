import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router:Router,private toastr: ToastrService,) { }

  url = environment.apiUrl;
  
 /* getLogin(data: string): Observable<any> {    
    return this.http.get(this.url+'/seguridad?usuario='+data);    
  }*/
  
  
  getLogin(data: string): Observable<any> {
    return this.http.get(this.url + '/seguridad?usuario=' + data).pipe(
      catchError((error: any) => {
        // Manejar el error aquí, por ejemplo, registrándolo o devolviendo un error personalizado.
        console.error('Error en la solicitud HTTP:', error);
        
        // Devuelve un nuevo observable que emite el error
        debugger
        return (error.status.toString());
      })
    );
  }
    
  createItem(item: any): Observable<any> {
    return this.http.post(this.url+'/servicedemo', item);
  }

  // Operación de actualización (PUT)
  updateItem(id: number, item: any): Observable<any> {
    return this.http.put(this.url+'/servicedemo/'+id, item);
  }
}
