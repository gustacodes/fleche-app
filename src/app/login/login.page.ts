import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule], // <-- AQUI
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {}
