import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UsuarioOnline } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/authservice.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule],
  styleUrls: ['./tela-principal.component.scss'],
})
export class TelaPrincipalComponent implements OnInit {
  fotoUrl: string | null = null;
  usuarioOnline?: UsuarioOnline | undefined
  ide: number = 0;
  idUsuario!: number;

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.authService.usuario.subscribe(res => {
      if (!res) return;  
      this.idUsuario = res.id;
      this.usuarioService.getUsuariosOnline(res.id).subscribe(response => {
        const usuarioSelecionado = response.content[this.ide.valueOf()];
        console.log(usuarioSelecionado);
        
        if (usuarioSelecionado) {
          this.carregarFoto(usuarioSelecionado.id);
          this.usuarioOnline = usuarioSelecionado;
        }
      });
    });
  }  

  like() {
    if (this.idUsuario) {
      this.usuarioService.getUsuariosOnline(this.idUsuario).subscribe(response => {
        this.carregarFoto(response.content[this.ide.valueOf()].id);
        this.usuarioOnline = response.content[this.ide.valueOf()]
      });
    } else {
      console.error('ID não encontrado na rota!');
    }
    this.ide += 1;    
    console.log('Like! 💚');
  }

  dislike() {
    if (this.idUsuario) {
      const id = Number(this.idUsuario);
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
