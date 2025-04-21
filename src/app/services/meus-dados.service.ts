import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DadosUsuario } from '../interfaces/usuario-dados';

@Injectable({
  providedIn: 'root'
})
export class MeusDadosService {
  private apiUrl = `http://${window.location.hostname}:8080`;

  constructor(private http: HttpClient) { }

  getDadosUsuario(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${id}/dados`);
  }

  getFoto(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/usuario/${id}/foto`, { responseType: 'blob' });
  }

  updateDadosUsuario(usuario: DadosUsuario, id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/usuario/${id}/atualizar`, usuario);
  }
}
