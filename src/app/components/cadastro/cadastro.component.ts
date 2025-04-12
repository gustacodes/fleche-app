import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  standalone: true,
  imports: [IonicModule, FormsModule],
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = {
    nome: '',
    email: '',
    numero: '',
    senha: '',
    dataNascimento: ''
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {}

  cadastrar() {
    this.usuarioService.cadastrarUsuario(this.usuario).subscribe(response => {
      console.log(response);      
    });
  }
}
