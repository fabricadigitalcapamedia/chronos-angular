import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
    providedIn: 'root'
  })
export class TareaService { 
    constructor(private http: HttpClient) { }
    url = environment.apiUrl;

    getTareaById(id: any): Observable<any>{
        let url = this.url + '/tarea/'+id;
        return this.http.get(url, )
    }

    updateTarea(id: any, data: any): Observable<any>{
        let url = this.url + '/tarea/'+id;
        return this.http.put(url, data, );
    }

}