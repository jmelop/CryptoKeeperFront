import { Injectable } from '@angular/core';
import { CryptoType } from '../models/crypto-type.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CryptoTypeService {
  private apiUrl = 'http://localhost:4000/cryptotype/';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private createHeaders(): HttpHeaders {
    const token = this.cookieService.get('token_access');

    if (token && token !== 'undefined') {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    } else {
      throw new Error('Token is not available');
    }
  }

  getAllCryptos(): Observable<CryptoType[]> {
    return this.http
      .get<CryptoType[]>(this.apiUrl, { headers: this.createHeaders() })
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  post(cryptoType: CryptoType): Observable<CryptoType> {
    return this.http
      .post<CryptoType>(this.apiUrl, cryptoType, { headers: this.createHeaders() })
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  getCrypto(name: string): Observable<CryptoType> {
    return this.http
      .get<CryptoType>(this.apiUrl + name, { headers: this.createHeaders() })
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }
}
