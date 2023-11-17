import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerateJsonService {
  private apiUrl = 'https://tu-api.com';

  constructor(private http: HttpClient) { }

   // Operación de lectura (GET)
   getItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/items`);
  }

  createItem(item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/items`, item);
  }

  // Operación de actualización (PUT)
  updateItem(id: number, item: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/items/${id}`, item);
  }

  // Operación de eliminación (DELETE)
  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/items/${id}`);
  }
}
