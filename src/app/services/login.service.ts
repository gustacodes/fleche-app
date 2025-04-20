import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  login(numero: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login/${numero}/${senha}`, null);
  }

  teste(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/teste`);
  }

}
