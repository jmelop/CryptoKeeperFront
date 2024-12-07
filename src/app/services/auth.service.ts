import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:4000/';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<ApiResponseLogin> {
    return this.http.post<ApiResponseLogin>(this.apiUrl + 'login', user).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }

  register(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl + 'register', user).pipe(
      catchError((e) => {
        return throwError(() => e);
      })
    );
  }
  
}

export class ApiResponseLogin {
  success: boolean;
  message: string;
  error: any | null;
  token: string;
}
