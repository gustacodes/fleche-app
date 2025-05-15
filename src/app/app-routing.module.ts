import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./components/cadastro/cadastro.component').then((m) => m.CadastroComponent),
  },
  {
    path: 'tela-principal/:id',
    loadComponent: () =>
      import('./components/tela-principal/tela-principal.component').then((m) => m.TelaPrincipalComponent),
    canActivate: [AuthGuard],
    data: { role: 'USER' },
  },
  {
    path: 'meus-dados',
    loadComponent: () =>
      import('./components/meus-dados/meus-dados.component').then((m) => m.MeusDadosComponent),
    canActivate: [AuthGuard],
    data: { role: 'USER' },
  },
  {
    path: 'bares',
    loadComponent: () =>
      import('./components/bares/bares.component').then((m) => m.BaresComponent),
    canActivate: [AuthGuard],
    data: { role: 'USER' },
  },
  {
    path: 'auth-bar',
    loadComponent: () =>
      import('./components/auth-bar/auth-bar.component').then((m) => m.AuthBarComponent),
    canActivate: [AuthGuard],
    data: { role: 'USER' },
  },
  {
    path: 'meu-perfil/:id',
    loadComponent: () =>
      import('./components/meu-perfil/meu-perfil.component').then((m) => m.MeuPerfilComponent),
    canActivate: [AuthGuard],
    data: { role: 'USER' },
  },
  {
    path: 'sem-fleche',
    loadComponent: () =>
      import('./components/sem-fleche/sem-fleche.component').then((m) => m.SemFlecheComponent),
    canActivate: [AuthGuard],
    data: { role: 'USER' },
  },
  {
  path: '',
  redirectTo: 'login',
  pathMatch: 'full',
},

  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
