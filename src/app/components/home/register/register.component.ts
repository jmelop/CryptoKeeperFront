import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  newUser: User = { name: '', email: '', password: '', role: 'user' }


  ngOnInit(): void {
  }

  saveUser() {
    this.authService.register(this.newUser).then(u => {
      if (u === 'OK') {
        alert('Usuario registrado');
      }
    })
  }
}
