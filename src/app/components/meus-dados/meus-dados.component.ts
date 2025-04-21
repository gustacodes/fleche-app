import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DadosUsuario } from 'src/app/interfaces/usuario-dados';
import { MeusDadosService } from 'src/app/services/meus-dados.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MeusDadosComponent implements OnInit {
  fotoUrl: string | null = null;
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
      label: 'Gênero',
      type: 'select',
      options: ['MASCULINO', 'FEMININO', 'OUTRO'],
      editable: false,
      value: '',
    },
    {
      label: 'Preferência',
      type: 'select',
      options: ['HOMENS', 'MULHERES', 'AMBOS'],
      editable: false,
      value: '',
    }
  ];
  
  constructor(private dadosService: MeusDadosService) {}

  ngOnInit() {
    this.carregarFoto(7);
    this.getDadosUsuario(7);
  }

  toggleEdit(field: any) {
    field.editable = !field.editable;
  }

  getDadosUsuario(id: number) {
    this.dadosService.getDadosUsuario(id).subscribe(response => {      
      this.formFields.find(f => f.label === 'Nome')!.value = response.nome;
      this.formFields.find(f => f.label === 'Email')!.value = response.email;
      this.formFields.find(f => f.label === 'Telefone')!.value = response.numero;
      this.formFields.find(f => f.label === 'Gênero')!.value = response.genero;
      this.formFields.find(f => f.label === 'Preferência')!.value = response.preferencia;
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
    const dadosAtualizados = this.coletarDadosAtualizados();  
    this.dadosService.updateDadosUsuario(dadosAtualizados, 7).subscribe();
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
