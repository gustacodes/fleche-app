import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  standalone: true,
  imports: [IonicModule],
  styleUrls: ['./meus-dados.component.scss'],
})
export class MeusDadosComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
