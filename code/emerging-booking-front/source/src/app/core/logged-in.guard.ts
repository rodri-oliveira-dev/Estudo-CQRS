import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppSession } from './app-session';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router) { }
  /**
   * O método "chama" o método isLoggedIn() que está no componente AppSession
   * Retornando true caso o usuario esteja logado ou redirecionando o usuário para a rota de login
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return AppSession.isLoggedIn();// ? true : this.router.parseUrl('/login');
  }
}
