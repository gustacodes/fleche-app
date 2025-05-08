import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservice.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule,
    CommonModule,
    FormsModule],
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private toastController: ToastController, private usuarioService: UsuarioService) { }

  ngOnInit(): void { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Bem-vindo de volta!',
      duration: 2000,
      position: 'top',
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  login(telefone: string, senha: string) {
    const credentials = {
      telefone: telefone,
      senha: senha
    };
  
    this.authService.login(credentials).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);  
        const decodedToken: any = jwtDecode(res.token);
        this.authService.setUserFromToken(decodedToken);
        if(this.usuarioService.getFoto(decodedToken.id) != null) {          
          this.router.navigate(['fleche/tela-principal', decodedToken.id]);
        } else {          
          this.presentToast();
          this.router.navigate(['fleche/meu-perfil', decodedToken.id]);
        }
      },
      error: (err) => {
        console.error('Erro no login', err);
      }
    });
  }

  irParaCadastro() {
    this.router.navigate(['fleche/cadastro']);
  }

}
