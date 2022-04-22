import { Injectable } from '@angular/core';
import axios from 'axios';
import { CryptoType } from '../models/crypto-type.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoTypeService {
  apiUrl = 'http://localhost:4000/cryptotype/';

  constructor() { }

  getAllCryptos(): Promise<CryptoType[]> {
    return axios.get(this.apiUrl).then(rest => rest.data);
  }

  post(cryptoType: CryptoType) {
    return axios.post(this.apiUrl, cryptoType).then(res => {
      return res.data;
    }).catch((err) => { throw err });
  }

  getCrypto(name: string): Promise<CryptoType> {
    return axios.get(this.apiUrl + name).then(rest =>
      rest.data).then(crypto => {
        return {
          name: crypto.name,
          shortname: crypto.shortname
        };
      });
  }
}
