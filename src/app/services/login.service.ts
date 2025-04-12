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

  createPost(telefone: string | null | undefined, senha: string | null | undefined): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/post/${telefone}/${senha}`, null);
  }

}
