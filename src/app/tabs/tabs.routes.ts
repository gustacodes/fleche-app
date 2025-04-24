import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: 'fleche',
    component: TabsPage,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('../components/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'cadastro',
        loadComponent: () => 
          import('../components/cadastro/cadastro.component').then((m) => m.CadastroComponent),
      },
      {
        path: 'tela-principal/:id',
        loadComponent: () => 
          import('../components/tela-principal/tela-principal.component').then((m) => m.TelaPrincipalComponent),

      },
      {
        path: 'meus-dados',
        loadComponent: () => 
          import('../components/meus-dados/meus-dados.component').then((m) => m.MeusDadosComponent),
        canActivate: [AuthGuard],
        data: { role: 'USER' } 
      },
      {
        path: 'bares',
        loadComponent: () => 
          import('../components/bares/bares.component').then((m) => m.BaresComponent),
        canActivate: [AuthGuard],
        data: { role: 'USER' } 
      },
      {
        path: 'auth-bar',
        loadComponent: () => 
          import('../components/auth-bar/auth-bar.component').then((m) => m.AuthBarComponent),
        canActivate: [AuthGuard],
        data: { role: 'USER' } 
      },
      {
        path: '**',
        redirectTo: '/fleche/login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/fleche/login',
    pathMatch: 'full',
  },
];
