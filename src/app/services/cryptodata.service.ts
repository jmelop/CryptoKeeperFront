import { Injectable } from '@angular/core';
import axios from 'axios';
import { CryptoData } from '../models/crypto-data.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoDataService {
  apiUrl = 'http://localhost:4000/cryptodata/';

  constructor() { }

  getAllCryptos(): Promise<CryptoData[]> {
    return axios.get(this.apiUrl).then(rest => rest.data);
  }

  post(crypto: CryptoData) {
    return axios.post(this.apiUrl, crypto).then(res => {
      return res.data;
    }).catch((err) => { throw err });
  }

  getCrypto(name: string): Promise<CryptoData> {
    return axios.get(this.apiUrl + name).then(rest =>
      rest.data).then(crypto => {
        return {
          name: crypto.name,
          shortname: crypto.shortname
        };
      });
  }
}
