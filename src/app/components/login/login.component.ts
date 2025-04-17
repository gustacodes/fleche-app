import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule],
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  
  constructor(private loginService: LoginService, private router: Router) {}

  logar(tel: string, senha: string) {
    this.loginService.login(tel, senha).subscribe(response => { 
      this.router.navigate(['fleche/tela-principal', response]);
    });
  }

  irParaCadastro() {
    this.router.navigate(['fleche/cadastro']);
  }

}
