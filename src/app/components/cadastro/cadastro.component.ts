import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  standalone: true,
  imports: [IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule]
})
export class CadastroComponent {

  fotoSelecionada: File | null = null;
  cadastroForm: FormGroup;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder, private router: Router) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ddd: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      telefone: ['', [Validators.required, Validators.pattern(/^\d{8,9}$/)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      dataNascimento: ['', Validators.required]
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
      this.usuarioService.cadastro(this.cadastroForm.value).subscribe(
        resposta => {
          this.router.navigate(['login']);
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
