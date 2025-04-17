import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule],
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {

  fotoSelecionada: File | null = null;
  cadastroForm: FormGroup;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numero: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      dataNascimento: ['', Validators.required],
      foto: [null]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cadastroForm.patchValue({ foto: file });
      this.cadastroForm.get('foto')?.updateValueAndValidity();
    }
  }  

  cadastrar() {
    if (this.cadastroForm.valid) {
      const dados = this.cadastroForm.value;
      const formData = new FormData();
  
      formData.append('nome', dados.nome);
      formData.append('email', dados.email);
      formData.append('numero', dados.numero);
      formData.append('senha', dados.senha);
      formData.append('dataNascimento', dados.dataNascimento);
  
      if (dados.foto) {
        formData.append('foto', dados.foto);
      }
  
      this.usuarioService.cadastro(formData).subscribe(
        resposta => {
          console.log('Usuário cadastrado com sucesso:', resposta);
        },
        erro => {
          console.error('Erro ao cadastrar:', erro);
        }
      );
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }
  

}
