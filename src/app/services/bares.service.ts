import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosOnlineBares } from '../interfaces/bares';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaresService {

  private apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  getUsuariosOnlineBar(usuarioId: number): Observable<UsuariosOnlineBares[]> {
    return this.http.get<UsuariosOnlineBares[]>(`${this.apiUrl}/sessao/usuarios/${usuarioId}/online`);
  }

  postCheckIn(dados: { usuarioId: number; qrCode: string }) {
  return this.http.post<{ message: string }>(`${this.apiUrl}/sessao/checkin`, dados);
}

  getVerificaSeUsuarioEstaOnline(usuarioId: number) {
    return this.http.get<{ message: string }>(`${this.apiUrl}/sessao/usuario/${usuarioId}/autenticado`);
  }
  
}
