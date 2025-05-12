import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsuariosOnlineBares } from 'src/app/interfaces/bares';
import { AuthService } from 'src/app/services/authservice.service';
import { BaresService } from 'src/app/services/bares.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bares',
  templateUrl: './bares.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule],
  styleUrls: ['./bares.component.scss'],
})
export class BaresComponent  implements OnInit {
  bares: UsuariosOnlineBares[] = [];

  constructor(private barServices: BaresService, private authService: AuthService, private router: Router) { }

  ngOnInit() {    
    this.authService.usuario.subscribe(user => {  
      this.getUsuariosOnlineBar(user.id);
    });
  }

  toggleDetalhes(index: number) {
    this.bares[index].mostrarDetalhes = !this.bares[index].mostrarDetalhes;
  }

  getUsuariosOnlineBar(usuarioId: number) {
    this.barServices.getUsuariosOnlineBar(usuarioId).subscribe((response: UsuariosOnlineBares[]) => {
      this.bares = response.map(bar => ({
        ...bar,
        mostrarDetalhes: false
      }));
    });
  } 

  autenticar() {
    this.router.navigate(['fleche/auth-bar'])
  }

}
