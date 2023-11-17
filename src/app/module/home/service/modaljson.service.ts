import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModaljsonService {

  url = 'http://172.24.60.43:8387/api/v1/servicedemo';

  constructor(private http: HttpClient) { }

  enviarDatos(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }
}
