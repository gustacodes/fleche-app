import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

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
        
      },
      {
        path: 'bares',
        loadComponent: () => 
          import('../components/bares/bares.component').then((m) => m.BaresComponent),
        
      },
      {
        path: '',
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
