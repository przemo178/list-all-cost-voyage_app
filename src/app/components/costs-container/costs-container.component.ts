import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { CostsData } from 'src/app/models/costs.model';
import {
  ExchangeRates,
  PaymentCurrency,
} from 'src/app/models/exchange-rates.model';
import { CostsService } from 'src/app/services/costs.service';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';

@Component({
  selector: 'app-costs-container',
  templateUrl: './costs-container.component.html',
  styleUrls: ['./costs-container.component.scss'],
})
export class CostsContainerComponent implements OnInit {
  selectedValue: string = 'SGD';
  paymentCurrencies: PaymentCurrency[] = [];

  // costsData: Observable<CostsData | null> = of(null);

  costsData: Observable<CostsData> | undefined;

  // daCurrency: { currency: string } | undefined;

  // costsData: CostsData = {
  //   daCurrency: { currency: '' },
  //   baseCurrency: { currency: '', exchangeRate: 0 },
  //   costs: [],
  // };

  // exchangeRatesData: ExchangeRates[] = [];

  constructor(
    // private exchangeRatesService: ExchangeRatesService,
    private costsService: CostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.exchangeRatesService.selectedValue$.subscribe((value) => {
    //   this.selectedValue = value;
    // });

    // this.paymentCurrencies = this.route.snapshot.data['paymentCurrencies'];

    // this.route.data.pipe(
    //   map((exchangeRates) => {
    //     this.paymentCurrencies = exchangeRates['paymentCurrencies'];
    //     return exchangeRates;
    //   })
    // );
    // .subscribe((value) => {
    //   console.log(value);
    // });
    // console.log('exchangeRates z resolvera: ', this.route.snapshot);

    // this.costsService.getCostsData().subscribe((value) => {
    //   console.log('dane z COSTSservice: ', value);
    // });

    this.costsData = this.route.snapshot.data['costs'];
    console.log('costsData z resolvera: ', this.costsData);

    // this.route.data.subscribe((data) => {
    //   console.log('Dane z resolvera:', data);
    // });

    // this.route.data.pipe()
    console.log('costsData z resolvera: ', this.route.snapshot);

    //   this.route.data.pipe(
    //     map((costs) => {
    //       this.costsData = costs['daCurrency'];
    //       return costs;
    //     })
    //   );
    //   console.log('costsData z resolvera: ', this.route.snapshot);
    // }

    // show() {
    //   console.log(this.paymentCurrencies);
    // }

    // updateSelectedValue(event: Event) {
    //   const selectedValue = (event.target as HTMLSelectElement).value;
    //   this.exchangeRatesService.setSelectedValue(selectedValue);
    // }
  }
}
