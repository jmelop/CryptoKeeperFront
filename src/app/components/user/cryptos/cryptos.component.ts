import { Component, OnInit } from '@angular/core';
import { CryptosService } from '../../../services/cryptos.service';
import { Crypto } from '../../../models/crypto.model';

@Component({
  selector: 'app-cryptos',
  templateUrl: './cryptos.component.html',
  styleUrls: ['./cryptos.component.css']
})
export class CryptosComponent implements OnInit {

  cryptos: Crypto[] = [];
  findCrypto: string = '';
  newCrypto: Crypto = { crypto: '', amount: 0, price: 0, website: '', date: '', operation: '', description: '' };

  constructor(private cryptoServices: CryptosService) {}


  ngOnInit(): void {
    this.cryptoServices.getAllCryptos().then(u => { 
      this.cryptos = u; 
      console.log(this.getNumberCryptos());
    })
  }

  editState(crypto: any) {
    this.cryptos.map((u: any) => {
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
          this.newCrypto = { crypto: '', amount: 0, price: 0, website: '', date: '', operation: '', description: '' };
        }
      })
  }

  getCrypto() {
    this.cryptoServices.getCrypto(this.findCrypto);
  }

  getNumberCryptos(){
    let uniqueCryptos: String[] = [];

    this.cryptos.map(crypto => {
      const exist = uniqueCryptos.find(unique => unique === crypto.crypto);

      if(!exist){
        uniqueCryptos.push(crypto.crypto);
      }
    });
    
    return uniqueCryptos.length;
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
