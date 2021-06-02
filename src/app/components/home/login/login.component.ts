import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  newLogin: User = { name: 'Pepe', email: '', password: '', role:'user' };

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.newLogin).then( res => {
      if(res){
        this.router.navigateByUrl('/cryptos')
      }
    })
  }

}
