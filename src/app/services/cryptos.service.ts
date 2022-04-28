import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Crypto } from '../models/crypto.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CryptosService {

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.cookieService.get('token_access')
  });

  private apiUrl = 'http://localhost:4000/cryptos/';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllCryptos(): Observable<Crypto[]> {
    return this.http.get<Crypto[]>(this.apiUrl + '?limit=10&offset=20', { headers: this.httpHeaders })
      .pipe(
        catchError(e => {
          return throwError(e);
        })
      );
  }

  post(crypto: Crypto): Observable<Crypto> {
    return this.http.post<Crypto>(this.apiUrl, crypto, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  getCrypto(id: string): Observable<Crypto> {
    return this.http.get<Crypto>(this.apiUrl + id, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  updateCrypto(id: string, crypto: Crypto): Observable<Crypto> {
    return this.http.patch<Crypto>(this.apiUrl + id, crypto, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  deleteCrypto(id: string): Observable<Crypto> {
    return this.http.delete<Crypto>(this.apiUrl + id, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
