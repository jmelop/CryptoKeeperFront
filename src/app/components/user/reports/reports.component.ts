import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { CryptosService } from 'src/app/services/cryptos.service';
import { CryptoReport } from 'src/app/models/crypto-report.model';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {

  cryptos: any[] = [];
  cryptoObj: CryptoReport = { crypto: '', price: 0 };
  cryptoData: CryptoReport[] = [];

  chartData = [
    {
      data: [330, 600, 260, 700],
      label: 'Account A'
    },
    {
      data: [120, 455, 100, 340],
      label: 'Account B'
    },
    {
      data: [45, 67, 800, 500],
      label: 'Account C'
    }
  ];

  chartLabels = [
    'January',
    'February',
    'March',
    'April'
  ];

  chartOptions = {
    responsive: true
  };

  // Doughnut
  public doughnutChartLabels: Label[] = []
  public doughnutChartData: number[] = [];
  public doughnutChartType: ChartType = 'doughnut';



  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: ChartDataSets[] = [
    { data: [65.2, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  ];

  public pieChartColors: Array<any> = [{
    backgroundColor: ['rgb(255, 205, 86)',
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)']
  }];

  public radarChartType: ChartType = 'radar';

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  constructor(private cryptoServices: CryptosService) { }

  ngOnInit(): void {
    this.cryptoServices.getAllCryptos().then(u => {
      this.cryptos = u;
      this.getCryptosData();
      this.doughnutChartLabels = this.cryptoData.map(crypto => crypto.crypto);
      this.doughnutChartData = this.cryptoData.map(crypto => Number(crypto.price));
      console.log(this.cryptoData)
    })
  }

  getCryptosData() {
    this.cryptos.map(crypto => {
      const exist = this.cryptoData.find(data => data.crypto === crypto.crypto);

      if (exist) {
        this.cryptoData.map(data => {
          if (data.crypto == crypto.crypto) {
            data.price += Number(crypto.price);
          }
        })

      } else {
        this.cryptoObj.crypto = crypto.crypto;
        this.cryptoObj.price = Number(crypto.price);
        this.cryptoData.push(this.cryptoObj);

        this.cryptoObj = { crypto: '', price: 0 };
      }
    });
  };




}


