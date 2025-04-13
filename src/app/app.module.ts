import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginPageModule } from './components/login/login.module';
import { CadastroPageModule } from './components/cadastro/cadastro.module';
import { MeusDadosModule } from './components/meus-dados/meus-dados.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LoginPageModule, CadastroPageModule, MeusDadosModule],
  providers: [
    provideHttpClient() 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
