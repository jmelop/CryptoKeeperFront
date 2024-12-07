import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  newLogin: User = new User();
  loginError = false;
  errorMessage: string = '';

  ngOnInit(): void {
    if (this.cookieService.get('token_access')) {
      this.router.navigateByUrl('/cryptos');
    }
  }

  public login(): void {
    if (!this.newLogin.email || !this.newLogin.password) {
      this.loginError = true;
      this.errorMessage = 'Email and password are required';
      return;
    }

    this.authService.login(this.newLogin).subscribe({
      next: (response) => {
        if (response && response.token) {
          const token = response.token;
          this.cookieService.set('token_access', token, {
            expires: 4,
            path: '/',
            secure: true,
            sameSite: 'Strict',
          });

          this.router.navigateByUrl('/cryptos');
        } else {
          this.loginError = true;
          this.errorMessage = 'Invalid response from server';
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.loginError = true;
        this.errorMessage = err;
      },
    });
  }

  resetError(): void {
    this.loginError = false;
  }

  isFormInvalid(): boolean {
    return !this.newLogin.email || !this.newLogin.password;
  }
}
