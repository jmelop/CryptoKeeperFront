import { Component, OnInit } from '@angular/core';
import { CryptosService } from '../services/cryptos.service';
import { Crypto } from '../models/crypto.model';



@Component({
  selector: 'app-cryptos',
  templateUrl: './cryptos.component.html',
  styleUrls: ['./cryptos.component.css']
})
export class CryptosComponent implements OnInit {

  uno: any;
  cryptos: any = [];
  findCrypto: string = '';
  newCrypto: Crypto = { crypto: '', price: 0, weekPriceChange: '', marketCap: '' };
  newUpdatedCrypto: Crypto = { crypto: '', price: 0, weekPriceChange: '', marketCap: '' };
  permission = true;

  constructor(private cryptoServices: CryptosService) {

  }


  ngOnInit(): void {
    this.cryptoServices.getAllCryptos().then(u => { this.cryptos = u; })
  }

  editState(crypto: any) {
    this.cryptos.map((u : any) => {
    u.editable = false
    crypto.editable = true;
    })
  }

  addCrypto() {
    let test1 = { ...this.newCrypto };
    this.cryptoServices.post(this.newCrypto)
      .then(u => {
        if (u === 'OK') {
          this.cryptos.push(test1);
          this.newCrypto = { crypto: '', price: 0, weekPriceChange: '', marketCap: '' };
        }
      })
  }

  getCrypto() {
    this.cryptoServices.getCrypto(this.findCrypto).then(u => {
      this.uno = u
      alert(this.uno.crypto)
    })
  }

  updateCrypto(crypto: any) {
    crypto.editable = false;
    this.cryptoServices.updateCrypto(crypto.crypto, crypto);
  }

  deleteCrypto(id: string) {
    this.cryptoServices.deleteCrypto(id)
      .then(u => {
        const cryptosFiltered = this.cryptos.filter((crypto: any) => crypto.crypto != id)
        this.cryptos = cryptosFiltered;
      })
  }
}
