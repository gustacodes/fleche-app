import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AuthService } from 'src/app/services/authservice.service';
import { BaresService } from 'src/app/services/bares.service';

@Component({
  selector: 'app-auth-bar',
  templateUrl: './auth-bar.component.html',
  styleUrls: ['./auth-bar.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AuthBarComponent implements OnInit {
  scanning = false;

  constructor(private baresService: BaresService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  async scan() {
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (!status.granted) return;

    this.scanning = true;
    document.body.classList.add('scanner-active');
    await BarcodeScanner.prepare();
    await BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();

    this.scanning = false;
    BarcodeScanner.showBackground();
    document.body.classList.remove('scanner-active');

    this.authService.usuario.subscribe(res => {
      if (!result.hasContent || !result.content) {
        console.log('Nenhum conteúdo encontrado no QR Code.');
        return;
      }

      const dados = {
        usuarioId: res.id,
        qrCode: result.content
      };
      
      this.baresService.postCheckIn(dados).subscribe({
        next: response => {
          if (response.message === "Check-in realizado!") {
            this.router.navigate(['fleche/tela-principal/', res.id]);
          } else {
            console.error('Falha na autenticação!');
          }
        },
        error: err => {
          const errorMsg = err.error?.message || JSON.stringify(err.error) || 'Erro desconhecido';
          console.error('Erro ao fazer check-in:', errorMsg);
        }
      });

    });


  }


}
