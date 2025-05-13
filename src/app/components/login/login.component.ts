import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservice.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { BaresService } from 'src/app/services/bares.service';

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

  constructor(private authService: AuthService, private router: Router, private toastController: ToastController, private usuarioService: UsuarioService, private baresService: BaresService) { }

  ngOnInit(): void { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Login ou senha inválidas!',
      duration: 2000,
      position: 'top',
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  login(telefone: string, senha: string) {
    const dados = {
      telefone: telefone,
      senha: senha
    };
  
    this.authService.login(dados).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);  
        const decodedToken: any = jwtDecode(res.token);
        this.authService.setUserFromToken(decodedToken);

        this.baresService.getVerificaSeUsuarioEstaOnline(decodedToken.id).subscribe(res => {         
          if (res.message === "ONLINE") {
            this.router.navigate(['fleche/tela-principal/', decodedToken.id])
            return;
          }
        })

        if (this.usuarioService.getFoto(decodedToken.id) != null) {          
          this.router.navigate(['fleche/bares']);
        } else {        
          this.router.navigate(['fleche/meu-perfil', decodedToken.id]);
        }
      },
      error: (err) => {
        // this.presentToast();
        console.error('Erro no login', err);
      }
    });
  }

  irParaCadastro() {
    this.router.navigate(['fleche/cadastro']);
  }

}
