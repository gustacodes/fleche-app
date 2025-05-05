import { Component, EnvironmentInjector, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None, 
  imports: [IonicModule, RouterModule]
})
export class TabsPage implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  idUsuario: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

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
