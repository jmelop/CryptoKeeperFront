import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = 'http://localhost:4000/users/';

  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + id).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
