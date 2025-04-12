import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule], // <-- AQUI
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {

  constructor(private loginService: LoginService) {}

  logar(telefone: string | null | undefined, senha: string | null | undefined) {
    this.loginService.createPost(telefone, senha).subscribe();
  }
}
