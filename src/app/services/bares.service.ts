import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosOnlineBares } from '../interfaces/bares';

@Injectable({
  providedIn: 'root'
})
export class BaresService {

  private apiUrl = `http://192.168.0.103:8080`;

  constructor(private http: HttpClient) { }

  getUsuariosOnlineBar(): Observable<UsuariosOnlineBares[]> {
    return this.http.get<UsuariosOnlineBares[]>(`${this.apiUrl}/sessao/usuarios/online`);
  }
  
}
