import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  newLogin: User = { name: 'Pepe', email: '', password: '', role:'user' };

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.newLogin).then( res => {
      if(res){
        const p = res.token
        this.cookieService.set('token_access', p, 4, '/')
        this.router.navigateByUrl('/cryptos')
      }
    })
  }

}
