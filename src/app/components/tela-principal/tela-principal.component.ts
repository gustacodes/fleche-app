import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UsuarioOnline } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule],
  styleUrls: ['./tela-principal.component.scss'],
})
export class TelaPrincipalComponent {
  fotoUrl: string | null = null;
  usuarioOnline?: UsuarioOnline | undefined
  ide: number = 0;
  idParam = this.route.snapshot.paramMap.get('id');

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute) {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = Number(idParam);
      this.usuarioService.getUsuariosOnline(id).subscribe(response => {
        this.carregarFoto(response.content[this.ide.valueOf()].id);
        this.usuarioOnline = response.content[this.ide.valueOf()]
      });
    } else {
      console.error('ID não encontrado na rota!');
    }
    
  }

  like() {
    if (this.idParam) {
      const id = Number(this.idParam);
      this.usuarioService.getUsuariosOnline(id).subscribe(response => {
        this.carregarFoto(response.content[this.ide.valueOf()].id);
        this.usuarioOnline = response.content[this.ide.valueOf()]
      });
    } else {
      console.error('ID não encontrado na rota!');
    }
    this.ide += 1;
    console.log(this.ide);
    
    console.log('Like! 💚');
  }

  dislike() {
    if (this.idParam) {
      const id = Number(this.idParam);
      this.usuarioService.getUsuariosOnline(id).subscribe(response => {
        this.carregarFoto(response.content[this.ide.valueOf()].id);
        this.usuarioOnline = response.content[this.ide.valueOf()]
      });
    } else {
      console.error('ID não encontrado na rota!');
    }
    this.ide -= 1;
    console.log(this.ide);
    console.log('Dislike! 💔');
  }

  carregarFoto(id: number) {
    this.usuarioService.getFoto(id).subscribe(blob => {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoUrl = reader.result as string;        
      };
      reader.readAsDataURL(blob);
    });
  }

}
