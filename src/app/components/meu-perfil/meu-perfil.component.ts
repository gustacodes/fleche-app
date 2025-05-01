import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DadosUsuario } from 'src/app/interfaces/usuario-dados';
import { AuthService } from 'src/app/services/authservice.service';
import { MeusDadosService } from 'src/app/services/meus-dados.service';
import { IonicModule } from '@ionic/angular';
import { MeuPerfil } from 'src/app/interfaces/meu-perfil';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MeuPerfilComponent  implements OnInit {
  fotoUrl: string | null = null;
  fotoArquivo: File | null = null;
  idUsuario?: number; 

  formFields = [    
    {
      label: 'Gênero',
      type: 'select',
      options: ['HETEROSSEXUAL', 'HOMOSSEXUAL', 'TRANSSEXUAL', 'BISSEXUAL'],
      value: '',
    },
    {
      label: 'Preferência',
      type: 'select',
      options: ['HOMENS', 'MULHERES', 'TODOS'],
      value: '',
    },
    {
      label: 'Bio',
      placeholder: 'Uma breve descrição sobre você :)',
      type: 'text-area',
      value: '',
    },
  ];
  
  constructor(private dadosService: MeusDadosService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.usuario.subscribe(res => {
      this.idUsuario = res.id;
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

  getDadosUsuario(id: number | undefined) {    
    this.dadosService.getDadosUsuario(id).subscribe(response => {      
      this.formFields.find(f => f.label === 'Gênero')!.value = response.genero;
      this.formFields.find(f => f.label === 'Preferência')!.value = response.preferencia;
      this.formFields.find(f => f.label === 'Bio')!.value = response.bio;
    });
  }

  coletarDadosAtualizados(): MeuPerfil {
    return {
      genero: this.formFields.find(f => f.label === 'Gênero')?.value || '',
      preferencia: this.formFields.find(f => f.label === 'Preferência')?.value || '',
      bio: this.formFields.find(f => f.label === 'Bio')?.value || '',
      id: 2
    };
  }
  
  salvarAlteracoes() {
    const dados = this.coletarDadosAtualizados();
    if (this.idUsuario !== undefined) {
      dados.id = this.idUsuario;
    }
  
    const formData = new FormData();
  
    const perfilBlob = new Blob(
      [JSON.stringify(dados)],
      { type: 'application/json' }
    );
    formData.append('perfil', perfilBlob);
  
    if (this.fotoArquivo) {
      formData.append('foto', this.fotoArquivo);
    }
  
    this.dadosService.adicionarPerfil(formData).subscribe(() => {
      this.getDadosUsuario(this.idUsuario);
      this.carregarFoto(this.idUsuario);
    });
  }
  

  carregarFoto(id: number | undefined) {
    this.dadosService.getFoto(id).subscribe(blob => {
      if (blob && blob.size > 0) {
        const reader = new FileReader();
        reader.onload = () => {
          this.fotoUrl = reader.result as string;
        };
        reader.readAsDataURL(blob);
      } else {
        this.fotoUrl = 'assets/img/profile-icon.jpg';
      }
    }, error => {
      console.error('Erro ao carregar foto:', error);
      this.fotoUrl = 'assets/img/profile-icon.jpg';
    });
  }
  
}
