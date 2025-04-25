import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.url;
  private userObject = new BehaviorSubject<any>(null);
  usuario = this.userObject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { telefone: string; senha: string }) {    
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, credentials);
  }

  setUserFromToken(decodedToken: any) {
    this.userObject.next(decodedToken);
  }

  getUser() {
    return this.userObject.value;
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