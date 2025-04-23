import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://192.168.0.103:8080';

  constructor(private http: HttpClient) {}

  login(credentials: { telefone: string; senha: string }) {    
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}