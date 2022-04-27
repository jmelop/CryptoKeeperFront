import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiUrl = 'http://localhost:4000/';

    constructor(private http: HttpClient) { }

    login(user: User): Observable<any> {
        return this.http.post<User>(this.apiUrl + 'login', user).pipe(
            catchError(e => {
                return throwError(e);
            })
        );
    }

    register(user: User) {
        return axios.post(this.apiUrl + 'register', user).then(u => {
            if (u.data) {
                return 'OK';
            } else {
                return 'Error';
            }
        });
    }
}
