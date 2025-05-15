import { NgModule } from '@angular/core';
import { CustomTabBarComponent } from './components/custom-tab-bar/custom-tab-bar.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [CustomTabBarComponent, AppComponent],
  exports: [CustomTabBarComponent]
})
export class AppModule {}
