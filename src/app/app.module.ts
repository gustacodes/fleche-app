import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginPageModule } from './login/login.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LoginPageModule],
  providers: [
    provideHttpClient() 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
