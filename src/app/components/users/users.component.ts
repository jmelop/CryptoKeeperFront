import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : any = [];

  constructor( private userServices:UsersService) { 

    this.userServices.getAllUser().then( u => {
       console.log(u);
       this.users = u;
    })
  }

  ngOnInit(): void {
  }

}
