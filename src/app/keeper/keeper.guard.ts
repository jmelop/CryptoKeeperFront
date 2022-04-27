import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class KeeperGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) { }

  redirect(flag: boolean): void {
    if (!flag) {
      this.router.navigate(['/', 'login']);
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie = this.cookieService.check('token_access');
    const checkCookie = this.cookieService.get('token_access');
    if (checkCookie !== 'undefined') {
      this.redirect(cookie);
    } else {
      this.redirect(false);
    }
    return cookie;
  }
}
