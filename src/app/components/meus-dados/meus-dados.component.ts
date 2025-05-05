import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DadosUsuario } from 'src/app/interfaces/usuario-dados';
import { AuthService } from 'src/app/services/authservice.service';
import { MeusDadosService } from 'src/app/services/meus-dados.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.scss'],
  standalone: true,
  imports: [CommonModule,
    IonicModule,
    FormsModule],
})
export class MeusDadosComponent implements OnInit {
  fotoUrl: string | null = null;
  fotoArquivo: File | null = null;
  dadosUsuario: DadosUsuario = {
    nome: '',
    email: '',
    numero: '',
    genero: '',
    preferencia: ''
  };  

  formFields = [
    {
      label: 'Nome',
      placeholder: 'Seu nome',
      type: 'text',
      editable: false,
      value: '',
    },
    {
      label: 'Email',
      placeholder: 'seu@email.com',
      type: 'email',
      editable: false,
      value: '',
    },
    {
      label: 'Telefone',
      placeholder: '(00) 00000-0000',
      type: 'tel',
      editable: false,
      value: '',
    },
    {
      label: 'Senha',
      placeholder: '**************',
      type: 'password',
      editable: false,
      value: '',
    }
  ];
  
  constructor(private dadosService: MeusDadosService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.usuario.subscribe(res => {
      this.carregarFoto(res.id);
      this.getDadosUsuario(res.id);      
    })    
  }

  toggleEdit(field: any) {
    field.editable = !field.editable;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fotoArquivo = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  } 

  getDadosUsuario(id: number) {    
    this.dadosService.getDadosUsuario(id).subscribe(response => {  
      this.formFields.find(f => f.label === 'Nome')!.value = response.nome;
      this.formFields.find(f => f.label === 'Email')!.value = response.email;
      this.formFields.find(f => f.label === 'Telefone')!.value = response.telefone;
    });
  }

  coletarDadosAtualizados(): DadosUsuario {
    return {
      nome: this.formFields.find(f => f.label === 'Nome')?.value || '',
      email: this.formFields.find(f => f.label === 'Email')?.value || '',
      numero: this.formFields.find(f => f.label === 'Telefone')?.value || '',
      genero: this.formFields.find(f => f.label === 'Gênero')?.value || '',
      preferencia: this.formFields.find(f => f.label === 'Preferência')?.value || ''
    };
  }
  
  salvarAlteracoes() {
    const dados = this.coletarDadosAtualizados();
  
    const formData = new FormData();
    formData.append('nome', dados.nome);
    formData.append('email', dados.email);
    formData.append('numero', dados.numero);
    formData.append('genero', dados.genero);
    formData.append('preferencia', dados.preferencia);
  
    if (this.fotoArquivo) {
      formData.append('foto', this.fotoArquivo);
    }
  
    this.dadosService.updateDadosUsuario(formData, 7).subscribe(() => {
      this.getDadosUsuario(1); 
      this.carregarFoto(1);
    });
  }  

  carregarFoto(id: number) {
    this.dadosService.getFoto(id).subscribe(blob => {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoUrl = reader.result as string;
      };
      reader.readAsDataURL(blob);
    });
  }
}
