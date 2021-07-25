import { rendererTypeName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Crypto } from '../models/crypto.model';

@Injectable({
  providedIn: 'root'
})
export class CryptosService {
  apiUrl = "http://localhost:4000/cryptos/";

  constructor() { }

  getAllCryptos(): Promise<Crypto[]> {
    return axios.get(this.apiUrl + '?limit=10&offset=20')
      .then(rest => rest.data)
  }

  post(crypto: Crypto) {
    return axios.post(this.apiUrl, crypto)
      .then(res => {
        return res.data;
      }).catch((err) => { throw err })
  }


  getCrypto(id: string): Promise<Crypto> {

    return axios.get(this.apiUrl + id)
      .then(rest => rest.data).then(m => {

        return {
          crypto: m.crypto,
          amount: m.amount,
          price: m.price,
          website: m.website,
          date: m.date,
          operation: m.operation,
          description: m.description
        }
      })
  }

  updateCrypto(id: string, crypto: Crypto): Promise<Crypto> {
    return axios.patch(this.apiUrl + id, crypto)
  }

  deleteCrypto(id: string) {
    return axios.delete(this.apiUrl + id)
      .then(res => {
        res.data;
        return 'OK';
      })
  }


}



