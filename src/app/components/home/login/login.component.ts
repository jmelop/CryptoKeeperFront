import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  newLogin: User = new User();
  loginError = false;

  ngOnInit(): void {
    if (this.cookieService.get('token_access')) {
      this.router.navigateByUrl('/cryptos');
    }
  }
  
  public login(): void {
    this.authService.login(this.newLogin).subscribe(param => {
      if (param) {
        const token = param.token;
        this.cookieService.set('token_access', token, 4, '/');
        this.router.navigateByUrl('/cryptos');
      }
    }, () => {
      this.loginError = true;
    });
  }

}
