import { Component, OnInit } from '@angular/core';
import { CryptosService } from '../../../services/cryptos.service';
import { Crypto } from '../../../models/crypto.model';
import { CryptoDataService } from 'src/app/services/cryptodata.service';
import { CryptoData } from 'src/app/models/crypto-data.model';

@Component({
  selector: 'app-cryptos',
  templateUrl: './cryptos.component.html',
  styleUrls: ['./cryptos.component.css']
})
export class CryptosComponent implements OnInit {

  cryptos: Crypto[] = [];
  cryptoData: CryptoData[] = [];
  findCrypto: string = '';
  newCrypto: Crypto = { crypto: '', amount: 0, price: 0, website: '', date: '', operation: '', description: '' };
  numberCryptos = 0;
  moneySpend = 0;
  imgRoute = '../../../../assets/crypto-logos/';

  constructor(private cryptoServices: CryptosService, private cryptoDataService: CryptoDataService) { }

  ngOnInit(): void {
    this.cryptoServices.getAllCryptos().then(u => {
      this.cryptos = u;
      this.getCryptosData();
    });
    this.cryptoDataService.getAllCryptos().then(u => {
      this.cryptoData = u;
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
    this.cryptoServices.post(this.newCrypto)
      .then(crypto => {
        if (typeof crypto !== undefined) {
          this.cryptos.push(crypto);
          this.newCrypto = { crypto: '', amount: 0, price: 0, website: '', date: '', operation: '', description: '' };
          this.getCryptosData();
        }
      });
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
    let count: number = 0;
    this.cryptos.map(crypto => {
      const exist = uniqueCryptos.find(unique => unique === crypto.crypto);
      count += Number(crypto.price);

      if (!exist) {
        uniqueCryptos.push(crypto.crypto);
      }
    });
    this.moneySpend = count;
    this.numberCryptos = uniqueCryptos.length;
  }

  onChangeCrypto(crypto: string) {
    const avatar = window.document.getElementById('avatar');
    if (avatar !== null) {
      avatar.setAttribute('src', this.imgRoute + crypto + '.png');
    }
  }
}
