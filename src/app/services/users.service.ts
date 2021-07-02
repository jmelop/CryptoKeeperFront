import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = "http://localhost:4000/users/";


  constructor() { }

  addUser(user: User) {
    return axios.post(this.apiUrl, user)
      .then(res => {
        return 'OK';
      })
  }

  getUser(id: string){
    return axios.get(this.apiUrl + id)
    .then(res => {
      return 'OK';
    })
  }
}