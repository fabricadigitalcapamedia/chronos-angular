import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenerateJsonService {

  url = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  getJson(): Observable<any> {
    return this.http.get(this.url+'/servicedemo/getDemos');
  }

    
  createItem(item: any): Observable<any> {
    return this.http.post(this.url+'/servicedemo', item);
  }

  // Operación de actualización (PUT)
  updateItem(id: number, item: any): Observable<any> {
    return this.http.put(this.url+'/servicedemo/'+id, item);
  }
  
}
