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

  newLogin: User = { name: '', email: '', password: '', role: '' };

  ngOnInit(): void {
    if (this.cookieService.get('token_access')) {
      this.router.navigateByUrl('/cryptos');
    }
  }

  login() {
    this.authService.login(this.newLogin).then(res => {
      if (res) {
        const token = res.token;
        this.cookieService.set('token_access', token, 4, '/');
        this.router.navigateByUrl('/cryptos');
      }
    });
  }

}
