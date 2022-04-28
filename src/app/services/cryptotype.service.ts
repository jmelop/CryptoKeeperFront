import { Injectable } from '@angular/core';
import { CryptoType } from '../models/crypto-type.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CryptoTypeService {

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.cookieService.get('token_access')
  });

  private apiUrl = 'http://localhost:4000/cryptotype/';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllCryptos(): Observable<CryptoType[]> {
    return this.http.get<CryptoType[]>(this.apiUrl, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  post(cryptoType: CryptoType): Observable<CryptoType> {
    return this.http.post<CryptoType>(this.apiUrl, cryptoType, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  getCrypto(name: string): Observable<CryptoType> {
    return this.http.get<CryptoType>(this.apiUrl + name, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
