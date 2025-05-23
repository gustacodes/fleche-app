import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  cadastro(formData : FormData) : Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/cadastrar`, formData);
  }

  getFoto(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/usuario/${id}/foto`, { responseType: 'blob' });
  }

  getUsuariosOnline(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/sessao/usuarios/disponiveis/${usuarioId}?page=0&size=100`);
  }

}
