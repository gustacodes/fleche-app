import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  imports: [
    IonicModule,
    CommonModule
  ],
  styleUrls: ['./meus-dados.component.scss'],
})
export class MeusDadosComponent implements OnInit {
  fotoUrl: string | null = null;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.carregarFoto(1);
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
