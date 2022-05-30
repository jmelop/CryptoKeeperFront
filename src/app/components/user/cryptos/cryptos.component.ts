import { Component, OnInit } from '@angular/core';
import { CryptosService } from '../../../services/cryptos.service';
import { Crypto } from '../../../models/crypto.model';
import { CryptoTypeService } from 'src/app/services/cryptotype.service';
import { CryptoType } from 'src/app/models/crypto-type.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cryptos',
  templateUrl: './cryptos.component.html',
  styleUrls: ['./cryptos.component.css']
})
export class CryptosComponent implements OnInit {

  cryptos: Crypto[] = [];
  cryptoTypes: CryptoType[] = [];
  findCrypto: string;
  newCrypto: Crypto = new Crypto();
  newCryptoType: CryptoType = new CryptoType();
  numberCryptos = 0;
  moneySpend = 0;
  moneyReturned = 0;
  imgRoute = '../../../../assets/crypto-logos/';
  newCoin = false;
  page = 1;

  constructor(private cryptoServices: CryptosService, private cryptoTypeService: CryptoTypeService) { }

  ngOnInit(): void {
    this.cryptoServices.getAllCryptos().subscribe(cryptos => {
      this.cryptos = cryptos;
      this.calculateCryptoData();
    });
    this.cryptoTypeService.getAllCryptos().subscribe(cryptoTypes => {
      this.cryptoTypes = cryptoTypes;
    });
    const avatar = window.document.getElementById('avatar');
    if (avatar !== null) {
      avatar.setAttribute('src', this.imgRoute + 'BTC' + '.png');
    }
  }

  public editState(crypto: Crypto): void {
    this.cryptos.map((u: Crypto) => {
      u.editable = false;
      crypto.editable = true;
    });
  }

  public handlePageChange(event: any): void {
    this.page = event;
    this.cryptos.map(crypto => {
      crypto.editable = false;
    });
  }

  public addCrypto(): void {
    this.cryptoServices.post(this.newCrypto).subscribe(crypto => {
      if (typeof crypto !== undefined) {
        this.cryptos.push(crypto);
        this.newCrypto = new Crypto();
        this.newCoin = true;
        this.calculateCryptoData();
        swal.fire('New record', 'New record added successfully', 'success');
      }
    }, () => {
      swal.fire('New record', 'Error adding a new record', 'error');
    });
  }

  public addCryptoType(): void {
    this.cryptoTypeService.post(this.newCryptoType)
      .subscribe(crypto => {
        if (typeof crypto !== undefined) {
          this.cryptoTypes.push(crypto);
          this.newCryptoType = new CryptoType();
          this.newCoin = false;
          swal.fire('New coin', 'New coin added successfully', 'success');
        }
      }, () => {
        swal.fire('New coin', 'Error adding a new coin', 'error');
      });
  }

  updateCrypto(crypto: Crypto): void {
    crypto.editable = false;
    this.cryptoServices.updateCrypto(crypto._id!, crypto).subscribe(() => {
      this.calculateCryptoData();
      swal.fire('Record updated', 'Record updated successfully', 'success');
    }, () => {
      swal.fire('Record updated', 'Error updated a record', 'error');
    });
  }

  deleteCrypto(crypto: Crypto): void {
    swal.fire({
      title: 'Do you want to delete the record?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cryptoServices.deleteCrypto(crypto._id!)
          .subscribe(() => {
            const cryptosFiltered = this.cryptos.filter((cryp: Crypto) => cryp._id !== crypto._id);
            this.cryptos = cryptosFiltered;
            this.calculateCryptoData();
            swal.fire('Record deleted', 'Record deleted successfully', 'success');
          }, () => {
            swal.fire('Record deleted', 'Error deleting a record', 'error');
          });
      }
    });
  }

  onChangeCrypto(crypto: string): void {
    const avatar = window.document.getElementById('avatar');
    if (avatar !== null) {
      avatar.setAttribute('src', this.imgRoute + crypto + '.png');
    }
  }

  private calculateCryptoData(): void {
    const uniqueCryptos: string[] = [];
    this.moneySpend = 0;
    this.moneyReturned = 0;
    this.cryptos.map(crypto => {
      const exist = uniqueCryptos.find(unique => unique === crypto.crypto);
      if (!exist) {
        uniqueCryptos.push(crypto.crypto);
      }
      if (crypto.operation === 'Buy') {
        this.moneySpend += crypto.price;
      } else {
        this.moneyReturned += crypto.price;
      }
    });
    this.numberCryptos = uniqueCryptos.length;
  }

  private getCrypto(): void {
    this.cryptoServices.getCrypto(this.findCrypto);
  }
  
}
