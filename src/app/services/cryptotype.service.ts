import { Injectable } from '@angular/core';
import { CryptoType } from '../models/crypto-type.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CryptoTypeService {

  apiUrl = 'http://localhost:4000/cryptotype/';

  constructor(private http: HttpClient) { }

  getAllCryptos(): Observable<CryptoType[]> {
    return this.http.get<CryptoType[]>(this.apiUrl).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  post(cryptoType: CryptoType): Observable<CryptoType> {
    return this.http.post<CryptoType>(this.apiUrl, cryptoType).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  getCrypto(name: string): Observable<CryptoType> {
    return this.http.get<CryptoType>(this.apiUrl + name).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
