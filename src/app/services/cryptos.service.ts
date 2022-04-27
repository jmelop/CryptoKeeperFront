import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Crypto } from '../models/crypto.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CryptosService {

  apiUrl = 'http://localhost:4000/cryptos/';

  constructor(private http: HttpClient) { }

  getAllCryptos(): Observable<Crypto[]> {
    return this.http.get<Crypto[]>(this.apiUrl + '?limit=10&offset=20')
      .pipe(
        catchError(e => {
          return throwError(e);
        })
      );
  }

  post(crypto: Crypto): Observable<Crypto> {
    return this.http.post<Crypto>(this.apiUrl, crypto).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  getCrypto(id: string): Observable<Crypto> {
    return this.http.get<Crypto>(this.apiUrl + id).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  updateCrypto(id: string, crypto: Crypto): Observable<Crypto> {
    return this.http.patch<Crypto>(this.apiUrl + id, crypto).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  deleteCrypto(id: string): Observable<Crypto> {
    return this.http.delete<Crypto>(this.apiUrl + id).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
