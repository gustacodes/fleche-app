import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewEncapsulation } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './services/authservice.service';
import { jwtDecode } from 'jwt-decode';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CustomTabBarComponent } from './components/custom-tab-bar/custom-tab-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [CommonModule, IonicModule, RouterModule, CustomTabBarComponent ],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  showTabs = true;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const noTabsRoutes = [
          '/login',
          '/cadastro'
        ];

        this.showTabs = !noTabsRoutes.some(route =>
          this.router.url.startsWith(route)
        );
      }
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      this.authService.setUserFromToken(decoded);
    }
  }
}
