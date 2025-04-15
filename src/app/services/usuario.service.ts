import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  upload(formData : FormData) : Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/singup`, formData);
  }

  getFoto(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/usuarios/foto/${id}`, { responseType: 'blob' });
  }  

}
