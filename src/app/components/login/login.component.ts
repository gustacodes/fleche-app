import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule], // <-- AQUI
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  constructor(private loginService: LoginService) {}

  logar(tel: string, senha: string) {
    this.loginService.createPost(tel, senha).subscribe();
  }
}
