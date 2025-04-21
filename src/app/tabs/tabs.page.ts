import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar],
})
export class TabsPage implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  idUsuario: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {
    addIcons({ triangle, ellipse, square });
  }

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.paramMap.get('id');
  }

  meusDados() {
    this.router.navigate(['fleche/meus-dados']);
  }

  flechar() {
    this.router.navigate(['fleche/tela-principal', 4]);
  }
}
