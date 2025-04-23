import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule],
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  
  constructor(private authService: AuthService, private router: Router) {}

  login(telefone: string, senha: string) {
    const credentials = {
      telefone: telefone,
      senha: senha
    };    

  this.authService.login(credentials).subscribe({
    next: (res) => {      
      this.authService.saveToken(res.token);      
      this.router.navigate(['fleche/bares']);
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
