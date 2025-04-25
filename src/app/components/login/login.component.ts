import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservice.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule],
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  login(telefone: string, senha: string) {
    const credentials = {
      telefone: telefone,
      senha: senha
    };
  
    this.authService.login(credentials).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);  
        const decodedToken: any = jwtDecode(res.token);
        this.authService.setUserFromToken(decodedToken);
        this.router.navigate(['fleche/tela-principal', decodedToken.id]);
      },
      error: (err) => {
        console.error('Erro no login', err);
      }
    });
  }

  irParaCadastro() {
    this.router.navigate(['fleche/cadastro']);
  }

}
