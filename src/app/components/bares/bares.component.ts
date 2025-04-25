import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsuariosOnlineBares } from 'src/app/interfaces/bares';
import { AuthService } from 'src/app/services/authservice.service';
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

  constructor(private barServices: BaresService, private authService: AuthService) { }

  ngOnInit() {
    this.getUsuariosOnlineBar();
    this.authService.usuario.subscribe(user => {
      console.log(user);      
    });
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
