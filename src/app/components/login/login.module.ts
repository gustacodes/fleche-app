import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginPageModule {}
