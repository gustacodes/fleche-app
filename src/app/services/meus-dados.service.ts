import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeusDadosService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  getDadosUsuario(id: number | undefined): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${id}/dados`);
  }

  getFoto(id: number | undefined): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/perfil/${id}/foto`, { responseType: 'blob' });
  }

  adicionarPerfil(usuario: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/perfil/cadastrar`, usuario);
  }

  updateDadosUsuario(usuario: FormData, id: number | undefined): Observable<any> {
    return this.http.patch(`${this.apiUrl}/usuario/${id}/atualizar`, usuario);
  }
}
