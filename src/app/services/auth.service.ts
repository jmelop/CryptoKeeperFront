import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  apiUrl = "http://localhost:4000/";

  login(user: User){
    return axios.post(this.apiUrl+'login', user)
    .then( u => {
      return u.data;
    })
  }

}
