import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = "http://localhost:4000/users/";

  constructor() { }

  getUser(id: string){
    return axios.get(this.apiUrl + id)
    .then(res => {
      return 'OK';
    })
  }
}
