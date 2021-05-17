import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getAllUser(): Promise<User[]> {

    return axios.get('http://localhost:4000/users')
      .then(rest => rest.data)
      // Mapear array
      .then(UsersBeforeClean => UsersBeforeClean.map((m: any) => {

        return {

          username: m.username,
          name: m.name,
          email: m.email

        }
      }))
  }
}

export interface User {

  username: string,
  name: string,
  email: string
}