import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private usersService: UsersService) { }

  newUser : User = {name: '', email: '', password: '', role: 'user'}


  ngOnInit(): void {
  }

  saveUser(){
    this.usersService.addUser(this.newUser).then( u => {
      if(u === 'OK'){
        alert('Usuario registrado');
      }
    })
  }

}
