import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsuariosOnlineBares } from 'src/app/interfaces/bares';
import { BaresService } from 'src/app/services/bares.service';

@Component({
  selector: 'app-bares',
  templateUrl: './bares.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./bares.component.scss'],
})
export class BaresComponent  implements OnInit {
  bares: UsuariosOnlineBares[] = [];

  constructor(private barServices: BaresService) { }

  ngOnInit() {
    this.getUsuariosOnlineBar();
  }

  toggleDetalhes(index: number) {
    this.bares[index].mostrarDetalhes = !this.bares[index].mostrarDetalhes;
  }

  getUsuariosOnlineBar() {
    this.barServices.getUsuariosOnlineBar().subscribe((response: UsuariosOnlineBares[]) => {
      this.bares = response.map(bar => ({
        ...bar,
        mostrarDetalhes: false
      }));
    });
  }
  

}
