import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservice.service';
import { BaresService } from 'src/app/services/bares.service';
import { BarcodeScanner, BarcodeFormat, ScanResult } from '@capacitor-mlkit/barcode-scanning';


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
    try {
      this.scanning = true;
      document.body.classList.add('scanner-active');

      await BarcodeScanner.startScan({
        formats: [BarcodeFormat.QrCode],
      });

      const listener = await BarcodeScanner.addListener('barcodesScanned', (result) => {
        if (!result.barcodes || result.barcodes.length === 0) {
          console.log('Nenhum QR Code detectado.');
          return;
        }

        const qrCodeContent = result.barcodes[0].rawValue;
        if (!qrCodeContent) {
          console.log('QR Code sem conteúdo.');
          return;
        }

        BarcodeScanner.stopScan();
        this.scanning = false;
        document.body.classList.remove('scanner-active');

        this.authService.usuario.subscribe(res => {
          const dados = {
            usuarioId: res.id,
            qrCode: qrCodeContent,
          };

          this.baresService.postCheckIn(dados).subscribe({
            next: response => {
              if (response.message === "Check-in realizado!") {
                this.router.navigate(['tela-principal/', res.id]);
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

        listener.remove();
      });

    } catch (err) {
      this.scanning = false;
      document.body.classList.remove('scanner-active');
      console.error('Erro ao escanear QR Code:', err);
    }
  }

  ngOnDestroy() {
    BarcodeScanner.stopScan();
  }

}
