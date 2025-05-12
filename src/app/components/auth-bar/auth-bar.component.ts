import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-auth-bar',
  templateUrl: './auth-bar.component.html',
  styleUrls: ['./auth-bar.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AuthBarComponent {
  scanning = false;

  constructor() { }

  async scan() {
    console.log('Iniciando scan...');
    const status = await BarcodeScanner.checkPermission({ force: true });
    console.log('Permissão:', status.granted);
    if (!status.granted) return;

    this.scanning = true;
    document.body.classList.add('scanner-active'); 
    await BarcodeScanner.prepare();
    await BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan();

    this.scanning = false; 
    BarcodeScanner.showBackground();
    document.body.classList.remove('scanner-active');

    if (result.hasContent) {
      console.log('QR Code:', result.content);
    } else {
      console.log('Nenhum conteúdo encontrado');
    }
  }


}
