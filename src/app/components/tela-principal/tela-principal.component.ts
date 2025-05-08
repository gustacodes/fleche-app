import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  animacaoClasse: string = '';
  usuariosOnline: any[] = [];
  indiceAtual: number = 0;

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.authService.usuario.subscribe(res => {
      if (!res) return;  
      this.idUsuario = res.id;
      this.usuarioService.getUsuariosOnline(res.id).subscribe(response => {
        this.usuariosOnline = response.content;
        this.indiceAtual = 0;
        this.exibirUsuarioAtual();
      });
      
    });
  }  

  exibirUsuarioAtual() {
    const usuarioSelecionado = this.usuariosOnline[this.indiceAtual];
    if (usuarioSelecionado) {
      this.carregarFoto(usuarioSelecionado.id);
      this.usuarioOnline = usuarioSelecionado;
    } else {
       this.router.navigate(['fleche/sem-fleche'])
    }
  }

  like() {
    this.animacaoClasse = 'slide-right';
    this.indiceAtual++;
    this.exibirUsuarioAtual();
  }

  dislike() {
    this.animacaoClasse = 'slide-left';
    this.indiceAtual++;
    this.exibirUsuarioAtual();
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

  resetAnimacao() {
    this.animacaoClasse = '';
    if (this.idUsuario) {
      this.exibirUsuarioAtual();
    }
  }

}
