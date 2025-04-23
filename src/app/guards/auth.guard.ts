import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (!token) {
      // Se não houver token, redireciona para login
      return this.redirectToLogin();
    }

    try {
      const decoded: any = jwtDecode(token); // Decodificando o token
      // ✅ Verifica se o token expirou
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        // Se o token expirou, redireciona para login
        return this.redirectToLogin();
      }

      // ✅ Verifica role, se exigido na rota
      const requiredRole = route.data['role'];
      if (requiredRole && !this.hasRole(decoded, requiredRole)) {
        // Se a role não corresponder, redireciona para acesso negado
        return this.router.parseUrl('/fleche/acesso-negado');
      }

      // Se tudo estiver correto, permite o acesso
      return true;

    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return this.redirectToLogin(); // Redireciona para login em caso de erro
    }
  }

  private hasRole(decoded: any, role: string): boolean {
    // Verifica se a role no token corresponde ao papel exigido
    const tokenRole = decoded.ROLE; // Ajuste para pegar o valor da role no token
    return tokenRole === role; // Comparando a role no token com a exigida pela rota
  }

  private redirectToLogin(): UrlTree {
    return this.router.parseUrl('/fleche/login'); // Redireciona para a página de login
  }
}
