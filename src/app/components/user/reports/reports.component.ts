import { Component, OnInit } from '@angular/core';
import { CryptosService } from 'src/app/services/cryptos.service';
import { CryptoReport } from 'src/app/models/crypto-report.model';
import { GraphData } from 'src/app/models/graph-data.model';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  cryptos: any[] = [];
  newCrypto: CryptoReport = new CryptoReport();
  cryptoData: CryptoReport[] = [];
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  lastNumberMonths: number[] = [];
  lastStringMonths: string[] = [];
  profits: CryptoReport[] = [];
  profitsChartLabel: string[] = [];
  tempProfitData: GraphData = new GraphData();
  profitChartData: GraphData[] = [];
  profitChartLabels = this.lastStringMonths;
  profitChartOptions = {
    responsive: true,
  };

  // Doughnut
  public doughnutChartLabels: string[] = [];
  public doughnutChartDataset: ChartConfiguration<'doughnut'>['data']['datasets'];
  public doughnutChartType: ChartType = 'doughnut';

  // Radar
  public pieChartColors: Array<any> = [
    {
      backgroundColor: [
        'rgb(255, 205, 86)',
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
      ],
    },
  ];

  constructor(private cryptoServices: CryptosService) {}

  ngOnInit(): void {
    this.cryptoServices.getAllCryptos().subscribe((cryptos) => {
      this.cryptos = cryptos;
      this.getDate();
      this.getCryptosData();
      this.getCryptoDataChart();
      this.doughnutChartLabels = this.cryptoData.map((crypto) => crypto.crypto);
      this.doughnutChartDataset = this.cryptoData.map((crypto) => {
        return { data: [crypto.price], label: '' };
      });
    });
  }

  getCryptosData(): void {
    this.cryptos.map((crypto) => {
      const exist = this.cryptoData.find(
        (data) => data.crypto === crypto.crypto
      );
      if (exist && crypto.operation === 'Buy') {
        this.cryptoData.map((data) => {
          if (data.crypto === crypto.crypto) {
            data.price += crypto.price;
          }
        });
      } else if (crypto.operation === 'Buy') {
        this.newCrypto.crypto = crypto.crypto;
        this.newCrypto.price = crypto.price;
        this.cryptoData.push(this.newCrypto);
        this.newCrypto = new CryptoReport();
      }
    });
  }

  getCryptoDataChart(): void {
    this.cryptos.map((crypto) => {
      const cryptoDate = new Date(crypto.date).getMonth();
      const dateMatch = this.lastNumberMonths.find(
        (date) => date === cryptoDate
      );
      const exist = this.profits.find(
        (data) =>
          data.crypto === crypto.crypto &&
          new Date(data.date).getMonth() === cryptoDate
      );
      if (exist && dateMatch && crypto.operation === 'Buy') {
        this.profits.map((data) => {
          if (data.crypto === crypto.crypto) {
            data.price += crypto.price;
          }
        });
      } else if (dateMatch && crypto.operation === 'Buy') {
        this.newCrypto.crypto = crypto.crypto;
        this.newCrypto.price = crypto.price;
        this.newCrypto.date = crypto.date;
        this.profits.push(this.newCrypto);
        const existLabel = this.profitsChartLabel.find(
          (data) => data === crypto.crypto
        );
        if (!existLabel && this.profitsChartLabel.length <= 2) {
          this.profitsChartLabel.push(crypto.crypto);
        }
        this.newCrypto = new CryptoReport();
      }
    });
    this.getProfit();
  }

  getProfit(): void {
    this.profitChartData = [];
    for (let i = 0; i <= 2; i++) {
      const arr: number[] = [];
      this.profits.map((crypto) => {
        const cryptoDate = new Date(crypto.date).getMonth();
        if (crypto.crypto === this.profitsChartLabel[i]) {
          this.lastNumberMonths.map((month) => {
            if (month === cryptoDate && arr.length <= 3) {
              arr.push(crypto.price);
            } else if (arr.length <= 3) {
              arr.push(0);
            } else {
              const index = this.lastNumberMonths.indexOf(cryptoDate);
              arr[index] = crypto.price;
            }
          });
        }
      });
      this.tempProfitData.data = arr;
      this.tempProfitData.label = this.profitsChartLabel[i];
      this.profitChartData.push(this.tempProfitData);
      this.tempProfitData = { data: [], label: '' };
      if (this.profitsChartLabel.length < 3) {
        for (let i = 0; i < 3 - this.profitsChartLabel.length; i++) {
          this.profitsChartLabel.push('NO DATA');
        }
      }
    }
  }

  getDate(): void {
    const TodayDate = new Date();
    const actualMonth = TodayDate.getMonth() + 1;
    for (let i = 0; i <= 3; i++) {
      if (actualMonth - i >= 12) {
        this.lastNumberMonths.push(1);
        this.lastStringMonths.push(this.monthNames[1]);
      } else {
        this.lastNumberMonths.push(actualMonth - i);
        this.lastStringMonths.push(this.monthNames[actualMonth - i]);
      }
    }

    this.lastStringMonths = this.lastStringMonths.reverse();
    this.lastNumberMonths = this.lastNumberMonths.reverse();
  }
}
