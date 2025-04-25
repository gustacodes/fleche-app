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

  getUsuariosOnlineBar(): Observable<UsuariosOnlineBares[]> {
    return this.http.get<UsuariosOnlineBares[]>(`${this.apiUrl}/sessao/usuarios/online`);
  }
  
}
