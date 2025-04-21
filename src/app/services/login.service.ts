import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `http://${window.location.hostname}:8080`;

  constructor(private http: HttpClient) { }

  login(numero: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login/${numero}/${senha}`, null);
  }

}
