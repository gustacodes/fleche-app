import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  standalone: true,
  imports: [IonicModule],
  styleUrls: ['./tela-principal.component.scss'],
})
export class TelaPrincipalComponent  implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  // Função que simula o "like"
  handleLike() {
    console.log('Like! 💚');
    // Aqui você pode adicionar a lógica para o like
  }

  // Função que simula o "dislike"
  handleDislike() {
    console.log('Dislike! 💔');
    // Aqui você pode adicionar a lógica para o dislike
  }

}
