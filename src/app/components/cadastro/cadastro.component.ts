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

  selectedFoto: File | null = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFoto = files[0];
    }
  }

  cadastrar() {
    const formData = new FormData();
    formData.append("nome", this.usuario.nome);
    formData.append("email", this.usuario.email);
    formData.append("numero", this.usuario.numero);
    formData.append("senha", this.usuario.senha);
    formData.append("dataNascimento", this.usuario.dataNascimento);

    if (this.selectedFoto) {
      formData.append("foto", this.selectedFoto);
    }

    this.usuarioService.upload(formData).subscribe(resposta => {
      console.log(resposta);
    });
  }
}
