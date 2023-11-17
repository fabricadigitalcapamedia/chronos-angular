import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AjusteService {

  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  updatePass(data: any): Observable<any> {
    return this.http.put(this.url + '/seguridad/actualizarClave/' + data.user + '/' + data.hashedPassword, null);
  }

  updateToken(user: String, token: String, azureemail: String): Observable<any> {
    return this.http.put(this.url + '/seguridad/actualizarToken/' + user + '/' + token + '/' + azureemail, null);
  }
}
