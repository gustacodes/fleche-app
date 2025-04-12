import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    // outros módulos necessários
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
