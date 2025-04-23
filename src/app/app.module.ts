import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginPageModule } from './components/login/login.module';
import { CadastroPageModule } from './components/cadastro/cadastro.module';
import { MeusDadosModule } from './components/meus-dados/meus-dados.module';
import { AuthenticationInterceptorProvider, AuthInterceptor } from './components/interceptor/auth.interceptor';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, LoginPageModule, CadastroPageModule, MeusDadosModule],
  providers: [CommonModule, AuthenticationInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
