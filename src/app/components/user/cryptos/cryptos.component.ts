import { Component, OnInit } from '@angular/core';
import { CryptosService } from '../../../services/cryptos.service';
import { Crypto } from '../../../models/crypto.model';
import { CryptoTypeService } from 'src/app/services/cryptotype.service';
import { CryptoType } from 'src/app/models/crypto-type.model';

@Component({
  selector: 'app-cryptos',
  templateUrl: './cryptos.component.html',
  styleUrls: ['./cryptos.component.css']
})
export class CryptosComponent implements OnInit {

  cryptos: Crypto[] = [];
  cryptoTypes: CryptoType[] = [];
  findCrypto: string = '';
  newCrypto: Crypto = new Crypto();
  newCryptoType: CryptoType = new CryptoType();
  numberCryptos = 0;
  moneySpend = 0;
  moneyReturned = 0;
  imgRoute = '../../../../assets/crypto-logos/';
  newCoin: boolean = false;

  constructor(private cryptoServices: CryptosService, private cryptoTypeService: CryptoTypeService) { }

  ngOnInit(): void {
    this.cryptoServices.getAllCryptos().then(cryptos => {
      this.cryptos = cryptos;
      this.getCryptosData();
    });
    this.cryptoTypeService.getAllCryptos().then(cryptoTypes => {
      this.cryptoTypes = cryptoTypes;
    });
    const avatar = window.document.getElementById('avatar');
    if (avatar !== null) {
      avatar.setAttribute('src', this.imgRoute + 'BTC' + '.png');
    }
  }

  editState(crypto: Crypto) {
    this.cryptos.map((u: Crypto) => {
      u.editable = false;
      crypto.editable = true;
    });
  }

  addCrypto() {
    if (!this.newCoin) {
      this.cryptoServices.post(this.newCrypto)
        .then(crypto => {
          if (typeof crypto !== undefined) {
            this.cryptos.push(crypto);
            this.newCrypto = new Crypto();
            this.newCoin = true;
            this.getCryptosData();
          }
        });
    } else {
      this.cryptoTypeService.post(this.newCryptoType)
        .then(crypto => {
          if (typeof crypto !== undefined) {
            this.cryptoTypes.push(crypto);
            this.newCryptoType = new CryptoType();
            this.newCoin = false;
          }
        })
    }
  }

  getCrypto() {
    this.cryptoServices.getCrypto(this.findCrypto);
  }

  updateCrypto(crypto: Crypto) {
    crypto.editable = false;
    this.cryptoServices.updateCrypto(crypto._id!, crypto);
  }

  deleteCrypto(crypto: Crypto) {
    this.cryptoServices.deleteCrypto(crypto._id!)
      .then(() => {
        const cryptosFiltered = this.cryptos.filter((cryp: Crypto) => cryp._id !== crypto._id);
        this.cryptos = cryptosFiltered;
        this.getCryptosData();
      });
  }

  getCryptosData() {
    const uniqueCryptos: string[] = [];
    this.cryptos.map(crypto => {
      const exist = uniqueCryptos.find(unique => unique === crypto.crypto);
      if (crypto.operation == 'Buy') {
        this.moneySpend += crypto.price;
      } else {
        this.moneyReturned += crypto.price;
      }
      if (!exist) {
        uniqueCryptos.push(crypto.crypto);
      }
    });
    this.numberCryptos = uniqueCryptos.length;
  }

  onChangeCrypto(crypto: string) {
    const avatar = window.document.getElementById('avatar');
    if (avatar !== null) {
      avatar.setAttribute('src', this.imgRoute + crypto + '.png');
    }
  }
}
