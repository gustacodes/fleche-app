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
