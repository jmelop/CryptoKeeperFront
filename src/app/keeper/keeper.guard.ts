import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class KeeperGuard {
  constructor(private cookieService: CookieService, private router: Router) {}

  private redirect(): UrlTree {
    return this.router.createUrlTree(['/', 'login']);
  }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const cookie = this.cookieService.check('token_access');
    const checkCookie = this.cookieService.get('token_access');

    if (cookie && checkCookie !== 'undefined') {
      return true;
    } else {
      return this.redirect();
    }
  }
}
