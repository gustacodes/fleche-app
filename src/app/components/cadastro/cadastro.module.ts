import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CadastroComponent } from './cadastro.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  declarations: [CadastroComponent]
})
export class CadastroPageModule {}
